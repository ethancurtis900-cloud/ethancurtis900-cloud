import { TrendingUp, Globe, Shield, Clock, Users, DollarSign } from 'lucide-react';

const benefits = [
  {
    icon: Globe,
    stat: '24/7',
    label: 'Always Open',
    description: 'Your site works while you sleep. Our clients capture leads at 2am, on weekends, and during holidays.'
  },
  {
    icon: TrendingUp,
    stat: '3.2x',
    label: 'Average ROI',
    description: 'Clients see 3.2x return on investment within 90 days. Some recover their website cost in the first month.'
  },
  {
    icon: Users,
    stat: '81%',
    label: 'Search Before Buying',
    description: '81% of shoppers research online before purchasing. If you are not online, you are invisible to them.'
  },
  {
    icon: Shield,
    stat: '75%',
    label: 'Judge by Website',
    description: '75% of consumers judge business credibility by their website. No site or a bad site costs you sales.'
  },
  {
    icon: Clock,
    stat: '4-6hrs',
    label: 'Time Saved Weekly',
    description: 'Automated forms and FAQs save 4-6 hours per week answering the same questions manually.'
  },
  {
    icon: DollarSign,
    stat: '$2.87',
    label: 'Per $1 Spent',
    description: 'Digital marketing returns $2.87 for every dollar spent—higher than traditional advertising.'
  }
];

export function Benefits() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-metro-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(45deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px), linear-gradient(-45deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px)',
          backgroundSize: '100px 100px'
        }}></div>
      </div>

      <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent-600 rounded-full blur-3xl opacity-5"></div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 sm:px-4 sm:py-2 bg-accent-600/20 text-accent-300 rounded-full text-xs font-space-mono font-bold tracking-widest uppercase mb-4 sm:mb-3">
            Proven Results
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-900 text-white mb-5 sm:mb-4 md:mb-6 font-inter">
            What Your Site Will Do
          </h2>
          <p className="text-lg sm:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed px-4">
            These aren't promises. These are the measurable outcomes our clients experience.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-metro-800 to-metro-900 rounded-lg p-6 sm:p-8 border border-metro-700 hover:border-accent-600 transition-all duration-300 hover:shadow-xl hover:shadow-accent-600/20"
            >
              <div className="w-12 h-12 sm:w-12 sm:h-12 bg-gradient-to-br from-accent-600 to-accent-700 rounded-lg flex items-center justify-center flex-shrink-0 mb-4 sm:mb-4 group-hover:scale-110 transition-transform">
                <benefit.icon className="w-6 h-6 sm:w-6 sm:h-6 text-white" />
              </div>

              <div className="text-4xl sm:text-4xl font-black text-accent-400 mb-2 font-inter">
                {benefit.stat}
              </div>
              <div className="text-lg sm:text-lg font-bold text-white mb-3 sm:mb-3 font-inter">
                {benefit.label}
              </div>
              <p className="text-slate-300 leading-relaxed text-base sm:text-base">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
