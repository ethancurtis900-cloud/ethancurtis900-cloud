import { Footer } from '../components/Footer';
import { Star, Quote, User } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    business: 'Bloom Boutique',
    location: 'Baltimore, MD',
    text: 'MetroNexa transformed my flower shop from struggling to thriving. Within 3 months of launching our new website, our online orders tripled. They made the whole process simple and the results speak for themselves.',
    rating: 5
  },
  {
    name: 'Marcus Thompson',
    business: 'Thompson\'s Auto Repair',
    location: 'Silver Spring, MD',
    text: 'I was skeptical about needing a website, but MetroNexa showed me how much business I was missing. Now customers book appointments online 24/7. It\'s like having an extra employee who never sleeps.',
    rating: 5
  },
  {
    name: 'Jennifer Lee',
    business: 'Zen Yoga Studio',
    location: 'Annapolis, MD',
    text: 'The team at MetroNexa really understood my vision. They created a beautiful site that captures the peaceful essence of my studio. Class bookings have increased by over 60% since launch.',
    rating: 5
  },
  {
    name: 'David Rodriguez',
    business: 'Rodriguez Landscaping',
    location: 'Frederick, MD',
    text: 'Best investment I\'ve made in my business. The website pays for itself every month with new leads. MetroNexa made me look as professional as the big companies, and my phone hasn\'t stopped ringing.',
    rating: 5
  },
  {
    name: 'Emily Chen',
    business: 'Sweet Cravings Bakery',
    location: 'Rockville, MD',
    text: 'I can finally accept online orders for custom cakes! The e-commerce integration works flawlessly. MetroNexa was patient with all my questions and delivered exactly what I needed.',
    rating: 5
  },
  {
    name: 'Robert Williams',
    business: 'Williams Plumbing Services',
    location: 'Columbia, MD',
    text: 'I wish I had done this sooner. The website brings in consistent leads every week. The analytics dashboard shows me exactly where customers are coming from. It\'s been a game-changer for my business.',
    rating: 5
  }
];

export function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
              Success Stories
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              <span className="text-gray-900">Real Results from </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">
                Real Businesses
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Don't just take our word for it. Hear from small business owners who trusted us to build their online presence and are now reaping the rewards.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 border border-gray-200 hover:border-emerald-400 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-emerald-600 font-semibold">{testimonial.business}</p>
                    <p className="text-xs text-gray-500">{testimonial.location}</p>
                  </div>
                </div>

                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-emerald-500 text-emerald-500" />
                  ))}
                </div>

                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 text-emerald-500/20" />
                  <p className="text-gray-600 leading-relaxed pl-6">
                    {testimonial.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 border border-emerald-200 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Write Your Success Story?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join these thriving businesses and start attracting more customers online. Your story could be next.
            </p>
            <a
              href="/products"
              className="inline-flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
            >
              Get Started Today
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
