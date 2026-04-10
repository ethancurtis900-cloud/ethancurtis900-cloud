import { stripeProducts } from '../stripe-config'
import { ProductCard } from '../components/ProductCard'
import { Globe, Smartphone, Search } from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

export function Products() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      <Navbar />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(16, 185, 129, 0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 lg:w-[600px] lg:h-[600px] bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 lg:w-[600px] lg:h-[600px] bg-gradient-to-tr from-blue-500/20 to-emerald-500/20 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto relative z-10 pt-24 py-16 sm:py-24 md:py-32 px-4">

        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
            Our Packages
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 tracking-tight">
            <span className="text-white">Web Development</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400">Packages</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-400 mb-12 sm:mb-16 max-w-3xl mx-auto">
            Professional web development services to launch your business online
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto mb-12 sm:mb-16">
            <div className="flex flex-col items-center space-y-4 group">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform border border-emerald-500/20">
                <Globe className="h-8 w-8 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Modern Design</h3>
              <p className="text-slate-400 text-sm">Fully responsive websites tailored to your brand</p>
            </div>
            <div className="flex flex-col items-center space-y-4 group">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform border border-cyan-500/20">
                <Smartphone className="h-8 w-8 text-cyan-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Mobile Optimized</h3>
              <p className="text-slate-400 text-sm">Perfect viewing experience on all devices</p>
            </div>
            <div className="flex flex-col items-center space-y-4 group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform border border-blue-500/20">
                <Search className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-white">SEO Ready</h3>
              <p className="text-slate-400 text-sm">Basic SEO setup to help you get found online</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl w-full">
            {stripeProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
