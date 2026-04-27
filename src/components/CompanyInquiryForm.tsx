import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Alert } from './ui/alert';
import { Building2, Mail, Phone, User, Loader2, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function CompanyInquiryForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    companyType: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const companyTypes = [
    'Retail/E-commerce',
    'Restaurant/Food Service',
    'Professional Services',
    'Healthcare',
    'Real Estate',
    'Construction/Trades',
    'Technology/Software',
    'Education',
    'Non-Profit',
    'Manufacturing',
    'Hospitality/Tourism',
    'Other'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error: submitError } = await supabase
        .from('company_inquiries')
        .insert([{
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          company_name: formData.companyName,
          company_type: formData.companyType,
          message: formData.message
        }]);

      if (submitError) throw submitError;

      await supabase.functions.invoke('send-contact-email', {
        body: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          message: `Company: ${formData.companyName}\nIndustry: ${formData.companyType}\n\n${formData.message}`,
        },
      });

      setSuccess(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        companyName: '',
        companyType: '',
        message: ''
      });
    } catch (err) {
      console.error('Form submission error:', err);
      setError('Failed to submit inquiry. Please try again or contact us directly.');
    } finally {
      setLoading(false);
    }
  };

  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/\D/g, '');

    if (phoneNumber.length === 0) return '';
    if (phoneNumber.length <= 3) return `(${phoneNumber}`;
    if (phoneNumber.length <= 6) return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      const formatted = formatPhoneNumber(value);
      setFormData(prev => ({
        ...prev,
        phone: formatted
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-emerald-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h2>
        <p className="text-gray-600 text-lg mb-8">
          We've received your inquiry and will get back to you within 24 hours.
        </p>
        <Button
          onClick={() => setSuccess(false)}
          className="bg-gray-900 hover:bg-black text-white"
        >
          Submit Another Inquiry
        </Button>
      </div>
    );
  }

  return (
    <Card className="max-w-3xl mx-auto bg-white border-gray-200 p-8 shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Get Started Today</h2>
        <p className="text-gray-600">
          Tell us about your company and we'll create a custom solution for you.
        </p>
      </div>

      {error && (
        <Alert className="mb-6 bg-red-50 border-red-200 text-red-700">
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-gray-700">
              First Name *
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="firstName"
                name="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="pl-10 bg-white border-gray-300 text-gray-900 focus:border-emerald-500"
                placeholder="John"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-gray-700">
              Last Name *
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="lastName"
                name="lastName"
                type="text"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="pl-10 bg-white border-gray-300 text-gray-900 focus:border-emerald-500"
                placeholder="Doe"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-700">
            Email *
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="pl-10 bg-white border-gray-300 text-gray-900 focus:border-emerald-500"
              placeholder="john@company.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-gray-700">
            Phone Number *
          </Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              className="pl-10 bg-white border-gray-300 text-gray-900 focus:border-emerald-500"
              placeholder="(555) 123-4567"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="companyName" className="text-gray-700">
            Company Name *
          </Label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="companyName"
              name="companyName"
              type="text"
              required
              value={formData.companyName}
              onChange={handleChange}
              className="pl-10 bg-white border-gray-300 text-gray-900 focus:border-emerald-500"
              placeholder="Your Company LLC"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="companyType" className="text-gray-700">
            Company Type *
          </Label>
          <select
            id="companyType"
            name="companyType"
            required
            value={formData.companyType}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          >
            <option value="">Select your industry</option>
            {companyTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="text-gray-700">
            Tell Us About Your Project
          </Label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 resize-none"
            placeholder="What are your goals? What features do you need?"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-gray-900 hover:bg-black text-white py-6 text-lg font-semibold disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              Submitting...
            </>
          ) : (
            'Submit Inquiry'
          )}
        </Button>
      </form>
    </Card>
  );
}
