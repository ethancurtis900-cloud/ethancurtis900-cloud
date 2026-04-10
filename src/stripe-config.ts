export interface StripeProduct {
  id: string;
  priceId: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  mode: 'payment' | 'subscription';
}

export const stripeProducts: StripeProduct[] = [
  {
    id: 'prod_basic_package',
    priceId: 'price_basic_package',
    name: 'Basic Package',
    description: 'Perfect for getting your business online quickly. One-page website that meets essential standards and converts visitors into customers. Includes mobile optimization and basic SEO setup.',
    price: 150.00,
    currency: 'usd',
    mode: 'payment'
  },
  {
    id: 'prod_premium_package',
    priceId: 'price_premium_package',
    name: 'Premium Package',
    description: 'Enhanced online presence with up to 3 pages. Includes advanced features, custom design elements, mobile optimization, SEO setup, and contact forms. Ideal for growing businesses.',
    price: 300.00,
    currency: 'usd',
    mode: 'payment'
  },
  {
    id: 'prod_executive_package',
    priceId: 'price_executive_package',
    name: 'Executive Package',
    description: 'Complete digital solution with unlimited pages. Full-featured website with e-commerce capabilities, advanced analytics, custom functionality, premium design, and ongoing optimization. Perfect for established businesses.',
    price: 500.00,
    currency: 'usd',
    mode: 'payment'
  }
];

export const getProductById = (id: string): StripeProduct | undefined => {
  return stripeProducts.find(product => product.id === id);
};

export const getProductByPriceId = (priceId: string): StripeProduct | undefined => {
  return stripeProducts.find(product => product.priceId === priceId);
};