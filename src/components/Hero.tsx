import { GetStartedButton } from './GetStartedButton';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <section className="relative bg-white text-gray-900 overflow-hidden min-h-[70vh] sm:min-h-[80vh] md:min-h-screen flex items-center pt-16 sm:pt-20">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(16, 185, 129, 0.08) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 lg:w-[600px] lg:h-[600px] bg-gradient-to-br from-emerald-100 to-cyan-100 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 lg:w-[600px] lg:h-[600px] bg-gradient-to-tr from-blue-100 to-emerald-100 rounded-full blur-3xl opacity-60"></div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24 w-full">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-8 md:gap-16 items-center">
          <div>
            <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-5 sm:mb-4 md:mb-5 tracking-tight">
              <span className="text-gray-900">Websites for</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 animate-gradient">Local Service Businesses</span>
            </h1>

            <p className="text-lg sm:text-lg md:text-xl text-gray-600 mb-7 sm:mb-6 md:mb-7 leading-relaxed max-w-xl">
              We help local businesses generate more leads with high-converting websites. Not just pretty designs—real results that grow your revenue.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-3 mb-7 sm:mb-6 md:mb-8">
              <GetStartedButton variant="primary" className="text-base sm:text-base touch-manipulation">
                Get Your Website
              </GetStartedButton>

              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border border-gray-300 hover:border-gray-400 text-gray-800 px-8 py-4 sm:px-8 sm:py-4 rounded-xl font-semibold transition-all text-base sm:text-base touch-manipulation shadow-sm"
              >
                See Pricing
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 md:gap-8 text-sm sm:text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="font-medium">7-Day Delivery</span>
              </div>
              <div className="font-medium">From $150</div>
              <div className="hidden sm:block font-medium">25+ Local Businesses Launched</div>
            </div>
          </div>

          <div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 rounded-2xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative bg-white backdrop-blur-xl border border-gray-200 rounded-2xl p-6 md:p-8 shadow-xl">
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-200">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <span className="ml-auto text-xs text-gray-400 font-mono">metroNexa.dev</span>
                </div>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="text-emerald-600 font-mono text-sm flex items-center gap-2">
                      <span className="text-gray-400">&gt;</span> Your Digital Presence
                    </div>
                    <div className="space-y-2 pl-4">
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                        24/7 Global Visibility
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>
                        Automated Lead Generation
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        Measurable ROI
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                      <div className="text-emerald-600 text-sm font-mono">Status: LIVE && CONVERTING</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
