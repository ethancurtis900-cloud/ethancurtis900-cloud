/*
  # Update username length constraint

  1. Changes
    - Drops the old username format constraint (3–30 chars)
    - Adds a new constraint enforcing 8–15 characters
*/

ALTER TABLE profiles DROP CONSTRAINT IF EXISTS username_format;
ALTER TABLE profiles ADD CONSTRAINT username_format CHECK (username ~ '^[a-zA-Z0-9_-]{8,15}$');
