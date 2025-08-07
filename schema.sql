-- Waitlist table for DUAHTOR
CREATE TABLE IF NOT EXISTS waitlist (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  full_name TEXT NOT NULL,
  contact TEXT NOT NULL, -- Email or WhatsApp number
  role TEXT NOT NULL,
  county TEXT NOT NULL,
  country TEXT, -- Optional, for users outside Liberia
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create index on created_at for better query performance
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at);

-- Create index on county for analytics
CREATE INDEX IF NOT EXISTS idx_waitlist_county ON waitlist(county);