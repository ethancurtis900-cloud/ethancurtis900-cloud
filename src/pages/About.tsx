import { Footer } from '../components/Footer';
import { Target, Users, Zap, Award, Heart, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export function About() {
  return (
    <div className="min-h-screen bg-white">
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-gray-900">About </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">
                MetroNexa
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We build websites exclusively for local service businesses. 25+ plumbers, HVAC companies, landscapers, and contractors launched in 2025.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  We started in 2025 with one mission: help local service businesses dominate their markets online. Not e-commerce. Not SaaS. Just plumbers, HVAC techs, landscapers, and contractors who need real leads, not vanity metrics.
                </p>
                <p>
                  Why local services? Because we saw too many skilled tradespeople losing jobs to competitors with better websites. A master plumber with 20 years experience losing to a rookie with a $5K agency site. That's wrong.
                </p>
                <p>
                  So we built a service specifically for local businesses. Affordable pricing. Fast turnaround. Features that actually generate leads—not bloat. In 2025 alone, we launched 25+ local service businesses and helped them generate over $200K in new revenue.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-emerald-50 to-cyan-50 border border-emerald-200 p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full mb-6 shadow-2xl shadow-emerald-500/30">
                    <Heart className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Built with Passion</h3>
                  <p className="text-gray-600">Every project is a labor of love</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:border-emerald-400 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/25">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Specialist Focus</h3>
                <p className="text-gray-600 leading-relaxed">
                  We only build for local service businesses. This laser focus means we know exactly what works for plumbers, HVAC companies, landscapers, and contractors.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:border-emerald-400 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/25">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Real Results</h3>
                <p className="text-gray-600 leading-relaxed">
                  We measure success in leads, bookings, and revenue—not page views. One HVAC client jumped from 3 to 17 leads per week. That's what matters.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:border-emerald-400 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/25">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Speed to Market</h3>
                <p className="text-gray-600 leading-relaxed">
                  7-day turnaround while agencies take 8 weeks. Every day without a site costs you leads. We get you online fast so you start competing immediately.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 border border-emerald-200 rounded-3xl p-12 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="grid grid-cols-3 gap-8 mb-12">
                <div>
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500 mb-2">
                    25+
                  </div>
                  <div className="text-gray-600 font-medium">Local Businesses Launched</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500 mb-2">
                    3.2x
                  </div>
                  <div className="text-gray-600 font-medium">Average ROI (90 days)</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500 mb-2">
                    7-Day
                  </div>
                  <div className="text-gray-600 font-medium">Average Delivery</div>
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Let's build a website that brings customers to your local service business. Starting at $150, delivered in 7 days.
              </p>
              <Link
                to="/get-started"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-105"
              >
                Start Your Project
                <TrendingUp className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
