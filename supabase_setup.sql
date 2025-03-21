-- Create tables for Supabase

-- Enable RLS
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create websites table
CREATE TABLE public.websites (
  id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create content table
CREATE TABLE public.content (
  id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  website_id UUID NOT NULL REFERENCES public.websites(id) ON DELETE CASCADE,
  section TEXT NOT NULL,
  data JSONB NOT NULL,
  UNIQUE(website_id, section)
);

-- Enable RLS on tables
ALTER TABLE public.websites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;

-- Create policies for websites table
CREATE POLICY Users can view their own websites 
  ON public.websites FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY Users can insert their own websites 
  ON public.websites FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY Users can update their own websites 
  ON public.websites FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY Users can delete their own websites 
  ON public.websites FOR DELETE 
  USING (auth.uid() = user_id);

-- Create policies for content table
CREATE POLICY Users can view content for their websites 
  ON public.content FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.websites 
    WHERE websites.id = content.website_id AND websites.user_id = auth.uid()
  ));

CREATE POLICY Users can insert content for their websites 
  ON public.content FOR INSERT 
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.websites 
    WHERE websites.id = content.website_id AND websites.user_id = auth.uid()
  ));

CREATE POLICY Users can update content for their websites 
  ON public.content FOR UPDATE 
  USING (EXISTS (
    SELECT 1 FROM public.websites 
    WHERE websites.id = content.website_id AND websites.user_id = auth.uid()
  ));

CREATE POLICY Users can delete content for their websites 
  ON public.content FOR DELETE 
  USING (EXISTS (
    SELECT 1 FROM public.websites 
    WHERE websites.id = content.website_id AND websites.user_id = auth.uid()
  ));

