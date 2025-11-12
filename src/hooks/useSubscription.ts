import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export type SubscriptionPlan = 'free' | 'starter' | 'pro' | 'business' | 'one_time';

interface Subscription {
  id: string;
  user_id: string;
  plan: SubscriptionPlan;
  stripe_subscription_id: string | null;
  stripe_customer_id: string | null;
  status: string;
  current_period_end: string | null;
}

export const useSubscription = () => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setSubscription(null);
      setLoading(false);
      return;
    }

    fetchSubscription();
  }, [user]);

  const fetchSubscription = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching subscription:', error);
        return;
      }

      setSubscription(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const canPublish = () => {
    if (!subscription) return false;
    return subscription.plan !== 'free';
  };

  const getMaxWebsites = () => {
    if (!subscription) return 1;
    
    switch (subscription.plan) {
      case 'free':
        return 1;
      case 'starter':
        return 1;
      case 'pro':
        return 3;
      case 'business':
        return 6;
      case 'one_time':
        return 1;
      default:
        return 1;
    }
  };

  const getPlanName = () => {
    if (!subscription) return 'Free';
    
    switch (subscription.plan) {
      case 'free':
        return 'Free';
      case 'starter':
        return 'Starter';
      case 'pro':
        return 'Pro';
      case 'business':
        return 'Business';
      case 'one_time':
        return 'One-Time Publish';
      default:
        return 'Free';
    }
  };

  return {
    subscription,
    loading,
    canPublish,
    getMaxWebsites,
    getPlanName,
    refetch: fetchSubscription,
  };
};
