import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useCredits, CREDIT_PACKS } from '@/hooks/useCredits';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Coins, CreditCard, History, Settings, Zap } from 'lucide-react';
import { toast } from 'sonner';

export default function Billing() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    credits,
    loading,
    autoRefillEnabled,
    autoRefillThreshold,
    updateAutoRefill,
    buyCredits,
    getCreditLogs,
  } = useCredits();
  const [creditLogs, setCreditLogs] = useState<any[]>([]);
  const [logsLoading, setLogsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    loadCreditLogs();
  }, [user, navigate]);

  const loadCreditLogs = async () => {
    setLogsLoading(true);
    const logs = await getCreditLogs(20);
    setCreditLogs(logs);
    setLogsLoading(false);
  };

  const handleBuyCredits = (priceId: string) => {
    buyCredits(priceId);
  };

  const handleAutoRefillToggle = (enabled: boolean) => {
    updateAutoRefill(enabled);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/40 bg-card/30 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/dashboard')}
              className="glass glass-glow rounded-xl"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Billing & Credits
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage your credits and payment settings
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Current Balance */}
        <Card className="glass glass-glow border-border/50 p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Current Balance</p>
              <div className="flex items-center gap-3">
                <Coins className="w-8 h-8 text-primary" />
                <span className="text-4xl font-bold">{credits.toLocaleString()}</span>
                <span className="text-muted-foreground">credits</span>
              </div>
              <p className="text-xs text-muted-foreground">€1 = 100 credits</p>
            </div>
            <Button
              onClick={() => document.getElementById('credit-packs')?.scrollIntoView({ behavior: 'smooth' })}
              size="lg"
              className="glass glass-glow"
            >
              <Coins className="w-5 h-5 mr-2" />
              Add Credits
            </Button>
          </div>
        </Card>

        {/* Auto-Refill Settings */}
        <Card className="glass glass-glow border-border/50 p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 glass rounded-xl">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-1">Auto-Refill</h3>
                <p className="text-sm text-muted-foreground">
                  Automatically purchase credits when your balance drops below {autoRefillThreshold} credits
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Switch
                  id="auto-refill"
                  checked={autoRefillEnabled}
                  onCheckedChange={handleAutoRefillToggle}
                />
                <Label htmlFor="auto-refill" className="cursor-pointer">
                  {autoRefillEnabled ? 'Enabled' : 'Disabled'}
                </Label>
              </div>
            </div>
          </div>
        </Card>

        {/* Credit Packs */}
        <div id="credit-packs" className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 glass rounded-lg">
              <CreditCard className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Credit Packs</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CREDIT_PACKS.map((pack) => (
              <Card
                key={pack.priceId}
                className="glass glass-glow border-border/50 p-6 hover:scale-105 transition-all"
              >
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold">{pack.name}</h3>
                    <p className="text-sm text-muted-foreground">{pack.description}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold">€{pack.price}</span>
                    </div>
                    <div className="flex items-center gap-2 text-primary">
                      <Coins className="w-4 h-4" />
                      <span className="font-semibold">{pack.credits.toLocaleString()} credits</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleBuyCredits(pack.priceId)}
                    className="w-full"
                    variant="default"
                  >
                    Purchase
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Usage History */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 glass rounded-lg">
              <History className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Usage History</h2>
          </div>

          <Card className="glass glass-glow border-border/50 overflow-hidden">
            {logsLoading ? (
              <div className="p-8 text-center text-muted-foreground">Loading...</div>
            ) : creditLogs.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">No usage history yet</div>
            ) : (
              <div className="divide-y divide-border/30">
                {creditLogs.map((log) => (
                  <div key={log.id} className="p-4 hover:bg-accent/5 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-medium">{log.action}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(log.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${log.credits_used > 0 ? 'text-destructive' : 'text-primary'}`}>
                          {log.credits_used > 0 ? '-' : '+'}
                          {Math.abs(log.credits_used)} credits
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Balance: {log.credits_after}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
