import { AlertTriangle, TrendingDown, UserX, Clock, ShieldOff, Target, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const painPoints = [
  {
    icon: UserX,
    title: 'Invisible to Customers',
    description: 'Most consumers research online before buying. Without a website, you\'re completely off the radar when potential customers are actively searching for your services.',
    impact: 'Lost Sales'
  },
  {
    icon: TrendingDown,
    title: 'Competitors Win 24/7',
    description: 'While you\'re offline, competitors with websites capture sales around the clock. Every hour of delay costs you revenue.',
    impact: 'Market Share'
  },
  {
    icon: ShieldOff,
    title: 'Zero Credibility',
    description: 'Consumers judge business legitimacy by online presence. No site means no trust. Customers assume you\'re not a serious business.',
    impact: 'Trust Gap'
  },
  {
    icon: Target,
    title: 'No Brand Control',
    description: 'Relying on social media? Algorithm changes kill your reach instantly. You own nothing. A website is yours forever.',
    impact: 'Vulnerability'
  },
  {
    icon: Clock,
    title: 'Stuck in Business Hours',
    description: 'You close at 5pm. Your website never does. Leads pour in 24/7 with the right site. You\'re leaving money on the table.',
    impact: 'Lost Leads'
  },
  {
    icon: AlertTriangle,
    title: 'Getting Lapped',
    description: 'Every day you wait, competitors pull further ahead. The gap only widens. Act now or fade into obscurity.',
    impact: 'Irrelevance'
  }
];

export function PainPoints() {
  return (
    <section className="py-8 sm:py-16 md:py-20 bg-metro-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(45deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px), linear-gradient(-45deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px)',
          backgroundSize: '100px 100px'
        }}></div>
      </div>

      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600 rounded-full blur-3xl opacity-5"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-red-500/20 text-red-300 rounded-full text-xs font-space-mono font-bold tracking-widest uppercase mb-3 sm:mb-3">
            Reality Check
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-900 text-white mb-4 sm:mb-4 md:mb-6 font-inter">
            What You're Losing
          </h2>
          <p className="text-base sm:text-lg text-metro-300 max-w-3xl mx-auto font-light leading-relaxed">
            Every single day without a website is revenue disappearing to your competitors. This isn't just about missing opportunities—it's about going extinct online.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8 md:mb-10">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-metro-800 to-metro-900 rounded-lg p-5 sm:p-6 border border-metro-700 hover:border-accent-600 transition-all duration-300 hover:shadow-xl hover:shadow-accent-600/20"
            >
              <div className="absolute top-0 right-0 px-3 py-1 bg-red-500/80 text-white text-xs font-bold font-space-mono rounded-bl-lg rounded-tr-lg">
                {point.impact}
              </div>

              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <point.icon className="w-6 h-6 text-white" />
              </div>

              <h3 className="text-lg font-bold text-white mb-2 font-inter">
                {point.title}
              </h3>

              <p className="text-metro-400 leading-relaxed text-sm">
                {point.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-red-600/20 via-red-600/10 to-transparent rounded-lg p-6 sm:p-8 md:p-12 border border-red-600/30 backdrop-blur-sm">
          <div className="max-w-3xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4 font-inter">
              The Clock is Ticking
            </h3>
            <p className="text-metro-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              Stop thinking about it. Start building it. We turn your website into a revenue-generating machine. Your competitors are already online. The question is: are you ready to fight back?
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-accent-600 hover:bg-accent-700 text-white px-8 py-4 sm:px-8 sm:py-4 rounded-md font-semibold transition-all transform hover:translate-x-1 font-inter text-base sm:text-base touch-manipulation"
            >
              Launch Now, Compete Today
              <ArrowRight className="w-5 h-5 sm:w-5 sm:h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
