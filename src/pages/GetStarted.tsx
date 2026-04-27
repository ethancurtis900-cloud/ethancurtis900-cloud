import { Footer } from '../components/Footer';
import { CompanyInquiryForm } from '../components/CompanyInquiryForm';

export function GetStarted() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <main className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <CompanyInquiryForm />
      </main>

      <Footer />
    </div>
  );
}
