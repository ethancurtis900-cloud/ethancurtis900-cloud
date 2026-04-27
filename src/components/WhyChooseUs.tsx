const reasons = [
  {
    title: 'We Only Do Local Services',
    description: 'Not e-commerce. Not SaaS. Just local service businesses—plumbers, HVAC, landscapers, contractors. We know your industry inside and out.'
  },
  {
    title: '7-Day Launch vs 8-Week Wait',
    description: 'Traditional agencies take 6-8 weeks. We launch in 7 days. Every week without a site costs you leads to competitors who are already online.'
  },
  {
    title: '$150-$500 vs $5,000+',
    description: 'Local service websites starting at $150. Same quality as $5K-$15K agency sites. No bloat, no overhead—just results.'
  },
  {
    title: 'Real Results from Real Businesses',
    description: 'One HVAC company got 47 leads in the first month. A plumber added $12K/month in new revenue. A landscaper booked out 3 months ahead.'
  }
];

export function WhyChooseUs() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 sm:px-4 sm:py-2 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold tracking-widest uppercase mb-4 sm:mb-3">
            The MetroNexa Difference
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-5 sm:mb-4 md:mb-6">
            Why Choose MetroNexa?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Real numbers. Real results. No fluff.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 sm:p-8 border border-gray-200 hover:border-emerald-400 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                {reason.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
