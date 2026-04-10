import { Footer } from '../components/Footer';
import { CompanyInquiryForm } from '../components/CompanyInquiryForm';

export function GetStarted() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(16, 185, 129, 0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 lg:w-[600px] lg:h-[600px] bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 lg:w-[600px] lg:h-[600px] bg-gradient-to-tr from-blue-500/20 to-emerald-500/20 rounded-full blur-3xl"></div>

      <main className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <CompanyInquiryForm />
      </main>

      <Footer />
    </div>
  );
}
