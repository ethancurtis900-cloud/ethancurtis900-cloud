const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000;

interface RateLimitEntry {
  attempts: number;
  firstAttempt: number;
  lockedUntil?: number;
}

class RateLimiter {
  private attempts: Map<string, RateLimitEntry> = new Map();

  checkRateLimit(identifier: string): { allowed: boolean; retryAfter?: number } {
    const now = Date.now();
    const entry = this.attempts.get(identifier);

    if (entry?.lockedUntil) {
      if (now < entry.lockedUntil) {
        return {
          allowed: false,
          retryAfter: Math.ceil((entry.lockedUntil - now) / 1000)
        };
      }
      this.attempts.delete(identifier);
    }

    if (!entry || now - entry.firstAttempt > LOCKOUT_DURATION) {
      this.attempts.set(identifier, { attempts: 1, firstAttempt: now });
      return { allowed: true };
    }

    if (entry.attempts >= MAX_ATTEMPTS) {
      const lockedUntil = now + LOCKOUT_DURATION;
      this.attempts.set(identifier, { ...entry, lockedUntil });
      return {
        allowed: false,
        retryAfter: Math.ceil(LOCKOUT_DURATION / 1000)
      };
    }

    entry.attempts++;
    this.attempts.set(identifier, entry);
    return { allowed: true };
  }

  resetAttempts(identifier: string): void {
    this.attempts.delete(identifier);
  }

  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.attempts.entries()) {
      if (now - entry.firstAttempt > LOCKOUT_DURATION && !entry.lockedUntil) {
        this.attempts.delete(key);
      }
    }
  }
}

export const rateLimiter = new RateLimiter();

setInterval(() => rateLimiter.cleanup(), 5 * 60 * 1000);

export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim();
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
}

export function validateURL(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}

export function generateCSRFToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

export function validateCSRFToken(token: string, storedToken: string): boolean {
  if (!token || !storedToken || token.length !== storedToken.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < token.length; i++) {
    result |= token.charCodeAt(i) ^ storedToken.charCodeAt(i);
  }
  return result === 0;
}
