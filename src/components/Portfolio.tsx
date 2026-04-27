const principles = [
  {
    title: 'Innovation First',
    description: 'We believe in pushing boundaries and creating solutions that stand out in today\'s digital landscape.',
  },
  {
    title: 'Goal-Driven',
    description: 'Every project starts with your vision. We turn your business goals into measurable digital outcomes.',
  },
  {
    title: 'Launch & Scale',
    description: 'Built for growth from day one. Your website should evolve as your business reaches new heights.',
  },
  {
    title: 'Speed Matters',
    description: 'In the digital world, speed is everything. We deliver fast, responsive experiences that convert.',
  },
];

export function Portfolio() {
  return (
    <section id="vision" className="py-8 sm:py-16 md:py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Our Guiding Principles
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Built on a foundation of excellence, innovation, and unwavering commitment to your success.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {principles.map((principle, index) => (
            <div
              key={index}
              className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 hover:border-emerald-400 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 p-6 sm:p-8"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
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
