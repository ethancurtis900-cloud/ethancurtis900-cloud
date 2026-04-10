import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserProfile } from '../components/UserProfile'
import { useAuth } from '../hooks/useAuth'
import { Footer } from '../components/Footer'

export function Profile() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login')
    }
  }, [user, loading, navigate])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-transparent border-t-emerald-500 border-r-cyan-500 mx-auto"></div>
          <p className="mt-4 text-slate-300">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 rounded-full blur-3xl opacity-5"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-5"></div>

        <div className="max-w-2xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-3">Your Profile</h1>
            <p className="text-slate-300 text-lg">Manage your account and view your purchases</p>
          </div>
          <UserProfile />
        </div>
      </div>
      <Footer />
    </div>
  )
}