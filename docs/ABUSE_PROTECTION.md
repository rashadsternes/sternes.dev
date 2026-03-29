# Abuse Protection & Rate Limiting

## 🛡️ Protection Layers

### 1. **Rate Limiting** (IP-based)
- **Limit**: 5 assessments per hour per IP address
- **Window**: Rolling 1-hour window
- **Response**: 429 status with `Retry-After` header
- **Headers returned**:
  - `X-RateLimit-Limit`: Max requests allowed
  - `X-RateLimit-Remaining`: Requests left in window
  - `X-RateLimit-Reset`: When the limit resets (ISO timestamp)

```typescript
// Customize in app/api/assess-fit/route.ts
const RATE_LIMIT_CONFIG = {
  interval: 60 * 60 * 1000, // 1 hour
  limit: 5, // 5 requests per hour
};
```

### 2. **Cost Circuit Breaker**
- **Daily cap**: $10/day (prevents runaway bills)
- **Estimated cost per request**: ~$0.012 (1.2 cents)
- **Requests at cap**: ~833 assessments/day
- **Auto-recovery**: Resets at midnight UTC

If exceeded, returns **503 Service Unavailable**.

```typescript
// Adjust in lib/rate-limit.ts
const MAX_DAILY_COST = 10; // dollars
```

### 3. **Input Validation**
- **Minimum length**: 20 characters (prevents spam)
- **Maximum length**: 2,000 characters (prevents token bombing)
- **Type checking**: Must be a string
- **Sanitization**: Trimmed before processing

### 4. **Output Token Cap**
- **Max tokens**: 1,024 tokens per response
- **Prevents**: Runaway generation costs
- **Typical response**: 300-500 tokens (well under limit)

### 5. **Honeypot Field**
- **Field name**: `honeypot` (backend) / `website` (frontend)
- **Purpose**: Catch bots that auto-fill forms
- **Behavior**: Hidden from humans, visible to bots
- **Response**: 400 Bad Request if filled

---

## 📊 Monitoring

### Check Current Stats

Add an admin endpoint to monitor usage:

```typescript
// app/api/admin/stats/route.ts (protect with auth!)
import { getCostStats } from '@/lib/rate-limit';

export async function GET() {
  const stats = getCostStats();
  return Response.json({
    date: stats.date,
    requests: stats.requestCount,
    estimatedCost: `$${stats.totalCost.toFixed(2)}`,
    remainingBudget: `$${(10 - stats.totalCost).toFixed(2)}`,
  });
}
```

### Vercel Analytics
Monitor API route performance in Vercel dashboard:
- Request count
- Response times
- Error rates
- Geographic distribution

### Set Up Alerts

```bash
# Vercel CLI - set up budget alerts
vercel env add DAILY_BUDGET_ALERT_EMAIL your@email.com
```

---

## 🚨 Limitations of V1 (In-Memory)

### Current Implementation
- **Storage**: In-memory JavaScript object
- **Persistence**: None (resets on deployment/restart)
- **Serverless**: Each instance has its own counter
- **Result**: Rate limiting is approximate across multiple instances

### When This Matters
- High traffic (100+ requests/min)
- Multiple Vercel serverless instances
- Need for strict enforcement

### Upgrade Path: Redis (Production-Ready)

For strict rate limiting, use **Upstash Redis** or **Vercel KV**:

<details>
<summary>Click to see Redis implementation</summary>

```bash
# Install Redis client
npm install @upstash/redis
```

```typescript
// lib/rate-limit-redis.ts
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function rateLimitRedis(
  ip: string,
  limit: number = 5,
  window: number = 3600 // 1 hour in seconds
): Promise<RateLimitResult> {
  const key = `ratelimit:assess:${ip}`;
  const now = Math.floor(Date.now() / 1000);

  // Increment counter with expiry
  const count = await redis.incr(key);

  if (count === 1) {
    // First request - set expiry
    await redis.expire(key, window);
  }

  const ttl = await redis.ttl(key);
  const resetAt = now + ttl;

  return {
    success: count <= limit,
    limit,
    remaining: Math.max(0, limit - count),
    reset: resetAt * 1000, // Convert to ms
  };
}
```

**Cost**: Upstash has a generous free tier (10K commands/day)

</details>

---

## 🔧 Adjusting Limits

### Make it stricter (more protection):
```typescript
const RATE_LIMIT_CONFIG = {
  interval: 60 * 60 * 1000, // 1 hour
  limit: 3, // Only 3 per hour
};

const ABUSE_PROTECTION = {
  minLength: 50, // Require more detail
  maxLength: 1000, // Shorter max
  maxTokensOutput: 800, // Shorter responses
};
```

### Make it more permissive (better UX):
```typescript
const RATE_LIMIT_CONFIG = {
  interval: 60 * 60 * 1000, // 1 hour
  limit: 10, // 10 per hour
};

const ABUSE_PROTECTION = {
  minLength: 10, // Less restrictive
  maxLength: 3000, // Longer allowed
  maxTokensOutput: 1500, // Longer responses
};
```

### Per-route customization:
Different limits for different endpoints:
```typescript
// Stricter for public assessment
export const assessmentLimits = { interval: 3600000, limit: 3 };

// More lenient for authenticated users
export const authenticatedLimits = { interval: 3600000, limit: 20 };
```

---

## 🎯 Launch Checklist

Before going live:

- [ ] Set `ANTHROPIC_API_KEY` in Vercel env vars
- [ ] Test rate limiting with multiple requests
- [ ] Test honeypot (fill the hidden field manually)
- [ ] Test max length (paste 3000 chars)
- [ ] Test min length (submit 5 chars)
- [ ] Verify 429 response shows retry time
- [ ] Set up Vercel budget alerts
- [ ] Monitor first 24 hours for abuse patterns
- [ ] (Optional) Add Redis if you expect high traffic
- [ ] (Optional) Add reCAPTCHA if bots are an issue

---

## 💡 Advanced: Additional Protections

### Content Analysis (Detect Spam)
```typescript
// Simple spam detection
const spamPatterns = [
  /(.)\1{10,}/, // Repeated characters
  /https?:\/\//gi, // Multiple URLs
  /\b(buy|cheap|discount|sale)\b/gi, // Spam keywords
];

function isSpam(text: string): boolean {
  return spamPatterns.some(pattern => pattern.test(text));
}
```

### Geographic Restrictions
```typescript
// Block certain countries if needed
const blockedCountries = ['CN', 'RU']; // Example

const country = request.geo?.country;
if (country && blockedCountries.includes(country)) {
  return NextResponse.json({ error: 'Not available in your region' }, { status: 403 });
}
```

### reCAPTCHA v3 (Invisible)
For maximum bot protection without UX friction:
```bash
npm install @hcaptcha/react-hcaptcha
# or use Google reCAPTCHA
```

---

## 📈 Expected Usage Patterns

Based on typical conversion rates:

| Visitors/mo | Conversion | Assessments | Cost/mo |
|------------|-----------|------------|---------|
| 1,000 | 5% | 50 | $0.60 |
| 5,000 | 5% | 250 | $3.00 |
| 10,000 | 5% | 500 | $6.00 |
| 50,000 | 3% | 1,500 | $18.00 |

Even with 50K visitors, you're spending less than a single Calendly subscription.

---

## 🚀 Summary

**V1 Protection (Current)**:
✅ IP rate limiting (5/hour)
✅ Daily cost cap ($10)
✅ Input validation (20-2000 chars)
✅ Output token cap (1024)
✅ Honeypot anti-bot
✅ Proper error messaging

**Good enough for**: Up to ~10K visitors/month

**Upgrade to Redis when**: Traffic exceeds 50K visitors/month or you need strict cross-instance limits

**Current estimated cost**: $1-5/month for typical usage