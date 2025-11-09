-- Add explicit policy to block all anonymous SELECT attempts
CREATE POLICY "Block all anonymous access to profiles"
ON public.profiles
FOR SELECT
TO anon
USING (false);

-- Verify RLS is enabled and forced (redundant but ensures it's set)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles FORCE ROW LEVEL SECURITY;