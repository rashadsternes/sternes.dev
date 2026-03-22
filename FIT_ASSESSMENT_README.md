# Fit Assessment Feature - V1

## What This Does
Visitors describe their project/problem, and an LLM (Claude) gives them an honest, critical assessment of whether you're the right fit based on your actual expertise from the report.html analysis.

## Setup

### 1. Environment Variable
Add to `.env.local`:
```bash
ANTHROPIC_API_KEY=your_api_key_here
```

### 2. Install Anthropic SDK
```bash
npm install @anthropic-ai/sdk
```

### 3. Add to a Page
Example - create a dedicated page at `app/fit/page.tsx`:

```tsx
import FitAssessment from '@/components/FitAssessment';

export default function FitPage() {
  return (
    <main className="min-h-screen py-16">
      <FitAssessment />
    </main>
  );
}
```

Or embed it anywhere on your site:
```tsx
import FitAssessment from '@/components/FitAssessment';

// In your component
<FitAssessment />
```

## How It Works

1. **Visitor Input**: User describes their project/problem in a textarea
2. **API Call**: Frontend sends description to `/api/assess-fit`
3. **LLM Analysis**: Claude reads:
   - Your expertise (from report.html insights)
   - Their problem description
   - Prompt to be critical and honest
4. **Response**: LLM returns 3-4 paragraph assessment covering:
   - Is it a good fit?
   - Why/why not?
   - Specific value you'd provide
   - Reality check if you're overkill

## Key Features of V1

✅ **Critical by default**: Tells people when you're NOT the right fit
✅ **Context-aware**: Uses real data about your expertise
✅ **Honest about overkill**: Acknowledges you work best with complex, context-rich projects
✅ **Simple UX**: Single textarea, one button
✅ **Fast**: Claude Sonnet 4.5 typically responds in 2-4 seconds

## V2 Ideas (Future)

- **Lead capture**: If it's a good fit, collect email/contact info
- **Project scope questions**: Multi-step form to gather more context before assessment
- **Budget qualifier**: "What's your budget?" to filter out mismatches earlier
- **Example projects**: Show relevant case studies based on their description
- **Calendar integration**: If good fit, offer direct booking link
- **Conversation memory**: Let them ask follow-up questions
- **A/B test prompts**: Optimize the system prompt for better conversion
- **Analytics**: Track what types of projects get "good fit" vs "not a fit"

## Prompt Tuning

The system prompt in `app/api/assess-fit/route.ts` includes:
- Your core expertise
- Work style
- "Great for" scenarios
- "Overkill for" scenarios
- "Work best with" context

**To adjust tone**: Edit the `RASHAD_CONTEXT` and the prompt sent to Claude.

**To be more/less critical**: Modify this part:
```
Be **critical and honest**—don't just say yes to everyone.
```

## Cost Estimate

- Claude Sonnet 4.5: ~$3 per million input tokens, ~$15 per million output tokens
- Average assessment: ~2,000 input tokens + 400 output tokens
- **Cost per assessment**: ~$0.01-0.02
- **100 assessments/month**: ~$1-2

Extremely cheap for V1.

## Testing

Try these example inputs to see how it handles different scenarios:

**Good fit**:
> "We're building a subscription e-commerce platform with Next.js and need help integrating Stripe Connect for multi-vendor payments, Sanity CMS for product management, and setting up proper error monitoring. The codebase is TypeScript and we value documentation."

**Overkill**:
> "I need a simple 5-page website for my local bakery with a contact form."

**Needs more context**:
> "I want to build a web app."

## Notes

- The assessment is **not** saved anywhere in V1—each request is stateless
- Rate limiting is not implemented—add it before going public
- No auth required—it's a public assessment tool
- Mobile-friendly by default (Tailwind responsive classes)
