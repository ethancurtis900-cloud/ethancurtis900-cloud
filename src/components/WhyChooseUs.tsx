import { Zap, DollarSign, MessageSquare, Target } from 'lucide-react';

const reasons = [
  {
    icon: Target,
    title: 'We Only Do Local Services',
    description: 'Not e-commerce. Not SaaS. Just local service businesses—plumbers, HVAC, landscapers, contractors. We know your industry inside and out.'
  },
  {
    icon: Zap,
    title: '7-Day Launch vs 8-Week Wait',
    description: 'Traditional agencies take 6-8 weeks. We launch in 7 days. Every week without a site costs you leads to competitors who are already online.'
  },
  {
    icon: DollarSign,
    title: '$150-$500 vs $5,000+',
    description: 'Local service websites starting at $150. Same quality as $5K-$15K agency sites. No bloat, no overhead—just results.'
  },
  {
    icon: MessageSquare,
    title: 'Real Results from Real Businesses',
    description: 'One HVAC company got 47 leads in the first month. A plumber added $12K/month in new revenue. A landscaper booked out 3 months ahead.'
  }
];

export function WhyChooseUs() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(45deg, rgba(16, 185, 129, 0.05) 1px, transparent 1px), linear-gradient(-45deg, rgba(16, 185, 129, 0.05) 1px, transparent 1px)',
          backgroundSize: '100px 100px'
        }}></div>
      </div>

      <div className="absolute top-1/2 right-0 w-96 h-96 bg-emerald-600 rounded-full blur-3xl opacity-5"></div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 sm:px-4 sm:py-2 bg-emerald-600/20 text-emerald-300 rounded-full text-xs font-space-mono font-bold tracking-widest uppercase mb-4 sm:mb-3">
            The MetroNexa Difference
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-900 text-white mb-5 sm:mb-4 md:mb-6 font-inter">
            Why Choose MetroNexa?
          </h2>
          <p className="text-lg sm:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed px-4">
            Real numbers. Real results. No fluff.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-lg p-6 sm:p-8 border border-slate-700/50 hover:border-emerald-600/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-600/10"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <reason.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 font-inter">
                    {reason.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed text-base sm:text-lg">
                    {reason.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
