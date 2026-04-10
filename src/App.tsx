import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Home } from './pages/Home'
import { Products } from './pages/Products'
import { Success } from './pages/Success'
import { FAQ } from './pages/FAQ'
import { About } from './pages/About'
import { ContactUs } from './pages/ContactUs'
import { TestimonialsPage } from './pages/TestimonialsPage'
import { LoginForm } from './components/auth/LoginForm'
import { SignupForm } from './components/auth/SignupForm'
import { Profile } from './pages/Profile'
import { Dashboard } from './pages/Dashboard'
import { Pricing } from './pages/Pricing'
import { EmailConfirmed } from './pages/EmailConfirmed'
import ResetPassword from './pages/ResetPassword'
import { GetStarted } from './pages/GetStarted'
import { TermsAndConditions } from './pages/TermsAndConditions'
import { PrivacyPolicy } from './pages/PrivacyPolicy'
import Admin from './pages/Admin'
import { supabase } from './lib/supabase'

function AppContent() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        const searchParams = new URLSearchParams(location.search)
        const isEmailConfirmation = searchParams.get('type') === 'signup' || searchParams.get('type') === 'email'

        if (isEmailConfirmation) {
          navigate('/email-confirmed')
        } else if (location.pathname === '/login' || location.pathname === '/signup') {
          navigate('/dashboard')
        }
      } else if (event === 'PASSWORD_RECOVERY') {
        navigate('/reset-password')
      }
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [navigate, location])

  return (
    <div className="min-h-screen bg-slate-950">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/success" element={<Success />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/email-confirmed" element={<EmailConfirmed />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App