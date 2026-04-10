import React from 'react';
import { Crown, Package, Calendar } from 'lucide-react';
import { useSubscription } from '../hooks/useSubscription';
import { getProductByPriceId } from '../stripe-config';

export function SubscriptionStatus() {
  const { subscription, orders, loading, hasActiveSubscription } = useSubscription();

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  // Show completed orders if no active subscription
  if (!hasActiveSubscription && orders.some(order => order.order_status === 'completed')) {
    const completedOrder = orders.find(order => order.order_status === 'completed');
    if (completedOrder) {
      return (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
          <div className="flex items-center">
            <Package className="h-5 w-5 text-emerald-600 mr-3" />
            <div>
              <h3 className="font-semibold text-emerald-900">MetroNexa Web Launch</h3>
              <p className="text-sm text-emerald-700">
                Purchased on {new Date(completedOrder.order_date!).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      );
    }
  }

  // Show active subscription
  if (hasActiveSubscription && subscription) {
    const product = getProductByPriceId(subscription.price_id!);
    
    return (
      <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 border border-emerald-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Crown className="h-5 w-5 text-emerald-600 mr-3" />
            <div>
              <h3 className="font-semibold text-emerald-900">
                {product?.name || 'Active Plan'}
              </h3>
              <p className="text-sm text-emerald-700 capitalize">
                Status: {subscription.subscription_status}
              </p>
            </div>
          </div>
          {subscription.current_period_end && (
            <div className="text-right">
              <div className="flex items-center text-sm text-emerald-700">
                <Calendar className="h-4 w-4 mr-1" />
                <span>
                  Renews {new Date(subscription.current_period_end * 1000).toLocaleDateString()}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // No subscription or orders
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
      <div className="text-center">
        <Package className="h-8 w-8 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-600 text-sm">No active plan</p>
        <a 
          href="/pricing" 
          className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
        >
          View pricing →
        </a>
      </div>
    </div>
  );
}