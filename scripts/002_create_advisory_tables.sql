-- Create crop advisory table
CREATE TABLE IF NOT EXISTS public.crop_advisories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id UUID REFERENCES public.farmers(id) ON DELETE CASCADE,
  crop_type TEXT NOT NULL,
  advisory_text TEXT NOT NULL,
  advisory_type TEXT NOT NULL, -- 'planting', 'fertilizer', 'pest_control', 'harvest'
  location TEXT,
  weather_conditions JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create soil health records table
CREATE TABLE IF NOT EXISTS public.soil_health_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id UUID REFERENCES public.farmers(id) ON DELETE CASCADE,
  ph_level DECIMAL,
  nitrogen_level TEXT,
  phosphorus_level TEXT,
  potassium_level TEXT,
  organic_matter DECIMAL,
  recommendations TEXT,
  test_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create pest detection records table
CREATE TABLE IF NOT EXISTS public.pest_detections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id UUID REFERENCES public.farmers(id) ON DELETE CASCADE,
  crop_type TEXT NOT NULL,
  pest_identified TEXT,
  confidence_score DECIMAL,
  image_url TEXT,
  treatment_recommendations TEXT,
  detected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create market prices table
CREATE TABLE IF NOT EXISTS public.market_prices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  crop_name TEXT NOT NULL,
  location TEXT NOT NULL,
  price_per_kg DECIMAL NOT NULL,
  market_name TEXT,
  price_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for all tables
ALTER TABLE public.crop_advisories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.soil_health_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pest_detections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_prices ENABLE ROW LEVEL SECURITY;

-- Policies for crop_advisories
CREATE POLICY "advisories_select_own" ON public.crop_advisories 
  FOR SELECT USING (auth.uid() = farmer_id);
CREATE POLICY "advisories_insert_own" ON public.crop_advisories 
  FOR INSERT WITH CHECK (auth.uid() = farmer_id);

-- Policies for soil_health_records
CREATE POLICY "soil_records_select_own" ON public.soil_health_records 
  FOR SELECT USING (auth.uid() = farmer_id);
CREATE POLICY "soil_records_insert_own" ON public.soil_health_records 
  FOR INSERT WITH CHECK (auth.uid() = farmer_id);

-- Policies for pest_detections
CREATE POLICY "pest_detections_select_own" ON public.pest_detections 
  FOR SELECT USING (auth.uid() = farmer_id);
CREATE POLICY "pest_detections_insert_own" ON public.pest_detections 
  FOR INSERT WITH CHECK (auth.uid() = farmer_id);

-- Policies for market_prices (public read access)
CREATE POLICY "market_prices_select_all" ON public.market_prices 
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "market_prices_insert_admin" ON public.market_prices 
  FOR INSERT WITH CHECK (false); -- Only admin can insert market prices
