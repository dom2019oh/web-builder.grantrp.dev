-- Update initial credits for new users to 150
ALTER TABLE public.profiles 
ALTER COLUMN credits SET DEFAULT 150;

-- Create referrals table for tracking invitations
CREATE TABLE IF NOT EXISTS public.referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  referred_email TEXT NOT NULL,
  referred_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, completed
  credits_awarded BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ
);

-- Enable RLS on referrals
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own referrals
CREATE POLICY "Users can view their own referrals"
ON public.referrals
FOR SELECT
USING (auth.uid() = referrer_id);

-- Policy: Users can create referrals
CREATE POLICY "Users can create referrals"
ON public.referrals
FOR INSERT
WITH CHECK (auth.uid() = referrer_id);

-- Add referral_code to profiles
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS referral_code TEXT UNIQUE;

-- Add referred_by to profiles
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS referred_by UUID REFERENCES auth.users(id);

-- Create index for referral codes
CREATE INDEX IF NOT EXISTS idx_profiles_referral_code ON public.profiles(referral_code);

-- Function to generate unique referral code
CREATE OR REPLACE FUNCTION public.generate_referral_code()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  code TEXT;
  exists BOOLEAN;
BEGIN
  LOOP
    -- Generate 8 character alphanumeric code
    code := upper(substr(md5(random()::text), 1, 8));
    
    -- Check if code already exists
    SELECT EXISTS(SELECT 1 FROM public.profiles WHERE referral_code = code) INTO exists;
    
    EXIT WHEN NOT exists;
  END LOOP;
  
  RETURN code;
END;
$$;

-- Trigger to generate referral code on profile creation
CREATE OR REPLACE FUNCTION public.set_referral_code()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF NEW.referral_code IS NULL THEN
    NEW.referral_code := public.generate_referral_code();
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trigger_set_referral_code
BEFORE INSERT ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.set_referral_code();

-- Function to process referral bonus
CREATE OR REPLACE FUNCTION public.process_referral_bonus(_referred_user_id UUID, _referral_code TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  _referrer_id UUID;
  _referrer_credits INTEGER;
BEGIN
  -- Find referrer by code
  SELECT id INTO _referrer_id
  FROM public.profiles
  WHERE referral_code = _referral_code;
  
  IF _referrer_id IS NULL THEN
    RETURN FALSE;
  END IF;
  
  -- Update referral record
  UPDATE public.referrals
  SET referred_user_id = _referred_user_id,
      status = 'completed',
      completed_at = now()
  WHERE referrer_id = _referrer_id
    AND referred_email = (SELECT email FROM public.profiles WHERE id = _referred_user_id)
    AND status = 'pending';
  
  -- Award 100 credits to referrer if not already awarded
  IF EXISTS (
    SELECT 1 FROM public.referrals
    WHERE referrer_id = _referrer_id
      AND referred_user_id = _referred_user_id
      AND status = 'completed'
      AND credits_awarded = FALSE
  ) THEN
    -- Add credits to referrer
    PERFORM public.add_credits(
      _referrer_id,
      'Referral Bonus',
      100,
      jsonb_build_object('referred_user_id', _referred_user_id)
    );
    
    -- Mark as awarded
    UPDATE public.referrals
    SET credits_awarded = TRUE
    WHERE referrer_id = _referrer_id
      AND referred_user_id = _referred_user_id;
    
    RETURN TRUE;
  END IF;
  
  RETURN FALSE;
END;
$$;