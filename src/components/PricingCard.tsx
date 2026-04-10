import React from 'react';
import { Check } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { StripeProduct } from '../stripe-config';

interface PricingCardProps {
  product: StripeProduct;
  featured?: boolean;
}

export function PricingCard({ product, featured = false }: PricingCardProps) {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/get-started');
  };

  const features = [
    'Up to 5 pages',
    'Mobile optimization',
    'Basic SEO setup',
    'Responsive design',
    'Modern, tailored branding'
  ];

  return (
    <div className={`relative rounded-2xl p-8 ${
      featured 
        ? 'bg-gradient-to-br from-emerald-50 to-cyan-50 border-2 border-emerald-200 shadow-xl' 
        : 'bg-white border border-gray-200 shadow-lg'
    }`}>
      {featured && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
            Most Popular
          </span>
        </div>
      )}
      
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">{product.name}</h3>
        <div className="mb-4">
          <span className="text-4xl font-bold text-gray-900">${product.price}</span>
          <span className="text-gray-600 ml-2">one-time</span>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
      </div>

      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <Check className="h-5 w-5 text-emerald-600 mr-3 flex-shrink-0" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        onClick={handleGetStarted}
        className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
          featured
            ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl'
            : 'bg-gray-900 hover:bg-gray-800 text-white'
        }`}
      >
        Get Started
      </Button>
    </div>
  );
}