-- Check if extension exists and create it if not
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Check if businesses table exists and create it if not
CREATE TABLE IF NOT EXISTS businesses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  logo TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Check if profiles table exists and create it if not
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  business_id UUID REFERENCES businesses(id),
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create storage bucket for images if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM storage.buckets WHERE name = 'images'
  ) THEN
    INSERT INTO storage.buckets (id, name, public)
    VALUES ('images', 'images', true);
  END IF;
END $$;

-- Enable RLS on all tables
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

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

DROP POLICY IF EXISTS "Businesses can be inserted by authenticated users" ON businesses;
CREATE POLICY "Businesses can be inserted by authenticated users" 
  ON businesses FOR INSERT 
  WITH CHECK (auth.uid() IS NOT NULL);

-- Create policies for profiles table
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
CREATE POLICY "Users can view their own profile" 
  ON profiles FOR SELECT 
  USING (id = auth.uid());

DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
CREATE POLICY "Users can update their own profile" 
  ON profiles FOR UPDATE 
  USING (id = auth.uid());

DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
CREATE POLICY "Users can insert their own profile" 
  ON profiles FOR INSERT 
  WITH CHECK (id = auth.uid());

-- Create a function to handle user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (NEW.id)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
