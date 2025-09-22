-- Create chat history table for AI conversations
CREATE TABLE IF NOT EXISTS public.chat_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id UUID REFERENCES public.farmers(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  response TEXT NOT NULL,
  message_type TEXT DEFAULT 'text', -- 'text', 'image', 'voice'
  language TEXT DEFAULT 'english',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.chat_history ENABLE ROW LEVEL SECURITY;

-- Policies for chat_history
CREATE POLICY "chat_history_select_own" ON public.chat_history 
  FOR SELECT USING (auth.uid() = farmer_id);
CREATE POLICY "chat_history_insert_own" ON public.chat_history 
  FOR INSERT WITH CHECK (auth.uid() = farmer_id);
