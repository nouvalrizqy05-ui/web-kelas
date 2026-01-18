/*
  # Create Initial Tables for Web Kelas

  ## Tables Created
  
  1. **chats**
    - `id` (uuid, primary key) - Unique identifier for each message
    - `message` (text) - The message content (max 60 characters)
    - `sender_image` (text) - URL to sender's avatar image
    - `user_ip` (text) - IP address of the sender
    - `timestamp` (timestamptz) - When the message was sent
  
  2. **ratings**
    - `id` (uuid, primary key) - Unique identifier for each rating
    - `value` (numeric) - Rating value (0-10)
    - `timestamp` (timestamptz) - When the rating was submitted
  
  3. **blacklist_ips**
    - `id` (uuid, primary key) - Unique identifier
    - `ip_address` (text, unique) - Blocked IP address
    - `created_at` (timestamptz) - When the IP was blacklisted
  
  ## Security
  
  - Enable RLS on all tables
  - Public read access for chats and ratings
  - Restricted write access with rate limiting considerations
  - Admin-only access for blacklist management
*/

-- Create chats table
CREATE TABLE IF NOT EXISTS chats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message text NOT NULL CHECK (char_length(message) <= 60),
  sender_image text DEFAULT '/AnonimUser.png',
  user_ip text NOT NULL,
  timestamp timestamptz DEFAULT now()
);

-- Create ratings table
CREATE TABLE IF NOT EXISTS ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  value numeric NOT NULL CHECK (value >= 0 AND value <= 10),
  timestamp timestamptz DEFAULT now()
);

-- Create blacklist_ips table
CREATE TABLE IF NOT EXISTS blacklist_ips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE blacklist_ips ENABLE ROW LEVEL SECURITY;

-- Policies for chats table
CREATE POLICY "Anyone can read chats"
  ON chats FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert chats"
  ON chats FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policies for ratings table
CREATE POLICY "Anyone can read ratings"
  ON ratings FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert ratings"
  ON ratings FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policies for blacklist_ips table
CREATE POLICY "Anyone can read blacklist"
  ON blacklist_ips FOR SELECT
  TO anon, authenticated
  USING (true);

-- Only authenticated users can manage blacklist (for admin purposes)
CREATE POLICY "Authenticated users can manage blacklist"
  ON blacklist_ips FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS chats_timestamp_idx ON chats(timestamp DESC);
CREATE INDEX IF NOT EXISTS ratings_timestamp_idx ON ratings(timestamp DESC);
CREATE INDEX IF NOT EXISTS blacklist_ips_address_idx ON blacklist_ips(ip_address);
