-- Create farmers profile table
CREATE TABLE IF NOT EXISTS public.farmers (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone_number TEXT,
  location TEXT,
  farm_size DECIMAL,
  primary_crops TEXT[],
  language_preference TEXT DEFAULT 'english',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.farmers ENABLE ROW LEVEL SECURITY;

-- Create policies for farmers table
CREATE POLICY "farmers_select_own" ON public.farmers 
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "farmers_insert_own" ON public.farmers 
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "farmers_update_own" ON public.farmers 
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "farmers_delete_own" ON public.farmers 
  FOR DELETE USING (auth.uid() = id);
