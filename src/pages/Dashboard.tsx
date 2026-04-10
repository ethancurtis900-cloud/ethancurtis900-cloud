import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { useAuth } from '../hooks/useAuth'
import { useStripe } from '../hooks/useStripe'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { User, CreditCard, Package, ShoppingBag, LogOut, TrendingUp } from 'lucide-react'
import { formatCurrency } from '../lib/utils'

export function Dashboard() {
  const navigate = useNavigate()
  const { user, signOut, loading: authLoading } = useAuth()
  const { subscription, orders } = useStripe()

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login')
    }
  }, [user, authLoading, navigate])

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-transparent border-t-emerald-500 border-r-cyan-500 mx-auto"></div>
          <p className="mt-4 text-slate-300">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <div className="relative pt-24 pb-20 px-4 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500 rounded-full blur-3xl opacity-5"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-500 rounded-full blur-3xl opacity-5"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-12">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                  Welcome back{user.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : ''}
                </h1>
                <p className="text-slate-400 text-lg">Manage your account and track your services</p>
              </div>
              <Button
                onClick={handleSignOut}
                variant="outline"
                className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border-emerald-500/20 hover:border-emerald-500/40 transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <User className="h-5 w-5 text-emerald-400" />
                  Account Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Status</span>
                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium">
                      Active
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Member Since</span>
                    <span className="text-white font-medium">
                      {new Date(user.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/20 hover:border-cyan-500/40 transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <ShoppingBag className="h-5 w-5 text-cyan-400" />
                  Total Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-2">{orders?.length || 0}</div>
                <p className="text-slate-400 text-sm">
                  {orders?.filter(o => o.order_status === 'completed').length || 0} completed
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20 hover:border-purple-500/40 transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <TrendingUp className="h-5 w-5 text-purple-400" />
                  Total Spent
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-2">
                  {formatCurrency(
                    (orders || []).reduce((sum, order) => sum + order.amount_total, 0) / 100,
                    orders?.[0]?.currency || 'usd'
                  )}
                </div>
                <p className="text-slate-400 text-sm">Lifetime value</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
                <CardDescription className="text-slate-400">Your account details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-slate-800">
                    <span className="text-slate-400">Email</span>
                    <span className="text-white font-medium">{user.email}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-slate-800">
                    <span className="text-slate-400">User ID</span>
                    <span className="text-white font-mono text-sm">{user.id.slice(0, 8)}...</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-slate-400">Account Type</span>
                    <span className="text-white font-medium">
                      {subscription ? 'Premium' : 'Standard'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {subscription ? (
              <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Package className="h-5 w-5" />
                    Active Subscription
                  </CardTitle>
                  <CardDescription className="text-slate-400">Your current plan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-slate-800">
                      <span className="text-slate-400">Plan</span>
                      <span className="text-white font-semibold">{subscription.product_name}</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-slate-800">
                      <span className="text-slate-400">Status</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        subscription.subscription_status === 'active'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {subscription.subscription_status}
                      </span>
                    </div>
                    {subscription.current_period_end && (
                      <div className="flex items-center justify-between py-3">
                        <span className="text-slate-400">Next Billing</span>
                        <span className="text-white font-medium">
                          {new Date(subscription.current_period_end * 1000).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : null}
          </div>

          {(orders?.length || 0) > 0 && (
            <Card className="mt-6 bg-slate-900/50 backdrop-blur-xl border-slate-800/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <CreditCard className="h-5 w-5" />
                  Recent Orders
                </CardTitle>
                <CardDescription className="text-slate-400">Your purchase history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(orders || []).slice(0, 5).map((order) => (
                    <div
                      key={order.order_id}
                      className="flex items-center justify-between py-4 border-b border-slate-800 last:border-b-0 hover:bg-slate-800/30 -mx-4 px-4 rounded-lg transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-medium text-white">Order #{order.order_id}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            order.order_status === 'completed'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : order.order_status === 'pending'
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            {order.order_status}
                          </span>
                        </div>
                        <p className="text-sm text-slate-400">
                          {new Date(order.order_date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-white">
                          {formatCurrency(order.amount_total / 100, order.currency)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {(orders?.length || 0) > 5 && (
                  <div className="mt-4 text-center">
                    <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                      View All Orders
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

        </div>
      </div>
      <Footer />
    </div>
  )
}