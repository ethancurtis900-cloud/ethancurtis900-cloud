import { Palette, ShoppingCart, Zap, Smartphone, Search, BarChart3, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: Search,
    title: 'Local SEO Domination',
    description: 'Rank on Google when customers search "plumber near me" or "HVAC repair [your city]". We optimize for local searches that drive actual phone calls.',
    features: ['Google Business Profile', 'Local Keywords', 'Map Rankings']
  },
  {
    icon: Smartphone,
    title: 'Mobile-First Design',
    description: '70% of local searches happen on mobile. Your site works perfectly on every phone, tablet, and device—because that\'s how customers find you.',
    features: ['Tap-to-Call Buttons', 'Easy Navigation', 'Fast Loading']
  },
  {
    icon: Palette,
    title: 'Service-Focused Pages',
    description: 'Dedicated pages for each service you offer. Plumbing repairs, AC installation, landscaping—each service gets its own optimized page to rank in search.',
    features: ['Service Breakdowns', 'Clear Pricing', 'Before/After Photos']
  },
  {
    icon: BarChart3,
    title: 'Lead Tracking',
    description: 'Know exactly where your customers come from. Track phone calls, form submissions, and conversions so you see your ROI in real numbers.',
    features: ['Call Tracking', 'Form Analytics', 'Conversion Reports']
  },
  {
    icon: Zap,
    title: 'Instant Quote Forms',
    description: 'Capture leads 24/7 with simple quote request forms. Customers fill out their info, you get notified instantly—even at 2am on Sunday.',
    features: ['Auto Notifications', 'Email Integration', 'Calendar Booking']
  },
  {
    icon: ShoppingCart,
    title: 'Online Booking',
    description: 'Let customers book appointments directly from your website. No phone tag, no missed calls—just booked jobs while you sleep.',
    features: ['Calendar Sync', 'Payment Collection', 'Automated Reminders']
  }
];

export function Services() {
  return (
    <section id="services" className="py-12 sm:py-16 md:py-20 bg-white relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-10 md:mb-12">
          <span className="inline-block px-4 py-1.5 sm:px-3 sm:py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold tracking-widest uppercase mb-3 sm:mb-2">
            Services
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-3 md:mb-4">
            Built for Service Businesses
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Every feature designed to generate more local leads and turn website visitors into paying customers for your service business.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-lg p-6 sm:p-6 border border-gray-200 hover:border-emerald-400 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1"
            >
              <div className="w-12 h-12 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center mb-5 sm:mb-5 group-hover:scale-110 transition-transform">
                <service.icon className="w-6 h-6 sm:w-6 sm:h-6 text-white" />
              </div>

              <h3 className="text-xl sm:text-xl font-bold text-gray-900 mb-3 sm:mb-3">
                {service.title}
              </h3>

              <p className="text-gray-600 leading-relaxed mb-5 sm:mb-5 text-base sm:text-base">
                {service.description}
              </p>

              <div className="space-y-2.5 sm:space-y-2">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm sm:text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
