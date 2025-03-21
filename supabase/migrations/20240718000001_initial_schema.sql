-- Create businesses table
CREATE TABLE IF NOT EXISTS businesses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  logo TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create profiles table that extends the auth.users table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  business_id UUID REFERENCES businesses(id),
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create content table to store website content for each business
CREATE TABLE IF NOT EXISTS content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  section TEXT NOT NULL,
  data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE content ENABLE ROW LEVEL SECURITY;

-- Create policies for businesses table
DROP POLICY IF EXISTS "Businesses are viewable by everyone" ON businesses;
CREATE POLICY "Businesses are viewable by everyone" 
  ON businesses FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "Businesses can be updated by admins" ON businesses;
CREATE POLICY "Businesses can be updated by admins" 
  ON businesses FOR UPDATE 
  USING (id IN (
    SELECT business_id FROM profiles 
    WHERE profiles.id = auth.uid() AND profiles.is_admin = true
  ));

-- Create policies for profiles table
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
CREATE POLICY "Users can view their own profile" 
  ON profiles FOR SELECT 
  USING (id = auth.uid());

DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
CREATE POLICY "Users can update their own profile" 
  ON profiles FOR UPDATE 
  USING (id = auth.uid());

-- Create policies for content table
DROP POLICY IF EXISTS "Content is viewable by everyone" ON content;
CREATE POLICY "Content is viewable by everyone" 
  ON content FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "Content can be updated by business admins" ON content;
CREATE POLICY "Content can be updated by business admins" 
  ON content FOR UPDATE 
  USING (business_id IN (
    SELECT business_id FROM profiles 
    WHERE profiles.id = auth.uid() AND profiles.is_admin = true
  ));

DROP POLICY IF EXISTS "Content can be inserted by business admins" ON content;
CREATE POLICY "Content can be inserted by business admins" 
  ON content FOR INSERT 
  WITH CHECK (business_id IN (
    SELECT business_id FROM profiles 
    WHERE profiles.id = auth.uid() AND profiles.is_admin = true
  ));

DROP POLICY IF EXISTS "Content can be deleted by business admins" ON content;
CREATE POLICY "Content can be deleted by business admins" 
  ON content FOR DELETE 
  USING (business_id IN (
    SELECT business_id FROM profiles 
    WHERE profiles.id = auth.uid() AND profiles.is_admin = true
  ));

-- Enable realtime for content table
alter publication supabase_realtime add table content;
