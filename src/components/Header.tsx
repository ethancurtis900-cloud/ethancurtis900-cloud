import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useSubscription } from '@/hooks/useSubscription'
import { getProductByPriceId } from '@/stripe-config'
import { Button } from '@/components/ui/button'
import { User, LogOut } from 'lucide-react'
import { Logo } from './Logo'

export function Header() {
  const { user, signOut } = useAuth()
  const { subscription } = useSubscription()

  const currentPlan = subscription?.price_id
    ? getProductByPriceId(subscription.price_id)?.name
    : null;

  return (
    <header className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="shadow-lg shadow-emerald-500/25 group-hover:shadow-emerald-500/40 transition-all group-hover:scale-105 rounded-xl">
                <Logo className="w-10 h-10" />
              </div>
              <span className="text-xl font-bold text-white">
                Metro<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Nexa</span>
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-slate-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-slate-300 hover:text-white transition-colors">
              Products
            </Link>
            <Link to="/faq" className="text-slate-300 hover:text-white transition-colors">
              FAQs
            </Link>
            <Link to="/contact" className="text-slate-300 hover:text-white transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-slate-300" />
                  <span className="text-sm text-slate-300">{user.email}</span>
                  {currentPlan && (
                    <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded-full border border-cyan-500/30">
                      {currentPlan}
                    </span>
                  )}
                </div>
                <Button variant="ghost" size="sm" onClick={signOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-slate-800/50">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="bg-gray-900 hover:bg-black text-white shadow-lg shadow-black/20">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}