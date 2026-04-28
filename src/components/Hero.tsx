import { GetStartedButton } from './GetStartedButton';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <section className="relative bg-white text-gray-900 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-50 via-white to-slate-50"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 pt-20 pb-16 sm:pt-24 sm:pb-20 md:pt-28 md:pb-24 text-center">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[5.5rem] font-bold leading-[1.05] tracking-tight mb-6 sm:mb-8">
          Websites for Local Service Businesses
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-gray-500 mb-10 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
          We help local businesses generate more leads with high-converting websites. Not just pretty designs—real results that grow your revenue.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <GetStartedButton variant="primary" className="text-base sm:text-lg px-10 py-4 touch-manipulation">
            Get Your Website
          </GetStartedButton>

          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border border-gray-300 hover:border-gray-400 text-gray-800 px-10 py-4 rounded-xl font-semibold transition-all text-base sm:text-lg touch-manipulation shadow-sm"
          >
            See Pricing
          </Link>
        </div>

        <div className="flex items-center justify-center gap-6 sm:gap-10 text-sm sm:text-base text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="font-medium">7-Day Delivery</span>
          </div>
          <div className="font-medium">From $150</div>
          <div className="font-medium">25+ Local Businesses Launched</div>
        </div>
      </div>
    </section>
  );
}
