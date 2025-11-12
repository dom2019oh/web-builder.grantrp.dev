-- Add credits column to profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS credits integer NOT NULL DEFAULT 100;

-- Create credit_log table for tracking usage
CREATE TABLE IF NOT EXISTS public.credit_log (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  action text NOT NULL,
  credits_used integer NOT NULL,
  credits_after integer NOT NULL,
  timestamp timestamp with time zone NOT NULL DEFAULT now(),
  metadata jsonb DEFAULT '{}'::jsonb
);

-- Enable RLS on credit_log
ALTER TABLE public.credit_log ENABLE ROW LEVEL SECURITY;

-- Users can view their own credit logs
CREATE POLICY "Users can view their own credit logs"
ON public.credit_log
FOR SELECT
USING (auth.uid() = user_id);

-- System can insert credit logs
CREATE POLICY "System can insert credit logs"
ON public.credit_log
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_credit_log_user_id ON public.credit_log(user_id);
CREATE INDEX IF NOT EXISTS idx_credit_log_timestamp ON public.credit_log(timestamp DESC);

-- Create function to deduct credits
CREATE OR REPLACE FUNCTION public.deduct_credits(
  _user_id uuid,
  _action text,
  _credits_to_deduct integer,
  _metadata jsonb DEFAULT '{}'::jsonb
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _current_credits integer;
  _new_credits integer;
BEGIN
  -- Get current credits with row lock
  SELECT credits INTO _current_credits
  FROM public.profiles
  WHERE id = _user_id
  FOR UPDATE;
  
  -- Check if user has enough credits
  IF _current_credits < _credits_to_deduct THEN
    RETURN FALSE;
  END IF;
  
  -- Calculate new balance
  _new_credits := _current_credits - _credits_to_deduct;
  
  -- Update credits
  UPDATE public.profiles
  SET credits = _new_credits
  WHERE id = _user_id;
  
  -- Log the transaction
  INSERT INTO public.credit_log (user_id, action, credits_used, credits_after, metadata)
  VALUES (_user_id, _action, _credits_to_deduct, _new_credits, _metadata);
  
  RETURN TRUE;
END;
$$;

-- Create function to add credits
CREATE OR REPLACE FUNCTION public.add_credits(
  _user_id uuid,
  _action text,
  _credits_to_add integer,
  _metadata jsonb DEFAULT '{}'::jsonb
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _current_credits integer;
  _new_credits integer;
BEGIN
  -- Get current credits with row lock
  SELECT credits INTO _current_credits
  FROM public.profiles
  WHERE id = _user_id
  FOR UPDATE;
  
  -- Calculate new balance
  _new_credits := _current_credits + _credits_to_add;
  
  -- Update credits
  UPDATE public.profiles
  SET credits = _new_credits
  WHERE id = _user_id;
  
  -- Log the transaction
  INSERT INTO public.credit_log (user_id, action, credits_used, credits_after, metadata)
  VALUES (_user_id, _action, -_credits_to_add, _new_credits, _metadata);
  
  RETURN TRUE;
END;
$$;

-- Add auto_refill settings to profiles
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS auto_refill_enabled boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS auto_refill_threshold integer DEFAULT 50,
ADD COLUMN IF NOT EXISTS auto_refill_amount integer DEFAULT 300;