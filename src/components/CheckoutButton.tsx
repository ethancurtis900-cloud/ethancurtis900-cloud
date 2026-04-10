import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { stripeProducts } from '../stripe-config';

interface CheckoutButtonProps {
  variant?: 'primary' | 'secondary';
  className?: string;
  children?: React.ReactNode;
}

export function CheckoutButton({ variant = 'primary', className = '', children }: CheckoutButtonProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!user) {
      navigate('/signup');
      return;
    }

    setLoading(true);

    try {
      const session = await supabase.auth.getSession();
      const accessToken = session.data.session?.access_token;

      if (!accessToken) {
        navigate('/signup');
        return;
      }

      const product = stripeProducts[0];
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            price_id: product.priceId,
            mode: product.mode,
            success_url: `${window.location.origin}/success`,
            cancel_url: window.location.href,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert(`Failed to start checkout: ${error instanceof Error ? error.message : 'Please try again.'}`);
    } finally {
      setLoading(false);
    }
  };

  const baseStyles = variant === 'primary'
    ? 'group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
    : 'inline-flex items-center justify-center gap-2 bg-gradient-to-r from-lime-500 to-emerald-500 hover:from-lime-600 hover:to-emerald-600 text-white px-10 py-4 rounded-lg font-bold transition-all transform hover:scale-105 shadow-2xl shadow-emerald-500/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100';

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={`${baseStyles} ${className}`}
    >
      {loading ? 'Loading...' : (children || 'Launch Your Site')}
      {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
    </button>
  );
}
