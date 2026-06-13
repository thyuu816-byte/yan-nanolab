CREATE TABLE IF NOT EXISTS guestbook_messages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  message TEXT NOT NULL,
  created_at TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'unread'
);

CREATE INDEX IF NOT EXISTS idx_guestbook_created_at
  ON guestbook_messages (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_guestbook_status
  ON guestbook_messages (status);
