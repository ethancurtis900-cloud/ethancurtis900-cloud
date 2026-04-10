import { Quote } from 'lucide-react';

const quotes = [
  {
    quote: 'The secret of getting ahead is getting started.',
    author: 'Mark Twain',
  },
  {
    quote: 'Your website is the center of your digital ecosystem.',
    author: 'Leland Dieno',
  },
  {
    quote: 'Good design is good business.',
    author: 'Thomas Watson Jr.',
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-8 sm:py-16 md:py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500 rounded-full blur-3xl opacity-5"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 md:mb-6">
            Words to Inspire Growth
          </h2>
          <p className="text-lg sm:text-xl md:text-xl text-slate-200 max-w-2xl mx-auto">
            Every great journey starts with a single step. Let's take that step together.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {quotes.map((item, index) => (
            <div
              key={index}
              className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 relative"
            >
              <div className="absolute top-8 right-8 text-emerald-400 opacity-20">
                <Quote className="w-12 h-12" />
              </div>

              <p className="text-slate-200 leading-relaxed mb-6 relative z-10 text-lg font-medium">
                "{item.quote}"
              </p>

              <div className="border-t border-slate-800 pt-4">
                <p className="font-bold text-white">{item.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
