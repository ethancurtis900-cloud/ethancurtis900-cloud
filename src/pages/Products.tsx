import { stripeProducts } from '../stripe-config'
import { ProductCard } from '../components/ProductCard'
import { Globe, Smartphone, Search } from 'lucide-react'
import { Footer } from '../components/Footer'

export function Products() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10 pt-24 py-16 sm:py-24 md:py-32 px-4">

        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-emerald-100 text-emerald-700 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
            Our Packages
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 tracking-tight">
            <span className="text-gray-900">Web Development</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500">Packages</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-12 sm:mb-16 max-w-3xl mx-auto">
            Professional web development services to launch your business online
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto mb-12 sm:mb-16">
            <div className="flex flex-col items-center space-y-4 group">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform border border-emerald-200">
                <Globe className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Modern Design</h3>
              <p className="text-gray-600 text-sm">Fully responsive websites tailored to your brand</p>
            </div>
            <div className="flex flex-col items-center space-y-4 group">
              <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform border border-cyan-200">
                <Smartphone className="h-8 w-8 text-cyan-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Mobile Optimized</h3>
              <p className="text-gray-600 text-sm">Perfect viewing experience on all devices</p>
            </div>
            <div className="flex flex-col items-center space-y-4 group">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform border border-blue-200">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">SEO Ready</h3>
              <p className="text-gray-600 text-sm">Basic SEO setup to help you get found online</p>
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
