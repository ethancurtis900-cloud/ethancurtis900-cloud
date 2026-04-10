# Security Configuration

This document outlines the required security configurations that must be set in the Supabase Dashboard.

## Required Dashboard Configurations

### 1. Auth DB Connection Strategy

**Status:** Requires manual configuration in Supabase Dashboard

**Issue:** Auth server is configured to use a fixed number (10) of connections instead of a percentage-based approach.

**How to Fix:**
1. Go to your Supabase Dashboard
2. Navigate to Settings → Database → Connection Pooling
3. Under "Auth Connection Pool", change from fixed connections to percentage-based allocation
4. Set to an appropriate percentage (recommended: 10-15%)

**Why:** This allows the Auth server to scale with your instance size automatically.

---

### 2. Leaked Password Protection

**Status:** Requires manual configuration in Supabase Dashboard

**Issue:** HaveIBeenPwned integration is disabled, allowing users to set compromised passwords.

**How to Fix:**
1. Go to your Supabase Dashboard
2. Navigate to Authentication → Policies
3. Enable "Leaked Password Protection"
4. This will automatically check passwords against the HaveIBeenPwned database

**Why:** Prevents users from using passwords that have been exposed in data breaches, significantly improving account security.

---

## Fixed Issues (via SQL Migration)

### 1. Unindexed Foreign Keys
- **Fixed:** Added index on security_logs.user_id to support the foreign key constraint
- **Reason:** Foreign key relationships require indexes for optimal performance

### 2. Function Search Path Mutability
- **Fixed:** Added `SET search_path = public, pg_temp` to functions:
  - `log_security_event`
  - `check_email_format`
- **Reason:** Prevents SQL injection attacks via search_path manipulation

---

## Security Features Currently Implemented

- Row Level Security (RLS) enabled on all tables
- Audit logging for security events
- Email format validation
- Tamper protection on orders and subscriptions
- Secure CORS headers on Edge Functions
- Input validation and sanitization
- Rate limiting on authentication endpoints
