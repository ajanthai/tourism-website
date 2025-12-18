const rateLimit = new Map();

const LIMIT = 4;        // requests
const WINDOW = 60_000; // 1 minute

function rateLimiter(req) {
  const ip =
    req.headers['x-forwarded-for'] ||
    req.socket?.remoteAddress ||
    'unknown';

  const now = Date.now();
  const requests = rateLimit.get(ip) || [];

  const recentRequests = requests.filter(
    timestamp => now - timestamp < WINDOW
  );

  if (recentRequests.length >= LIMIT) {
    return {
      allowed: false,
      retryAfter: Math.ceil(WINDOW / 1000),
    };
  }

  recentRequests.push(now);
  rateLimit.set(ip, recentRequests);

  return { allowed: true };
}

module.exports = rateLimiter;
