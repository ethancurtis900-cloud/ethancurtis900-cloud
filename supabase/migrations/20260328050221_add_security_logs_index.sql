/*
  # Add Index for Foreign Key

  1. Changes Made
    - Add index on security_logs.user_id to cover the foreign key constraint
    - This improves query performance when joining or filtering by user_id

  2. Performance Improvement
    - Optimizes queries that filter or join on user_id
    - Supports the foreign key constraint efficiently

  3. Notes
    - While security_logs is primarily write-only for audit purposes,
      the foreign key relationship requires an index for optimal performance
    - This is different from the previously removed indexes which were for query optimization
*/

CREATE INDEX IF NOT EXISTS idx_security_logs_user_id_fkey ON security_logs(user_id);

COMMENT ON INDEX idx_security_logs_user_id_fkey IS 'Index to support foreign key constraint and improve join performance.';