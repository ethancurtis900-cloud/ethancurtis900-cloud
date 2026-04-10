/*
  # Add Index for Foreign Key

  1. Changes Made
    - Add index on security_logs.user_id to cover the foreign key constraint
    - This index is necessary for query performance when joining with auth.users

  2. Performance Impact
    - Improves join performance with auth.users table
    - Optimizes cascading operations if user is deleted
    - Minimal overhead since security_logs is primarily write-only
*/

CREATE INDEX IF NOT EXISTS idx_security_logs_user_id_fkey ON security_logs(user_id);