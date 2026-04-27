import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const painPoints = [
  {
    title: 'Invisible to Customers',
    description: 'Most consumers research online before buying. Without a website, you\'re completely off the radar when potential customers are actively searching for your services.',
    impact: 'Lost Sales'
  },
  {
    title: 'Competitors Win 24/7',
    description: 'While you\'re offline, competitors with websites capture sales around the clock. Every hour of delay costs you revenue.',
    impact: 'Market Share'
  },
  {
    title: 'Zero Credibility',
    description: 'Consumers judge business legitimacy by online presence. No site means no trust. Customers assume you\'re not a serious business.',
    impact: 'Trust Gap'
  },
  {
    title: 'No Brand Control',
    description: 'Relying on social media? Algorithm changes kill your reach instantly. You own nothing. A website is yours forever.',
    impact: 'Vulnerability'
  },
  {
    title: 'Stuck in Business Hours',
    description: 'You close at 5pm. Your website never does. Leads pour in 24/7 with the right site. You\'re leaving money on the table.',
    impact: 'Lost Leads'
  },
  {
    title: 'Getting Lapped',
    description: 'Every day you wait, competitors pull further ahead. The gap only widens. Act now or fade into obscurity.',
    impact: 'Irrelevance'
  }
];

export function PainPoints() {
  return (
    <section className="py-8 sm:py-16 md:py-20 bg-white relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-red-100 text-red-700 rounded-full text-xs font-bold tracking-widest uppercase mb-3 sm:mb-3">
            Reality Check
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-4 md:mb-6">
            What You're Losing
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Every single day without a website is revenue disappearing to your competitors. This isn't just about missing opportunities—it's about going extinct online.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8 md:mb-10">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className="relative bg-white rounded-lg p-5 sm:p-6 border border-gray-200 hover:border-emerald-400 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10"
            >
              <div className="absolute top-0 right-0 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-bl-lg rounded-tr-lg">
                {point.impact}
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2 pr-16">
                {point.title}
              </h3>

              <p className="text-gray-600 leading-relaxed text-sm">
                {point.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-red-50 rounded-lg p-6 sm:p-8 md:p-12 border border-red-200">
          <div className="max-w-3xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              The Clock is Ticking
            </h3>
            <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              Stop thinking about it. Start building it. We turn your website into a revenue-generating machine. Your competitors are already online. The question is: are you ready to fight back?
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-md font-semibold transition-all transform hover:translate-x-1 text-base touch-manipulation"
            >
              Launch Now, Compete Today
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
