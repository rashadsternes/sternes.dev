import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { rateLimit, trackCost } from '@/lib/rate-limit';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY_PUBLIC_PROD,
});

// Protection settings
const RATE_LIMIT_CONFIG = {
  interval: 60 * 60 * 1000, // 1 hour
  limit: 5, // 5 assessments per hour per IP
};

const ABUSE_PROTECTION = {
  minLength: 20, // Minimum description length
  maxLength: 2000, // Maximum description length (prevent token bombing)
  maxTokensOutput: 1024, // Cap output tokens
  estimatedCostPerRequest: 0.012, // ~1.2 cents per assessment
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

export async function POST(req: NextRequest) {
  try {
    // 1. Rate limiting
    const rateLimitResult = rateLimit(req, RATE_LIMIT_CONFIG);

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: `Rate limit exceeded. You can make ${RATE_LIMIT_CONFIG.limit} assessments per hour. Please try again later.`,
          retryAfter: Math.ceil((rateLimitResult.reset - Date.now()) / 1000 / 60), // minutes
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimitResult.reset).toISOString(),
            'Retry-After': Math.ceil((rateLimitResult.reset - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    // 2. Cost circuit breaker
    if (!trackCost(ABUSE_PROTECTION.estimatedCostPerRequest)) {
      return NextResponse.json(
        { error: 'Service temporarily unavailable. Please try again tomorrow.' },
        { status: 503 }
      );
    }

    // 3. Input validation
    const { problem, honeypot } = await req.json();

    // Honeypot field (bots will fill it)
    if (honeypot) {
      return NextResponse.json(
        { error: 'Invalid request' },
        { status: 400 }
      );
    }

    if (!problem || typeof problem !== 'string') {
      return NextResponse.json(
        { error: 'Please provide a description of your project or problem.' },
        { status: 400 }
      );
    }

    const trimmedProblem = problem.trim();

    if (trimmedProblem.length < ABUSE_PROTECTION.minLength) {
      return NextResponse.json(
        { error: `Please provide more detail (at least ${ABUSE_PROTECTION.minLength} characters).` },
        { status: 400 }
      );
    }

    if (trimmedProblem.length > ABUSE_PROTECTION.maxLength) {
      return NextResponse.json(
        { error: `Description too long (max ${ABUSE_PROTECTION.maxLength} characters).` },
        { status: 400 }
      );
    }

    // 4. Call Claude with safety limits
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: ABUSE_PROTECTION.maxTokensOutput,
      messages: [
        {
          role: 'user',
          content: `${RASHAD_CONTEXT}

# Visitor's Problem/Project
${trimmedProblem}

# Your Task
Analyze whether Rashad is a good fit for this visitor's needs. Be **critical and honest**—don't just say yes to everyone.

Provide a concise response (3-4 paragraphs max) covering:

1. **Quick assessment**: Is this a good fit, maybe, or probably not?
2. **Why/why not**: Based on Rashad's expertise and work style
3. **Specific value**: If it's a fit, what specific aspects of Rashad's skillset would help?
4. **Reality check**: If Rashad might be overkill, say so clearly. If the visitor needs more context/complexity for Rashad to add value, mention that.

Be conversational but direct. Use "you" to address the visitor. Don't oversell—if it's not a great fit, help them understand why.`,
        },
      ],
    });

    const response = message.content[0].type === 'text' ? message.content[0].text : '';

    return NextResponse.json({ assessment: response });
  } catch (error) {
    console.error('Error calling Anthropic API:', error);
    return NextResponse.json(
      { error: 'Failed to generate assessment. Please try again.' },
      { status: 500 }
    );
  }
}
