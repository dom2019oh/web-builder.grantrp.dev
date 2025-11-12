import { supabase } from '@/integrations/supabase/client';

export const generateSubdomain = (username: string, projectId: string): string => {
  // Clean username to be URL-safe
  const cleanUsername = username
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 20);
  
  // Take first 8 characters of project ID
  const shortId = projectId.substring(0, 8);
  
  return `${cleanUsername}-${shortId}.grantrp.dev`;
};

export const assignSubdomainToProject = async (projectId: string, userId: string) => {
  try {
    // Get user profile to get username/email
    const { data: profile } = await supabase
      .from('profiles')
      .select('email, full_name')
      .eq('id', userId)
      .single();

    if (!profile) return null;

    // Use email username or full name
    const username = profile.full_name || profile.email.split('@')[0];
    const subdomain = generateSubdomain(username, projectId);

    // Update project with subdomain
    const { data, error } = await supabase
      .from('projects')
      .update({ subdomain })
      .eq('id', projectId)
      .select()
      .single();

    if (error) {
      console.error('Error assigning subdomain:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in assignSubdomainToProject:', error);
    return null;
  }
};
