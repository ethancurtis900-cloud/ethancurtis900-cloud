import { Navbar } from '../components/Navbar';
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
    <div className="min-h-screen bg-gradient-to-b from-metro-950 via-metro-900 to-metro-950">
      <Navbar />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-accent-600/20 text-accent-300 rounded-full text-xs font-space-mono font-bold tracking-widest uppercase mb-4">
              Success Stories
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">Real Results from </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                Real Businesses
              </span>
            </h1>
            <p className="text-xl text-metro-300 max-w-3xl mx-auto leading-relaxed">
              Don't just take our word for it. Hear from small business owners who trusted us to build their online presence and are now reaping the rewards.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-metro-800 to-metro-900 rounded-xl p-8 border border-metro-700 hover:border-accent-600 transition-all duration-300 hover:shadow-xl hover:shadow-accent-600/20"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-600 to-accent-700 flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{testimonial.name}</h3>
                    <p className="text-sm text-accent-400 font-semibold">{testimonial.business}</p>
                    <p className="text-xs text-metro-400">{testimonial.location}</p>
                  </div>
                </div>

                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent-400 text-accent-400" />
                  ))}
                </div>

                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 text-accent-600/20" />
                  <p className="text-metro-300 leading-relaxed pl-6">
                    {testimonial.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-accent-600/20 to-accent-600/10 border border-accent-600/30 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Write Your Success Story?</h2>
            <p className="text-metro-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join these thriving businesses and start attracting more customers online. Your story could be next.
            </p>
            <a
              href="/products"
              className="inline-flex items-center gap-2 bg-accent-600 hover:bg-accent-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
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
