import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { rateLimit, trackCost } from '@/lib/rate-limit';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY_PUBLIC_PROD,
});

// Protection settings
const RATE_LIMIT_CONFIG = {
  interval: 60 * 60 * 1000, // 1 hour
  limit: 3, // 3 new conversations per hour (lower since multi-turn)
};

const CONVERSATION_LIMITS = {
  maxTurns: 5, // Max conversation turns
  maxMessagesInContext: 10, // Keep last 10 messages (prevent context overflow)
  firstMessageMinLength: 20,
  firstMessageMaxLength: 2000,
  followUpMinLength: 5,
  followUpMaxLength: 500,
  maxTokensOutput: 800, // Shorter responses for conversation flow
  estimatedCostPerTurn: 0.015, // Slightly higher due to growing context
};

const RASHAD_CONTEXT = `
# About Rashad Sternes

## What I Do
I'm a highly technical, project-manager-style developer who operates as a full-stack development partner for clients. My workflow blends rapid operational execution with deep investigative problem-solving.

## Core Expertise
- **Full-stack TypeScript/Next.js development** (1,168 files touched across 86 projects)
- **E-commerce platforms**: Stripe integration, checkout flows, payment hardening, webhook debugging
- **Sanity CMS**: Custom tooling, schema design, Studio customization, content workflows
- **End-to-end delivery**: Investigation → Implementation → Documentation → Deployment → Client Communication
- **DevOps**: Vercel deployments, Sentry error monitoring, Linear project management
- **Documentation-first mindset**: Project history, testing strategies, client guides

## Work Style
- **Directive and iterative**: I maintain tight creative and technical control
- **Documentation as a first-class deliverable**: Everything is documented for reproducibility
- **Multi-file changes at scale**: Average 92+ commits per month across complex codebases
- **Custom tooling**: I build meta-tools and reusable workflows when I see patterns
- **Hands-on project management**: Not just execution—I own the strategy and client communication

## I'm Great For:
- Complex TypeScript/Next.js projects with multiple integrations
- E-commerce builds with Stripe, Sanity CMS, and custom workflows
- Projects that need both deep technical execution AND strategic oversight
- Clients who value documentation, testing, and reproducible processes
- Situations requiring investigative debugging (Sentry analysis, assumption verification)
- Multi-file refactors and architectural improvements

## I'm Overkill For:
- Simple one-page sites or basic WordPress setups
- Projects with minimal technical requirements
- Clients who just want quick cosmetic changes
- Situations where you already have clear, simple requirements and just need basic execution

## I Work Best With:
- Clients who provide rich context and collaborate on strategy
- Complex problems that benefit from systematic investigation
- Projects where quality and maintainability matter more than speed-to-market
- Humans who appreciate documentation and want to understand the "why" behind decisions

## Critical Reality Check
If you need someone to just "make it look nice" or handle basic updates, I'm probably not your guy—you'd be paying for strategic depth you don't need. But if you're building something complex where the wrong architectural decision costs you months later, or you need someone who can own the entire pipeline from debugging to deployment to client communication, that's where I thrive.
`;

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export async function POST(req: NextRequest) {
  try {
    const { messages, conversationId, honeypot } = await req.json();

    // 1. Honeypot check
    if (honeypot) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    // 2. Input validation
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Invalid conversation format' },
        { status: 400 }
      );
    }

    if (!conversationId || typeof conversationId !== 'string') {
      return NextResponse.json(
        { error: 'Invalid conversation ID' },
        { status: 400 }
      );
    }

    const isFirstMessage = messages.length === 1;
    const lastMessage = messages[messages.length - 1];

    // 3. Rate limiting - only on first message of conversation
    if (isFirstMessage) {
      // Use conversation ID as the rate limit key (allows multiple conversations per IP)
      const rateLimitResult = rateLimit(req, RATE_LIMIT_CONFIG);

      if (!rateLimitResult.success) {
        return NextResponse.json(
          {
            error: `Rate limit exceeded. You can start ${RATE_LIMIT_CONFIG.limit} new conversations per hour. Please try again later.`,
            retryAfter: Math.ceil((rateLimitResult.reset - Date.now()) / 1000 / 60),
          },
          {
            status: 429,
            headers: {
              'X-RateLimit-Limit': rateLimitResult.limit.toString(),
              'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
              'X-RateLimit-Reset': new Date(rateLimitResult.reset).toISOString(),
            },
          }
        );
      }
    }

    // 4. Conversation length limits
    const turnCount = Math.ceil(messages.length / 2);
    if (turnCount > CONVERSATION_LIMITS.maxTurns) {
      return NextResponse.json(
        { error: 'Conversation limit reached. Please start a new assessment.' },
        { status: 400 }
      );
    }

    // 5. Message validation
    if (lastMessage.role !== 'user') {
      return NextResponse.json(
        { error: 'Last message must be from user' },
        { status: 400 }
      );
    }

    const content = lastMessage.content.trim();
    const minLength = isFirstMessage
      ? CONVERSATION_LIMITS.firstMessageMinLength
      : CONVERSATION_LIMITS.followUpMinLength;
    const maxLength = isFirstMessage
      ? CONVERSATION_LIMITS.firstMessageMaxLength
      : CONVERSATION_LIMITS.followUpMaxLength;

    if (content.length < minLength) {
      return NextResponse.json(
        { error: `Message too short (min ${minLength} characters)` },
        { status: 400 }
      );
    }

    if (content.length > maxLength) {
      return NextResponse.json(
        { error: `Message too long (max ${maxLength} characters)` },
        { status: 400 }
      );
    }

    // 6. Cost circuit breaker
    if (!trackCost(CONVERSATION_LIMITS.estimatedCostPerTurn)) {
      return NextResponse.json(
        { error: 'Service temporarily unavailable. Please try again tomorrow.' },
        { status: 503 }
      );
    }

    // 7. Prepare messages for Anthropic (keep context manageable)
    const recentMessages = messages.slice(-CONVERSATION_LIMITS.maxMessagesInContext);

    // Convert to Anthropic format
    const anthropicMessages: Anthropic.MessageParam[] = recentMessages.map((msg: Message) => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content,
    }));

    // 8. System prompt that evolves based on conversation stage
    let systemPrompt = RASHAD_CONTEXT;

    if (isFirstMessage) {
      systemPrompt += `

# Your Task (Initial Assessment)
The visitor has described their project below. Provide a **critical and honest** assessment (3-4 paragraphs max) covering:

1. **Quick assessment**: Is this a good fit, maybe, or probably not?
2. **Why/why not**: Based on Rashad's expertise and work style
3. **Specific value**: If it's a fit, what specific aspects would help?
4. **Reality check**: If Rashad might be overkill, say so clearly

**Important**: End your response by asking ONE clarifying question if you need more information to give a better assessment. Keep it conversational.`;
    } else {
      systemPrompt += `

# Your Task (Follow-up in Conversation)
You're continuing a conversation about whether Rashad is a good fit for this visitor's project.

- Answer their question directly and concisely (2-3 paragraphs max)
- Stay honest and critical—don't oversell
- If they're clearly not a fit, guide them toward what they actually need
- If they ARE a fit, help them understand next steps (email, call, etc.)
- Keep responses conversational and natural`;
    }

    // 9. Call Claude
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: CONVERSATION_LIMITS.maxTokensOutput,
      system: systemPrompt,
      messages: anthropicMessages,
    });

    const response = message.content[0].type === 'text' ? message.content[0].text : '';

    return NextResponse.json({ message: response });
  } catch (error) {
    console.error('Error in conversation:', error);
    return NextResponse.json(
      { error: 'Failed to process message. Please try again.' },
      { status: 500 }
    );
  }
}
