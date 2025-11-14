import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Coins, ArrowRight, Sparkles, Zap, CheckCircle, AlertCircle } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import InteractiveLighting from '@/components/InteractiveLighting';
import FloatingUIElements from '@/components/FloatingUIElements';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { useCredits, CREDIT_COSTS, CREDIT_PACKS } from '@/hooks/useCredits';
import { toast } from 'sonner';

const Credits = () => {
  const { user, loading: authLoading } = useAuth();
  const { credits, loading: creditsLoading, buyCredits, isLowCredits, autoRefillEnabled, updateAutoRefill, getCreditLogs, getReferralCode, sendReferralInvite, getReferralStats } = useCredits();
  const navigate = useNavigate();
  const [creditLogs, setCreditLogs] = useState<any[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(false);
  const [referralCode, setReferralCode] = useState<string>('');
  const [referralStats, setReferralStats] = useState({ total: 0, completed: 0, pending: 0 });
  const [inviteEmail, setInviteEmail] = useState('');

  useEffect(() => {
    if (user) {
      loadCreditLogs();
      loadReferralData();
    }
  }, [user]);

  const loadCreditLogs = async () => {
    setLoadingLogs(true);
    const logs = await getCreditLogs(10);
    setCreditLogs(logs);
    setLoadingLogs(false);
  };

  const loadReferralData = async () => {
    const code = await getReferralCode();
    if (code) setReferralCode(code);
    const stats = await getReferralStats();
    setReferralStats(stats);
  };

  const handleSendInvite = async () => {
    if (!inviteEmail) {
      toast.error('Please enter an email address');
      return;
    }
    const success = await sendReferralInvite(inviteEmail);
    if (success) {
      setInviteEmail('');
      loadReferralData();
    }
  };

  const copyReferralLink = () => {
    const link = `${window.location.origin}/signup?ref=${referralCode}`;
    navigator.clipboard.writeText(link);
    toast.success('Referral link copied to clipboard!');
  };

  const handleBuyCredits = (priceId: string) => {
    if (!user) {
      toast.info('Please log in to purchase credits');
      navigate('/login');
      return;
    }
    buyCredits(priceId);
  };

  const usageCosts = [
    { action: 'Add Component', credits: CREDIT_COSTS.ADD_COMPONENT, example: 'New section block' },
    { action: 'Add Page', credits: CREDIT_COSTS.ADD_PAGE, example: 'Multi-page setup' },
    { action: 'AI Text', credits: CREDIT_COSTS.AI_TEXT_GENERATION, example: 'Generate copy' },
    { action: 'AI Layout', credits: CREDIT_COSTS.AI_LAYOUT_GENERATION, example: 'Generate design' },
    { action: 'AI Image', credits: CREDIT_COSTS.AI_IMAGE_GENERATION, example: 'Generate visuals' },
    { action: 'Publish', credits: CREDIT_COSTS.PUBLISH_SUBDOMAIN, example: 'Go live' },
    { action: 'Custom Domain', credits: CREDIT_COSTS.CONNECT_CUSTOM_DOMAIN, example: 'Connect your brand' },
  ];

  return (
    <div className="min-h-screen relative">
      <InteractiveLighting />
      <FloatingUIElements />
      <Navigation />
      
      <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass glass-glow rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Simple, Transparent Pricing</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Power your builder with credits.
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8">
            Pay as you build — every action, AI generation, and feature uses credits.<br />
            Simple, transparent, scalable.
          </p>

          {!user && (
            <Button size="lg" className="glass glass-glow group" asChild>
              <Link to="/signup">
                Start Building Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          )}
        </div>

        {/* User Balance Section (Logged In Only) */}
        {user && !authLoading && !creditsLoading && (
          <div className="max-w-4xl mx-auto mb-12">
            <Card className="glass glass-glow p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Your Balance</h3>
                  <div className="flex items-center gap-3">
                    <Coins className="w-8 h-8 text-primary" />
                    <span className="text-4xl font-bold">{credits.toLocaleString()}</span>
                    <span className="text-muted-foreground">credits</span>
                  </div>
                </div>
                <Button onClick={() => navigate('/billing')} variant="outline" className="glass">
                  View Full History
                </Button>
              </div>

              {isLowCredits && (
                <Alert className="glass border-destructive/50 mb-6">
                  <AlertCircle className="h-4 w-4 text-destructive" />
                  <AlertDescription className="text-destructive">
                    Low credits! Add more to continue building without interruption.
                  </AlertDescription>
                </Alert>
              )}

              {/* Auto-Refill Toggle */}
              <div className="flex items-center justify-between p-4 glass rounded-lg">
                <div>
                  <p className="font-medium mb-1">Auto-Refill</p>
                  <p className="text-sm text-muted-foreground">
                    Automatically purchase credits when balance falls below 50
                  </p>
                </div>
                <Switch
                  checked={autoRefillEnabled}
                  onCheckedChange={(checked) => updateAutoRefill(checked)}
                />
              </div>
            </Card>
          </div>
        )}

        {/* Pricing Grid */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Choose Your Pack</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CREDIT_PACKS.map((pack, index) => (
              <Card
                key={pack.priceId}
                className={`glass glass-glow p-6 relative overflow-hidden transition-all hover:scale-105 ${
                  index === 1 ? 'ring-2 ring-primary' : ''
                }`}
              >
                {index === 1 && (
                  <div className="absolute top-4 right-4 px-3 py-1 glass glass-glow rounded-full text-xs font-semibold text-primary">
                    Most Popular
                  </div>
                )}
                
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">{pack.name}</h3>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-bold">€{pack.price}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Coins className="w-4 h-4" />
                    <span className="text-lg font-semibold">{pack.credits.toLocaleString()} credits</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{pack.description}</p>
                </div>

                <Button
                  onClick={() => handleBuyCredits(pack.priceId)}
                  className="w-full glass glass-glow group"
                  disabled={authLoading}
                >
                  {user ? 'Buy Now' : 'Sign Up to Buy'}
                  <Zap className="ml-2 w-4 h-4 group-hover:rotate-12 transition-transform" />
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Usage Costs Table */}
        <div className="max-w-4xl mx-auto mb-20">
          <Card className="glass glass-glow p-8">
            <h2 className="text-3xl font-bold text-center mb-8">What Credits Buy</h2>
            
            <div className="space-y-4">
              {usageCosts.map((cost) => (
                <div
                  key={cost.action}
                  className="flex items-center justify-between p-4 glass rounded-lg hover:bg-white/5 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-semibold">{cost.action}</p>
                    <p className="text-sm text-muted-foreground">{cost.example}</p>
                  </div>
                  <div className="flex items-center gap-2 text-primary font-bold">
                    <Coins className="w-4 h-4" />
                    <span>{cost.credits}</span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-muted-foreground mt-8 italic">
              You control what you spend — only pay for what you build.
            </p>
          </Card>
        </div>

        {/* Referral Section (Logged In Only) */}
        {user && referralCode && (
          <div className="max-w-4xl mx-auto mb-20">
            <Card className="glass glass-glow p-8">
              <h2 className="text-3xl font-bold text-center mb-4">Invite Friends, Earn Credits</h2>
              <p className="text-center text-muted-foreground mb-8">
                Share your referral link and earn 100 credits for each friend who signs up!
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="glass p-6 rounded-lg text-center">
                  <div className="text-4xl font-bold text-primary mb-2">{referralStats.total}</div>
                  <div className="text-sm text-muted-foreground">Total Referrals</div>
                </div>
                <div className="glass p-6 rounded-lg text-center">
                  <div className="text-4xl font-bold text-green-500 mb-2">{referralStats.completed}</div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </div>
                <div className="glass p-6 rounded-lg text-center">
                  <div className="text-4xl font-bold text-yellow-500 mb-2">{referralStats.pending}</div>
                  <div className="text-sm text-muted-foreground">Pending</div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block">Your Referral Code</Label>
                  <div className="flex gap-2">
                    <Input 
                      value={referralCode} 
                      readOnly 
                      className="glass font-mono text-lg"
                    />
                    <Button onClick={copyReferralLink} className="glass glass-glow">
                      Copy Link
                    </Button>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Send Invitation</Label>
                  <div className="flex gap-2">
                    <Input 
                      type="email"
                      placeholder="friend@example.com"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      className="glass"
                    />
                    <Button onClick={handleSendInvite} className="glass glass-glow">
                      <Sparkles className="mr-2 w-4 h-4" />
                      Invite
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Recent Transactions (Logged In Only) */}
        {user && creditLogs.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <Card className="glass glass-glow p-8">
              <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
              
              <div className="space-y-3">
                {creditLogs.slice(0, 5).map((log) => (
                  <div
                    key={log.id}
                    className="flex items-center justify-between p-3 glass rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${log.credits_used > 0 ? 'bg-destructive/20' : 'bg-primary/20'}`}>
                        <Coins className={`w-4 h-4 ${log.credits_used > 0 ? 'text-destructive' : 'text-primary'}`} />
                      </div>
                      <div>
                        <p className="font-medium">{log.action}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(log.timestamp).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${log.credits_used > 0 ? 'text-destructive' : 'text-primary'}`}>
                        {log.credits_used > 0 ? '-' : '+'}{Math.abs(log.credits_used)}
                      </p>
                      <p className="text-xs text-muted-foreground">{log.credits_after} total</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                onClick={() => navigate('/billing')}
                variant="outline"
                className="w-full mt-6 glass"
              >
                View All Transactions
              </Button>
            </Card>
          </div>
        )}

        {/* CTA for Non-Logged In Users */}
        {!user && (
          <div className="max-w-2xl mx-auto text-center mt-16">
            <Card className="glass glass-glow p-8">
              <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Ready to Start Building?</h3>
              <p className="text-muted-foreground mb-6">
                Sign up now and get 100 free credits to start creating your website.
              </p>
              <div className="flex gap-4 justify-center">
                <Button size="lg" className="glass glass-glow" asChild>
                  <Link to="/signup">
                    Create Free Account
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="glass" asChild>
                  <Link to="/login">
                    Log In
                  </Link>
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Credits;
