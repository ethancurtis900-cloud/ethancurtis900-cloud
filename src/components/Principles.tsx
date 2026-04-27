const principles = [
  {
    title: 'We Care About Your Dream',
    description: 'Your business is more than a job—it\'s your livelihood, your legacy. We treat every project like it\'s our own, because we understand what\'s at stake for you and your family.'
  },
  {
    title: 'True Partnership, No Jargon',
    description: 'We speak your language, not tech-speak. You get a partner who listens, explains clearly, and works alongside you every step of the way—no confusion, no surprises.'
  },
  {
    title: 'Built to Help You Grow',
    description: 'Every small business starts somewhere. We design websites that scale with you—from your first customer to your hundredth, we\'re here to support your journey.'
  },
  {
    title: 'Your Success Is Our Reputation',
    description: 'When you win, we win. We stake our reputation on delivering results that matter—more customers, more revenue, and more peace of mind for you.'
  }
];

export function Principles() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gray-50 relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 sm:px-4 sm:py-2 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold tracking-widest uppercase mb-4 sm:mb-3">
            What Drives Us
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-5 sm:mb-4 md:mb-6">
            Why We Do This
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Small businesses are the backbone of our communities. We're here to give you the same advantages big companies have—without the big company price tag.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {principles.map((principle, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 sm:p-8 border border-gray-200 hover:border-emerald-400 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                {principle.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
