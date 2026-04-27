import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { useAuth } from '../hooks/useAuth'
import { useStripe } from '../hooks/useStripe'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { User, CreditCard, Package, LogOut, Pencil, Check, X } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { formatCurrency } from '../lib/utils'

export function Dashboard() {
  const navigate = useNavigate()
  const { user, signOut, loading: authLoading } = useAuth()
  const { subscription, orders } = useStripe()
  const [username, setUsername] = useState('')
  const [editingUsername, setEditingUsername] = useState(false)
  const [usernameInput, setUsernameInput] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [usernameLoading, setUsernameLoading] = useState(false)

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login')
    }
  }, [user, authLoading, navigate])

  useEffect(() => {
    if (user) {
      supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .maybeSingle()
        .then(({ data }) => {
          if (data?.username) setUsername(data.username)
        })
    }
  }, [user])

  const handleEditUsername = () => {
    setUsernameInput(username)
    setUsernameError('')
    setEditingUsername(true)
  }

  const handleCancelUsername = () => {
    setEditingUsername(false)
    setUsernameError('')
  }

  const handleSaveUsername = async () => {
    const trimmed = usernameInput.trim()
    if (!trimmed) {
      setUsernameError('Username cannot be empty.')
      return
    }
    if (!/^[a-zA-Z0-9_-]{8,15}$/.test(trimmed)) {
      setUsernameError('8–15 characters. Letters, numbers, _ and - only.')
      return
    }
    setUsernameLoading(true)
    setUsernameError('')
    const { error } = await supabase
      .from('profiles')
      .update({ username: trimmed })
      .eq('id', user!.id)
    setUsernameLoading(false)
    if (error) {
      if (error.code === '23505') {
        setUsernameError('That username is already taken.')
      } else {
        setUsernameError('Failed to save. Please try again.')
      }
    } else {
      setUsername(trimmed)
      setEditingUsername(false)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-transparent border-t-emerald-500 border-r-cyan-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative pt-24 pb-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-12">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                  Welcome back{user.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : ''}
                </h1>
                <p className="text-gray-600 text-lg">Manage your account and track your services</p>
              </div>
              <Button
                onClick={handleSignOut}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-emerald-50 to-cyan-50 border-emerald-200 hover:border-emerald-400 transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <User className="h-5 w-5 text-emerald-600" />
                  Account Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Status</span>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                      Active
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Member Since</span>
                    <span className="text-gray-900 font-medium">
                      {new Date(user.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
                <CardDescription className="text-gray-500">Your account details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Email</span>
                    <span className="text-gray-900 font-medium">{user.email}</span>
                  </div>
                  <div className="py-3 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">Username</span>
                      {!editingUsername && (
                        <button
                          onClick={handleEditUsername}
                          className="flex items-center gap-1.5 text-sm text-emerald-600 hover:text-emerald-700 transition-colors"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                          {username ? 'Edit' : 'Set username'}
                        </button>
                      )}
                    </div>
                    {editingUsername ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Input
                            value={usernameInput}
                            onChange={e => setUsernameInput(e.target.value)}
                            placeholder="e.g. john_doe"
                            className="bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 h-9 text-sm"
                            onKeyDown={e => { if (e.key === 'Enter') handleSaveUsername(); if (e.key === 'Escape') handleCancelUsername() }}
                            autoFocus
                          />
                          <button
                            onClick={handleSaveUsername}
                            disabled={usernameLoading}
                            className="p-2 rounded-lg bg-emerald-100 text-emerald-600 hover:bg-emerald-200 transition-colors disabled:opacity-50"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button
                            onClick={handleCancelUsername}
                            className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        {usernameError && (
                          <p className="text-red-500 text-xs">{usernameError}</p>
                        )}
                        <p className="text-gray-400 text-xs">8–15 characters. Letters, numbers, _ and - only.</p>
                      </div>
                    ) : (
                      <span className="text-gray-900 font-medium">
                        {username || <span className="text-gray-400 italic text-sm">No username set</span>}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-gray-600">Account Type</span>
                    <span className="text-gray-900 font-medium">
                      {subscription ? 'Premium' : 'Standard'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {subscription ? (
              <Card className="bg-white border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <Package className="h-5 w-5" />
                    Active Subscription
                  </CardTitle>
                  <CardDescription className="text-gray-500">Your current plan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600">Plan</span>
                      <span className="text-gray-900 font-semibold">{subscription.product_name}</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600">Status</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        subscription.subscription_status === 'active'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {subscription.subscription_status}
                      </span>
                    </div>
                    {subscription.current_period_end && (
                      <div className="flex items-center justify-between py-3">
                        <span className="text-gray-600">Next Billing</span>
                        <span className="text-gray-900 font-medium">
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
            <Card className="mt-6 bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <CreditCard className="h-5 w-5" />
                  Recent Orders
                </CardTitle>
                <CardDescription className="text-gray-500">Your purchase history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(orders || []).slice(0, 5).map((order) => (
                    <div
                      key={order.order_id}
                      className="flex items-center justify-between py-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 -mx-4 px-4 rounded-lg transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-medium text-gray-900">Order #{order.order_id}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            order.order_status === 'completed'
                              ? 'bg-emerald-100 text-emerald-700'
                              : order.order_status === 'pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {order.order_status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">
                          {new Date(order.order_date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-gray-900">
                          {formatCurrency(order.amount_total / 100, order.currency)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {(orders?.length || 0) > 5 && (
                  <div className="mt-4 text-center">
                    <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100">
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
