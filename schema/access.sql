-- Purchase-gated access schema.
-- One row per email that has bought a product. `product` is a short key
-- ("focus", "core") matched against what a page requires to render.
CREATE TABLE IF NOT EXISTS purchases (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL,
  product TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'mailerlite_webhook',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(email, product)
);
CREATE INDEX IF NOT EXISTS idx_purchases_email ON purchases(email);

-- One-time magic-link tokens. Short-lived, single-use.
CREATE TABLE IF NOT EXISTS login_tokens (
  token TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at TEXT NOT NULL,
  used_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_login_tokens_email ON login_tokens(email);

-- Per-lesson progress, tied to the account instead of the browser's
-- localStorage, so it survives a new device.
CREATE TABLE IF NOT EXISTS progress (
  email TEXT NOT NULL,
  lesson_slug TEXT NOT NULL,
  completed_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (email, lesson_slug)
);
