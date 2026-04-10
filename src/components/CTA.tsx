export function CTA() {
  return (
    <section className="relative bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 text-white overflow-hidden py-8 sm:py-16 md:py-20">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-10"></div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-5 md:mb-6">
          Ready to Grow Your Business?
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-2xl text-slate-100 mb-8 sm:mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed">
          Let's build a website that turns visitors into customers and drives real results for your business.
        </p>
      </div>
    </section>
  );
}
