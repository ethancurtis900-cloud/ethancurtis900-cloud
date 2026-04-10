import { Heart, Handshake, TrendingUp, Shield } from 'lucide-react';

const principles = [
  {
    icon: Heart,
    title: 'We Care About Your Dream',
    description: 'Your business is more than a job—it\'s your livelihood, your legacy. We treat every project like it\'s our own, because we understand what\'s at stake for you and your family.'
  },
  {
    icon: Handshake,
    title: 'True Partnership, No Jargon',
    description: 'We speak your language, not tech-speak. You get a partner who listens, explains clearly, and works alongside you every step of the way—no confusion, no surprises.'
  },
  {
    icon: TrendingUp,
    title: 'Built to Help You Grow',
    description: 'Every small business starts somewhere. We design websites that scale with you—from your first customer to your hundredth, we\'re here to support your journey.'
  },
  {
    icon: Shield,
    title: 'Your Success Is Our Reputation',
    description: 'When you win, we win. We stake our reputation on delivering results that matter—more customers, more revenue, and more peace of mind for you.'
  }
];

export function Principles() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-metro-950 to-metro-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(16, 185, 129, 0.3) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 sm:px-4 sm:py-2 bg-emerald-600/20 text-emerald-300 rounded-full text-xs font-space-mono font-bold tracking-widest uppercase mb-4 sm:mb-3">
            What Drives Us
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-900 text-white mb-5 sm:mb-4 md:mb-6 font-inter">
            Why We Do This
          </h2>
          <p className="text-lg sm:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed px-4">
            Small businesses are the backbone of our communities. We're here to give you the same advantages big companies have—without the big company price tag.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {principles.map((principle, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-metro-800/50 to-metro-900/50 backdrop-blur-sm rounded-lg p-6 sm:p-8 border border-metro-700/50 hover:border-emerald-600/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-600/10"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <principle.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 font-inter">
                    {principle.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed text-base sm:text-lg">
                    {principle.description}
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
