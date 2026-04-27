import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Home } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/button';

export function Success() {
  const [searchParams] = useSearchParams();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // In a real implementation, you might fetch order details using the session_id
    // For now, we'll show a generic success message
    if (sessionId) {
      setOrderDetails({
        sessionId,
        productName: 'MetroNexa Web Launch',
        amount: '$250.00'
      });
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
            {/* Success Icon */}
            <div className="mb-8">
              <CheckCircle className="h-20 w-20 text-emerald-600 mx-auto" />
            </div>

            {/* Success Message */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Payment Successful!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Thank you for choosing MetroNexa. Your order has been confirmed and we'll be in touch soon.
            </p>

            {/* Order Details */}
            {orderDetails && (
              <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Details</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Product:</span>
                    <span className="font-medium text-gray-900">{orderDetails.productName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-medium text-gray-900">{orderDetails.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Session ID:</span>
                    <span className="font-mono text-sm text-gray-700">{orderDetails.sessionId}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Next Steps */}
            <div className="bg-emerald-50 rounded-lg p-6 mb-8 text-left">
              <h2 className="text-lg font-semibold text-emerald-900 mb-4">What's Next?</h2>
              <ul className="space-y-2 text-emerald-800">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>You'll receive a confirmation email within the next few minutes</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Our team will contact you within 24 hours to schedule your consultation</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>We'll begin work on your website immediately after the consultation</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-gray-900 hover:bg-black">
                <Link to="/">
                  <Home className="h-4 w-4 mr-2" />
                  Return Home
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}