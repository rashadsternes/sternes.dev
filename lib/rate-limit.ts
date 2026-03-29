import { NextRequest } from 'next/server';

// Simple in-memory rate limiter for V1
// For production with multiple serverless instances, use Upstash Redis or Vercel KV

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetAt: number;
  };
}

const store: RateLimitStore = {};

// Clean up old entries every hour
setInterval(() => {
  const now = Date.now();
  Object.keys(store).forEach((key) => {
    if (store[key].resetAt < now) {
      delete store[key];
    }
  });
}, 60 * 60 * 1000);

export interface RateLimitConfig {
  interval: number; // Time window in milliseconds
  limit: number; // Max requests per interval
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

/**
 * Rate limit based on IP address
 *
 * @param request - Next.js request object
 * @param config - Rate limit configuration
 * @returns Rate limit result
 */
export function rateLimit(
  request: NextRequest,
  config: RateLimitConfig = {
    interval: 60 * 60 * 1000, // 1 hour
    limit: 5, // 5 requests per hour
  }
): RateLimitResult {
  const ip = getIP(request);
  const now = Date.now();
  const key = `ratelimit:${ip}`;

  // Get or initialize entry
  const entry = store[key];

  if (!entry || entry.resetAt < now) {
    // First request or window expired
    store[key] = {
      count: 1,
      resetAt: now + config.interval,
    };

    return {
      success: true,
      limit: config.limit,
      remaining: config.limit - 1,
      reset: store[key].resetAt,
    };
  }

  // Increment count
  entry.count++;

  const success = entry.count <= config.limit;
  const remaining = Math.max(0, config.limit - entry.count);

  return {
    success,
    limit: config.limit,
    remaining,
    reset: entry.resetAt,
  };
}

/**
 * Extract IP address from request
 */
function getIP(request: NextRequest): string {
  // Try Vercel-specific headers first
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }

  // Fallback when IP cannot be determined
  return 'unknown';
}

/**
 * Daily cost tracker to prevent runaway bills
 */
interface CostTracker {
  date: string;
  totalCost: number;
  requestCount: number;
}

const costStore: { today: CostTracker } = {
  today: {
    date: new Date().toISOString().split('T')[0],
    totalCost: 0,
    requestCount: 0,
  },
};

export function trackCost(estimatedCost: number): boolean {
  const today = new Date().toISOString().split('T')[0];

  // Reset if new day
  if (costStore.today.date !== today) {
    costStore.today = {
      date: today,
      totalCost: 0,
      requestCount: 0,
    };
  }

  costStore.today.totalCost += estimatedCost;
  costStore.today.requestCount++;

  // Circuit breaker: stop if daily cost exceeds $10
  const MAX_DAILY_COST = 10;

  if (costStore.today.totalCost > MAX_DAILY_COST) {
    console.error(`[COST ALERT] Daily limit exceeded: $${costStore.today.totalCost.toFixed(2)}`);
    return false;
  }

  return true;
}

export function getCostStats() {
  return costStore.today;
}
