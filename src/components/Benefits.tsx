const benefits = [
  {
    stat: '24/7',
    label: 'Always Open',
    description: 'Your site works while you sleep. Our clients capture leads at 2am, on weekends, and during holidays.'
  },
  {
    stat: '3.2x',
    label: 'Average ROI',
    description: 'Clients see 3.2x return on investment within 90 days. Some recover their website cost in the first month.'
  },
  {
    stat: '81%',
    label: 'Search Before Buying',
    description: '81% of shoppers research online before purchasing. If you are not online, you are invisible to them.'
  },
  {
    stat: '75%',
    label: 'Judge by Website',
    description: '75% of consumers judge business credibility by their website. No site or a bad site costs you sales.'
  },
  {
    stat: '4-6hrs',
    label: 'Time Saved Weekly',
    description: 'Automated forms and FAQs save 4-6 hours per week answering the same questions manually.'
  },
  {
    stat: '$2.87',
    label: 'Per $1 Spent',
    description: 'Digital marketing returns $2.87 for every dollar spent—higher than traditional advertising.'
  }
];

export function Benefits() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gray-50 relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 sm:px-4 sm:py-2 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold tracking-widest uppercase mb-4 sm:mb-3">
            Proven Results
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-5 sm:mb-4 md:mb-6">
            What Your Site Will Do
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            These aren't promises. These are the measurable outcomes our clients experience.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 sm:p-8 border border-gray-200 hover:border-emerald-400 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10"
            >
              <div className="text-4xl sm:text-4xl font-black text-emerald-600 mb-2">
                {benefit.stat}
              </div>
              <div className="text-lg sm:text-lg font-bold text-gray-900 mb-3 sm:mb-3">
                {benefit.label}
              </div>
              <p className="text-gray-600 leading-relaxed text-base sm:text-base">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
