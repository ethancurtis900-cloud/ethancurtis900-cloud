import { Mail, CheckCircle } from 'lucide-react'

interface EmailConfirmationModalProps {
  email: string
  onClose?: () => void
}

export function EmailConfirmationModal({ email, onClose }: EmailConfirmationModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-md">
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl blur-xl opacity-30 animate-pulse"></div>

        <div className="relative bg-slate-900 rounded-2xl shadow-2xl border border-slate-800/50 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500"></div>

          <div className="p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-500">
              <Mail className="w-8 h-8 text-emerald-400" />
            </div>

            <div className="flex items-center justify-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <h3 className="text-2xl font-bold text-white">Check Your Email</h3>
            </div>

            <p className="text-slate-300 mb-6 leading-relaxed">
              We've sent a confirmation link to
            </p>

            <div className="bg-slate-950/50 rounded-lg p-4 mb-6 border border-slate-800/50">
              <p className="text-emerald-400 font-medium break-all">{email}</p>
            </div>

            <div className="space-y-3 text-sm text-slate-400">
              <p className="flex items-start gap-2">
                <span className="text-emerald-500 mt-0.5">•</span>
                <span>Click the confirmation link in the email to activate your account</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-emerald-500 mt-0.5">•</span>
                <span>You'll be redirected back to this site automatically</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-emerald-500 mt-0.5">•</span>
                <span>If you don't see the email, check your spam folder</span>
              </p>
            </div>

            {onClose && (
              <button
                onClick={onClose}
                className="mt-8 w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold rounded-lg shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all hover:scale-[1.02]"
              >
                Got it
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
