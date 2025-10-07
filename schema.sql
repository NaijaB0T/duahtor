-- This version combines the best of both branches

CREATE TABLE IF NOT EXISTS waitlist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    contact TEXT UNIQUE NOT NULL, -- Kept UNIQUE constraint from the original repo
    role TEXT NOT NULL,
    county TEXT NOT NULL,
    country TEXT,
    tshirt_size TEXT, -- Added new t-shirt size column from the original repo
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Kept the performance indexes from your branch
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at);
CREATE INDEX IF NOT EXISTS idx_waitlist_county ON waitlist(county);

-- Added the entirely new table from the original repo
CREATE TABLE IF NOT EXISTS founding_supporters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    contact TEXT NOT NULL,
    amount_paid DECIMAL(10,2) NOT NULL,
    payment_date DATE NOT NULL,
    tshirt_size TEXT,
    payment_method TEXT,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);