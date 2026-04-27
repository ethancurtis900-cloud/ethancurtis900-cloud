import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function EmailConfirmed() {
  const [countdown, setCountdown] = useState(3)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          navigate('/dashboard')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 rounded-full blur-3xl opacity-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-10 animate-pulse"></div>

      <div className="relative w-full max-w-lg">
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-3xl blur-2xl opacity-20 animate-pulse"></div>

        <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-800/50 p-12 text-center">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center mb-8 animate-in zoom-in duration-500 shadow-lg shadow-emerald-500/50">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-3xl font-bold text-white mb-4">
            Email Confirmed!
          </h1>

          <p className="text-slate-300 text-lg mb-8">
            Your account has been successfully verified. You're all set to start using the platform.
          </p>

          <div className="bg-slate-950/50 rounded-xl p-6 mb-8 border border-slate-800/50">
            <p className="text-slate-400 text-sm mb-2">
              Redirecting to dashboard in
            </p>
            <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              {countdown}
            </p>
          </div>

          <Button
            onClick={() => navigate('/dashboard')}
            className="w-full bg-gray-900 hover:bg-black text-white font-semibold shadow-lg shadow-black/20 transition-all hover:scale-[1.02] text-lg py-6"
            size="lg"
          >
            Go to Dashboard Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
