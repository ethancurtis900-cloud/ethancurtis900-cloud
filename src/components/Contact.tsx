import { Mail, Instagram, Send } from 'lucide-react';
import { useState } from 'react';
import { rateLimiter, sanitizeInput, validateEmail } from '../lib/security';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    website: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      if (formData.website) {
        throw new Error('Invalid submission');
      }

      const sanitizedData = {
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email).toLowerCase(),
        phone: sanitizeInput(formData.phone),
        message: sanitizeInput(formData.message)
      };

      if (!sanitizedData.name || sanitizedData.name.length < 2) {
        throw new Error('Please enter a valid name');
      }

      if (!validateEmail(sanitizedData.email)) {
        throw new Error('Please enter a valid email address');
      }

      if (sanitizedData.message.length < 10) {
        throw new Error('Message must be at least 10 characters long');
      }

      const rateLimit = rateLimiter.checkRateLimit(`contact_${sanitizedData.email}`);
      if (!rateLimit.allowed) {
        throw new Error(`Too many requests. Please try again in ${rateLimit.retryAfter} seconds`);
      }

      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-email`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(sanitizedData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to send message');
      }

      rateLimiter.resetAttempts(`contact_${sanitizedData.email}`);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '', website: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 1000) {
      setFormData(prev => ({
        ...prev,
        [e.target.name]: value
      }));
    }
  };

  return (
    <section className="py-8 sm:py-16 md:py-20 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 lg:w-[600px] lg:h-[600px] bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 lg:w-[600px] lg:h-[600px] bg-gradient-to-tr from-blue-500/10 to-emerald-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            Get In Touch
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            Contact Us
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
            Ready to transform your online presence? Get in touch and let's discuss your project.
          </p>
        </div>

        <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-800/50 overflow-hidden">
          <div className="grid md:grid-cols-5 gap-0">
            <div className="md:col-span-2 bg-gradient-to-br from-slate-800 to-slate-900 p-8 sm:p-8 md:p-10 text-white md:border-r border-slate-700/50">
              <h3 className="text-2xl sm:text-2xl font-bold mb-6 sm:mb-8">Contact Info</h3>

              <div className="space-y-6 sm:space-y-8">
                <div className="group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                      <Mail className="w-5 h-5 text-emerald-400" />
                    </div>
                    <span className="font-semibold text-lg">Email</span>
                  </div>
                  <a href="mailto:contact@metronexa.com" className="text-slate-400 hover:text-emerald-400 transition-colors ml-13 block">
                    contact@metronexa.com
                  </a>
                </div>

                <div className="group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                      <Instagram className="w-5 h-5 text-cyan-400" />
                    </div>
                    <span className="font-semibold text-lg">Instagram</span>
                  </div>
                  <a href="https://instagram.com/metronexaweb" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors ml-13 block">
                    @metronexaweb
                  </a>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-slate-700/50">
                <div className="flex items-center gap-2 text-emerald-400 mb-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="font-semibold text-sm">Quick Response</span>
                </div>
                <p className="text-slate-400 text-sm">
                  We typically respond within 24 hours.
                </p>
              </div>
            </div>

            <div className="md:col-span-3 p-8 sm:p-8 md:p-10 bg-gradient-to-br from-slate-850/50 to-slate-900/50">
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-500"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-500"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-white mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-500"
                    placeholder="+1 (234) 567-890"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-white mb-2">
                    Tell Us About Your Project
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none placeholder:text-slate-500"
                    placeholder="I need help with..."
                  />
                </div>

                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  autoComplete="off"
                  tabIndex={-1}
                  style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px' }}
                  aria-hidden="true"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 sm:px-8 sm:py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 text-base sm:text-base touch-manipulation"
                >
                  {isSubmitting ? 'Sending...' : submitted ? 'Message Sent!' : 'Send Message'}
                  <Send className="w-5 h-5 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                {submitted && (
                  <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-xl text-center font-semibold">
                    Thanks! We'll be in touch soon.
                  </div>
                )}

                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-center font-semibold">
                    {error}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
