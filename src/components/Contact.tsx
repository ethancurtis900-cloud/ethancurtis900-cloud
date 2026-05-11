import { Mail, Instagram, Send, CheckCircle, Clock } from 'lucide-react';
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
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatPhone = (raw: string) => {
    const digits = raw.replace(/\D/g, '').slice(0, 11);
    if (digits.length === 0) return '';
    if (digits.length <= 1) return `+${digits}`;
    if (digits.length <= 4) return `+${digits[0]} (${digits.slice(1)}`;
    if (digits.length <= 7) return `+${digits[0]} (${digits.slice(1, 4)}) ${digits.slice(4)}`;
    return `+${digits[0]} (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      setFormData(prev => ({ ...prev, phone: formatPhone(value) }));
      return;
    }
    if (value.length <= 1000) {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  if (submitted) {
    return (
      <section className="py-8 sm:py-16 md:py-20 bg-white relative overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 lg:w-[600px] lg:h-[600px] bg-emerald-50 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 lg:w-[600px] lg:h-[600px] bg-cyan-50 rounded-full blur-3xl opacity-60"></div>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-10 sm:p-14">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-emerald-600" strokeWidth={1.5} />
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Thank You!</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Your message has been received. We appreciate you reaching out to MetroNexa and will get back to you as soon as possible.
            </p>
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-5 py-3 rounded-full font-semibold text-sm mb-8">
              <Clock className="w-4 h-4" />
              We respond within 24 hours
            </div>
            <div className="pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-500 mb-4">In the meantime, feel free to reach us directly at</p>
              <a href="mailto:contact@metronexa.com" className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors">
                contact@metronexa.com
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 sm:py-16 md:py-20 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 lg:w-[600px] lg:h-[600px] bg-emerald-50 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 lg:w-[600px] lg:h-[600px] bg-cyan-50 rounded-full blur-3xl opacity-60"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-emerald-100 text-emerald-700 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            Get In Touch
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Contact Us
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to transform your online presence? Get in touch and let's discuss your project.
          </p>
        </div>

        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="grid md:grid-cols-5 gap-0">
            <div className="md:col-span-2 bg-gray-50 p-8 sm:p-8 md:p-10 text-gray-900 md:border-r border-gray-200">
              <h3 className="text-2xl sm:text-2xl font-bold mb-6 sm:mb-8 text-gray-900">Contact Info</h3>

              <div className="space-y-6 sm:space-y-8">
                <div className="group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                      <Mail className="w-5 h-5 text-emerald-600" />
                    </div>
                    <span className="font-semibold text-lg text-gray-900">Email</span>
                  </div>
                  <a href="mailto:contact@metronexa.com" className="text-gray-500 hover:text-emerald-600 transition-colors ml-13 block">
                    contact@metronexa.com
                  </a>
                </div>

                <div className="group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center group-hover:bg-cyan-200 transition-colors">
                      <Instagram className="w-5 h-5 text-cyan-600" />
                    </div>
                    <span className="font-semibold text-lg text-gray-900">Instagram</span>
                  </div>
                  <a href="https://instagram.com/metronexaweb" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cyan-600 transition-colors ml-13 block">
                    @metronexaweb
                  </a>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center gap-2 text-emerald-600 mb-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="font-semibold text-sm">Quick Response</span>
                </div>
                <p className="text-gray-500 text-sm">
                  We typically respond within 24 hours.
                </p>
              </div>
            </div>

            <div className="md:col-span-3 p-8 sm:p-8 md:p-10 bg-white">
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-800 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder:text-gray-400"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder:text-gray-400"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-800 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder:text-gray-400"
                    placeholder="+1 (234) 567-890"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-800 mb-2">
                    Tell Us About Your Project
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none placeholder:text-gray-400"
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
                  className="group w-full bg-gray-900 hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 sm:px-8 sm:py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-black/20 hover:scale-105 text-base sm:text-base touch-manipulation"
                >
                  {isSubmitting ? 'Sending...' : submitted ? 'Message Sent!' : 'Send Message'}
                  <Send className="w-5 h-5 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-center font-semibold">
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
