import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

interface SubscriptionData {
  customer_id: string | null;
  subscription_id: string | null;
  subscription_status: string | null;
  price_id: string | null;
  current_period_start: number | null;
  current_period_end: number | null;
  cancel_at_period_end: boolean | null;
  payment_method_brand: string | null;
  payment_method_last4: string | null;
}

interface OrderData {
  customer_id: string | null;
  order_id: string | null;
  checkout_session_id: string | null;
  payment_intent_id: string | null;
  amount_subtotal: number | null;
  amount_total: number | null;
  currency: string | null;
  payment_status: string | null;
  order_status: string | null;
  order_date: string | null;
}

export function useSubscription() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setSubscription(null);
      setOrders([]);
      setLoading(false);
      return;
    }

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const { data: subData, error: subError } = await supabase
          .from('stripe_user_subscriptions')
          .select('*')
          .maybeSingle();

        if (subError) {
          console.error('Error fetching subscription:', subError);
        }

        setSubscription(subData || null);

        const { data: ordersData, error: ordersError } = await supabase
          .from('stripe_user_orders')
          .select('*')
          .order('order_date', { ascending: false });

        if (ordersError) {
          console.error('Error fetching orders:', ordersError);
        }

        setOrders(ordersData || []);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [user]);

  return {
    subscription,
    orders,
    loading,
    error,
    hasActiveSubscription: subscription?.subscription_status === 'active',
  };
}