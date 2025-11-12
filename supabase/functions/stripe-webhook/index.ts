import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') as string, {
  apiVersion: '2023-10-16',
});

const supabaseUrl = Deno.env.get('SUPABASE_URL') as string;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string;
const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET') as string;

serve(async (req) => {
  const signature = req.headers.get('stripe-signature');
  if (!signature) {
    return new Response('No signature', { status: 400 });
  }

  try {
    const body = await req.text();
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('Received event:', event.type);

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.user_id;
        const sessionType = session.metadata?.type;

        if (!userId) {
          console.error('No user_id in session metadata');
          break;
        }

        // Handle credit purchases
        if (sessionType === 'credits') {
          const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
          const priceId = lineItems.data[0]?.price?.id;

          // Map price ID to credit amount
          const creditMap: Record<string, number> = {
            'price_1SSjmBLW3HLLN5bg8qdKaskZ': 300,  // Starter
            'price_1SSjmCLW3HLLN5bgOKbMaMeT': 750,  // Pro
            'price_1SSjmDLW3HLLN5bg1cDg9NBB': 2000, // Business
            'price_1SSjmELW3HLLN5bgDbDjpAjz': 5000, // Enterprise
          };

          const creditsToAdd = priceId ? creditMap[priceId] : 0;

          if (creditsToAdd > 0) {
            await supabase.rpc('add_credits', {
              _user_id: userId,
              _action: 'Credit Purchase',
              _credits_to_add: creditsToAdd,
              _metadata: {
                session_id: session.id,
                price_id: priceId,
                amount_paid: session.amount_total,
              },
            });
          }
          break;
        }

        // Get subscription or payment intent details
        if (session.mode === 'subscription' && session.subscription) {
          const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
          );

          const priceId = subscription.items.data[0].price.id;
          let plan = 'starter';
          
          // Map price ID to plan
          if (priceId === 'price_1SSjKhLW3HLLN5bgVRRYAgbA') plan = 'starter';
          else if (priceId === 'price_1SSjKhLW3HLLN5bgifDnQeHL') plan = 'pro';
          else if (priceId === 'price_1SSjKiLW3HLLN5bgMCQYLtEO') plan = 'business';

          await supabase
            .from('subscriptions')
            .upsert({
              user_id: userId,
              stripe_subscription_id: subscription.id,
              stripe_customer_id: subscription.customer as string,
              plan,
              status: subscription.status,
              current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            });
        } else if (session.mode === 'payment') {
          // One-time payment
          await supabase
            .from('subscriptions')
            .upsert({
              user_id: userId,
              stripe_customer_id: session.customer as string,
              plan: 'one_time',
              status: 'active',
            });
        }
        break;
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        // Get user from customer ID
        const { data: existingSub } = await supabase
          .from('subscriptions')
          .select('user_id')
          .eq('stripe_customer_id', customerId)
          .single();

        if (existingSub) {
          await supabase
            .from('subscriptions')
            .update({
              status: subscription.status,
              current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            })
            .eq('user_id', existingSub.user_id);
        }
        break;
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
});
