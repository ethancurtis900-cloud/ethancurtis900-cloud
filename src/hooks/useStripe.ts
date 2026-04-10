import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'
import { getProductByPriceId } from '../stripe-config'

export function useStripe() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [subscription, setSubscription] = useState<any>(null)
  const [orders, setOrders] = useState<any[]>([])

  useEffect(() => {
    if (user) {
      fetchUserData()
    }
  }, [user])

  const fetchUserData = async () => {
    if (!user) return

    try {
      // Fetch subscription data
      const { data: subData, error: subError } = await supabase
        .from('stripe_user_subscriptions')
        .select('*')
        .maybeSingle()

      if (subError) {
        console.error('Error fetching subscription:', subError)
      } else if (subData) {
        const product = getProductByPriceId(subData.price_id || '')
        setSubscription({
          ...subData,
          product_name: product?.name || 'Unknown Product'
        })
      }

      // Fetch orders data
      const { data: ordersData, error: ordersError } = await supabase
        .from('stripe_user_orders')
        .select('*')
        .order('order_date', { ascending: false })

      if (ordersError) {
        console.error('Error fetching orders:', ordersError)
        setOrders([])
      } else {
        setOrders(ordersData || [])
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
      setOrders([])
    }
  }

  const createCheckoutSession = async (priceId: string) => {
    if (!user) {
      throw new Error('User must be authenticated')
    }

    setLoading(true)
    try {
      const session = await supabase.auth.getSession()
      const accessToken = session.data.session?.access_token

      if (!accessToken) {
        throw new Error('No access token available')
      }

      const product = getProductByPriceId(priceId)
      if (!product) {
        throw new Error('Invalid product')
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            price_id: priceId,
            mode: product.mode,
            success_url: `${window.location.origin}/success`,
            cancel_url: window.location.href,
          }),
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create checkout session')
      }

      const { url } = await response.json()
      if (url) {
        window.location.href = url
      } else {
        throw new Error('No checkout URL returned')
      }
    } catch (error) {
      console.error('Error creating checkout session:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    subscription,
    orders,
    createCheckoutSession,
    refetch: fetchUserData,
  }
}