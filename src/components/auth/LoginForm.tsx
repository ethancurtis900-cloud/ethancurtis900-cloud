import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Eye, EyeOff } from 'lucide-react'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [resetEmailSent, setResetEmailSent] = useState(false)
  const [sendingReset, setSendingReset] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message)
      } else {
        navigate('/')
      }
    } catch (error) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email address')
      return
    }

    setSendingReset(true)
    setError('')

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) {
        setError(error.message)
      } else {
        setResetEmailSent(true)
      }
    } catch (error) {
      setError('Failed to send reset email')
    } finally {
      setSendingReset(false)
    }
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 rounded-full blur-3xl opacity-5"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-5"></div>

        <Card className="w-full max-w-md bg-slate-900/50 backdrop-blur-xl border-slate-800/50 relative z-10 shadow-2xl shadow-emerald-500/5">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-white">Sign in</CardTitle>
          <CardDescription className="text-center text-slate-400">
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="bg-slate-950/50 border-slate-700 text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-slate-300">Password</Label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={sendingReset}
                  className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors disabled:opacity-50"
                >
                  {sendingReset ? 'Sending...' : 'Forgot password?'}
                </button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="bg-slate-950/50 border-slate-700 text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {resetEmailSent && (
              <Alert variant="success">
                <AlertDescription>
                  Password reset email sent! Check your inbox.
                </AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all hover:scale-[1.02]"
              disabled={loading}
              size="lg"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign in
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-300">
            Don't have an account?{' '}
            <Link to="/signup" className="text-emerald-400 hover:text-emerald-300 transition-colors">
              Sign up
            </Link>
          </div>
        </CardContent>
        </Card>
      </div>
    </>
  )
}