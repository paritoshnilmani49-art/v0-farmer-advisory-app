-- Create trigger function to auto-create farmer profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_farmer()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.farmers (id, full_name, phone_number, location, language_preference)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'phone_number', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'location', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'language_preference', 'english')
  )
  ON CONFLICT (id) DO NOTHING;
  
  RETURN NEW;
END;
$$;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_farmer_created ON auth.users;

-- Create trigger
CREATE TRIGGER on_auth_farmer_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_farmer();
