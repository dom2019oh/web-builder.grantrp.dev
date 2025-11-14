import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export const CREDIT_COSTS = {
  ADD_COMPONENT: 10,
  ADD_PAGE: 25,
  AI_TEXT_GENERATION: 3,
  AI_LAYOUT_GENERATION: 8,
  AI_IMAGE_GENERATION: 2, // Reduced from 5 to 2
  AI_REWRITE: 2,
  PUBLISH_SUBDOMAIN: 50,
  CONNECT_CUSTOM_DOMAIN: 100,
  EXPORT_ZIP: 75,
  ENABLE_ANALYTICS: 50,
  ADD_COLLABORATOR: 10,
} as const;

export const CREDIT_PACKS = [
  {
    name: 'Starter',
    credits: 300,
    price: 4.99,
    priceId: 'price_1SSjmBLW3HLLN5bg8qdKaskZ',
    description: 'Personal websites',
  },
  {
    name: 'Pro',
    credits: 750,
    price: 9.99,
    priceId: 'price_1SSjmCLW3HLLN5bgOKbMaMeT',
    description: 'Small business projects',
  },
  {
    name: 'Business',
    credits: 2000,
    price: 19.99,
    priceId: 'price_1SSjmDLW3HLLN5bg1cDg9NBB',
    description: 'Agencies/resellers',
  },
  {
    name: 'Enterprise',
    credits: 5000,
    price: 39.99,
    priceId: 'price_1SSjmELW3HLLN5bgDbDjpAjz',
    description: 'White-label heavy use',
  },
];

interface CreditLog {
  id: string;
  action: string;
  credits_used: number;
  credits_after: number;
  timestamp: string;
  metadata: any;
}

export const useCredits = () => {
  const { user } = useAuth();
  const [credits, setCredits] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [autoRefillEnabled, setAutoRefillEnabled] = useState(false);
  const [autoRefillThreshold, setAutoRefillThreshold] = useState(50);

  useEffect(() => {
    if (!user) {
      setCredits(0);
      setLoading(false);
      return;
    }

    fetchCredits();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('credits-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles',
          filter: `id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.new && 'credits' in payload.new) {
            setCredits(payload.new.credits as number);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const fetchCredits = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('credits, auto_refill_enabled, auto_refill_threshold')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      setCredits(data.credits);
      setAutoRefillEnabled(data.auto_refill_enabled);
      setAutoRefillThreshold(data.auto_refill_threshold);
    } catch (error) {
      console.error('Error fetching credits:', error);
    } finally {
      setLoading(false);
    }
  };

  const deductCredits = async (action: string, cost: number, metadata: any = {}) => {
    if (!user) {
      toast.error('Please log in to continue');
      return false;
    }

    try {
      const { data, error } = await supabase.rpc('deduct_credits', {
        _user_id: user.id,
        _action: action,
        _credits_to_deduct: cost,
        _metadata: metadata,
      });

      if (error) throw error;

      if (data) {
        toast.success(`−${cost} credits for ${action} (Balance: ${credits - cost} credits)`);
        return true;
      } else {
        toast.error('Insufficient credits. Please add more to continue.');
        return false;
      }
    } catch (error) {
      console.error('Error deducting credits:', error);
      toast.error('Failed to deduct credits');
      return false;
    }
  };

  const getCreditLogs = async (limit = 50): Promise<CreditLog[]> => {
    if (!user) return [];

    try {
      const { data, error } = await supabase
        .from('credit_log')
        .select('*')
        .eq('user_id', user.id)
        .order('timestamp', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching credit logs:', error);
      return [];
    }
  };

  const updateAutoRefill = async (enabled: boolean, threshold?: number) => {
    if (!user) return;

    try {
      const updates: any = { auto_refill_enabled: enabled };
      if (threshold !== undefined) {
        updates.auto_refill_threshold = threshold;
      }

      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;

      setAutoRefillEnabled(enabled);
      if (threshold !== undefined) {
        setAutoRefillThreshold(threshold);
      }

      toast.success('Auto-refill settings updated');
    } catch (error) {
      console.error('Error updating auto-refill:', error);
      toast.error('Failed to update auto-refill settings');
    }
  };

  const buyCredits = async (priceId: string) => {
    if (!user) {
      toast.error('Please log in to purchase credits');
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId, type: 'credits' },
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error creating checkout:', error);
      toast.error('Failed to initiate checkout');
    }
  };

  const getReferralCode = async (): Promise<string | null> => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('referral_code')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      return data?.referral_code || null;
    } catch (error) {
      console.error('Error fetching referral code:', error);
      return null;
    }
  };

  const sendReferralInvite = async (email: string) => {
    if (!user) {
      toast.error('Please log in to send referrals');
      return false;
    }

    try {
      const { error } = await supabase
        .from('referrals')
        .insert({
          referrer_id: user.id,
          referred_email: email,
        });

      if (error) throw error;
      toast.success(`Referral invitation sent to ${email}`);
      return true;
    } catch (error) {
      console.error('Error sending referral:', error);
      toast.error('Failed to send referral invitation');
      return false;
    }
  };

  const getReferralStats = async () => {
    if (!user) return { total: 0, completed: 0, pending: 0 };

    try {
      const { data, error } = await supabase
        .from('referrals')
        .select('*')
        .eq('referrer_id', user.id);

      if (error) throw error;

      const total = data?.length || 0;
      const completed = data?.filter(r => r.status === 'completed').length || 0;
      const pending = data?.filter(r => r.status === 'pending').length || 0;

      return { total, completed, pending };
    } catch (error) {
      console.error('Error fetching referral stats:', error);
      return { total: 0, completed: 0, pending: 0 };
    }
  };

  return {
    credits,
    loading,
    autoRefillEnabled,
    autoRefillThreshold,
    deductCredits,
    getCreditLogs,
    updateAutoRefill,
    buyCredits,
    getReferralCode,
    sendReferralInvite,
    getReferralStats,
    refetch: fetchCredits,
    hasEnoughCredits: (cost: number) => credits >= cost,
    isLowCredits: credits <= 50,
    isOutOfCredits: credits === 0,
  };
};
