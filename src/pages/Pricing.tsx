import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { PricingCard } from '../components/PricingCard';
import { stripeProducts } from '../stripe-config';

export function Pricing() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get your business online with our professional web development service. 
              No hidden fees, no monthly subscriptions - just a one-time investment in your digital presence.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="flex justify-center">
            <div className="max-w-md">
              {stripeProducts.map((product) => (
                <PricingCard
                  key={product.id}
                  product={product}
                  featured={true}
                />
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Frequently Asked Questions
            </h2>
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What's included in the MetroNexa Web Launch?
                </h3>
                <p className="text-gray-600">
                  You'll get a fully responsive website with up to 5 pages, mobile optimization, 
                  basic SEO setup, and modern design tailored to your brand. Perfect for startups 
                  and small businesses looking to establish their online presence.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  How long does it take to complete?
                </h3>
                <p className="text-gray-600">
                  Most projects are completed within 2-3 weeks from the initial consultation. 
                  We'll work closely with you throughout the process to ensure your vision comes to life.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Do you provide ongoing support?
                </h3>
                <p className="text-gray-600">
                  Yes! We provide 30 days of free support after launch for any bugs or minor adjustments. 
                  Extended support and maintenance packages are available separately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}