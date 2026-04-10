import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { useAuth } from '../hooks/useAuth'
import { useStripe } from '../hooks/useStripe'
import { formatCurrency } from '../lib/utils'
import { User, CreditCard, Package } from 'lucide-react'

export function UserProfile() {
  const { user, signOut } = useAuth()
  const { subscription, orders } = useStripe()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile
          </CardTitle>
          <CardDescription>Your account information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>User ID:</strong> {user?.id}</p>
            <Button onClick={handleSignOut} variant="outline" className="mt-4">
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>

      {subscription && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Active Plan
            </CardTitle>
            <CardDescription>Your current subscription</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><strong>Plan:</strong> {subscription.product_name}</p>
              <p><strong>Status:</strong> 
                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                  subscription.subscription_status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {subscription.subscription_status}
                </span>
              </p>
              {subscription.current_period_end && (
                <p><strong>Next billing:</strong> {new Date(subscription.current_period_end * 1000).toLocaleDateString()}</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {orders.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Order History
            </CardTitle>
            <CardDescription>Your recent purchases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.order_id} className="border-b pb-4 last:border-b-0">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div>
                      <p className="font-medium">Order #{order.order_id}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.order_date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="sm:text-right">
                      <p className="font-medium">
                        {formatCurrency(order.amount_total / 100, order.currency)}
                      </p>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        order.order_status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : order.order_status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {order.order_status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}