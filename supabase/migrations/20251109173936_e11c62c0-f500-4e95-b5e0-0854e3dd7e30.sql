-- Drop the restrictive anonymous deny policy that creates ambiguity
DROP POLICY IF EXISTS "Deny anonymous access to profiles" ON public.profiles;

-- The existing "Authenticated users can view their own profile" policy
-- is sufficient - it's PERMISSIVE by default, so anonymous users
-- are automatically denied since they don't match the condition