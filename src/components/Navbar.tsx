import { Menu, X, User, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Logo } from './Logo';
import { useAuth } from '../hooks/useAuth';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAdmin } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
            <div className="shadow-lg shadow-emerald-500/25 group-hover:shadow-emerald-500/40 transition-all group-hover:scale-105 rounded-xl">
              <Logo className="w-9 h-9 sm:w-10 sm:h-10" />
            </div>
            <div className="text-lg sm:text-xl font-bold text-white">
              Metro<span className="relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Nexa</span>
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500"></div>
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-slate-300 hover:text-white font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-emerald-500 after:to-cyan-500 hover:after:w-full after:transition-all">Home</Link>
            <Link to="/products" className="text-slate-300 hover:text-white font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-emerald-500 after:to-cyan-500 hover:after:w-full after:transition-all">Products</Link>
            <Link to="/faq" className="text-slate-300 hover:text-white font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-emerald-500 after:to-cyan-500 hover:after:w-full after:transition-all">FAQs</Link>
            <Link to="/testimonials" className="text-slate-300 hover:text-white font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-emerald-500 after:to-cyan-500 hover:after:w-full after:transition-all">Testimonials</Link>
            <Link to="/contact" className="text-slate-300 hover:text-white font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-emerald-500 after:to-cyan-500 hover:after:w-full after:transition-all">Contact</Link>
            {user ? (
              <div className="flex items-center gap-3">
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center gap-2 text-slate-300 hover:text-white font-medium transition-colors px-4 py-2 rounded-lg hover:bg-slate-800/50"
                  >
                    <Shield className="w-4 h-4" />
                    Admin
                  </Link>
                )}
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105"
                >
                  <User className="w-4 h-4" />
                  Dashboard
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-slate-300 hover:text-white font-medium transition-colors px-4 py-2 rounded-lg hover:bg-slate-800/50"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-3 text-slate-300 hover:text-white transition-colors touch-manipulation"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-slate-800/50">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-3 text-base text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors touch-manipulation"
            >
              Home
            </Link>
            <Link
              to="/products"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-3 text-base text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors touch-manipulation"
            >
              Products
            </Link>
            <Link
              to="/faq"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-3 text-base text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors touch-manipulation"
            >
              FAQs
            </Link>
            <Link
              to="/testimonials"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-3 text-base text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors touch-manipulation"
            >
              Testimonials
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-3 text-base text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors touch-manipulation"
            >
              Contact
            </Link>
            {user ? (
              <div className="space-y-2 mx-4">
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center gap-2 text-center text-slate-300 hover:text-white hover:bg-slate-800/50 px-6 py-3 rounded-lg font-medium transition-colors touch-manipulation"
                  >
                    <Shield className="w-4 h-4" />
                    Admin
                  </Link>
                )}
                <Link
                  to="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center gap-2 text-center bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-6 py-3.5 rounded-xl font-semibold transition-all shadow-lg shadow-emerald-500/25 text-base touch-manipulation"
                >
                  <User className="w-4 h-4" />
                  Dashboard
                </Link>
              </div>
            ) : (
              <div className="space-y-2 pt-2 mx-4">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-center text-slate-300 hover:text-white hover:bg-slate-800/50 px-6 py-3 rounded-lg font-medium transition-colors touch-manipulation"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-center bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-6 py-3.5 rounded-xl font-semibold transition-all shadow-lg shadow-emerald-500/25 text-base touch-manipulation"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}