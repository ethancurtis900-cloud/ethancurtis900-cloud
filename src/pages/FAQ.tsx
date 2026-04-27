import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Footer } from '../components/Footer'

interface FAQItemProps {
  question: string
  answer: string
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-gray-200 bg-white rounded-xl overflow-hidden transition-all hover:border-emerald-400">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left group"
      >
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
          {question}
        </h3>
        <ChevronDown
          className={`w-5 h-5 text-emerald-500 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="px-6 pb-5 text-gray-600 leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  )
}

export function FAQ() {
  const faqs = [
    {
      question: "What services does MetroNexa offer?",
      answer: "MetroNexa specializes in professional web development services. We offer the MetroNexa Web Launch package - a fully responsive, modern website tailored to your brand. Includes up to 5 pages, mobile optimization, and basic SEO setup, perfect for startups and small businesses ready to make an impact online."
    },
    {
      question: "How long does it take to build a website?",
      answer: "Our MetroNexa Web Launch package typically takes 1-2 weeks to complete. Timeline depends on project complexity, content readiness, and revision rounds. We'll provide a detailed timeline during our initial consultation to ensure we meet your launch goals."
    },
    {
      question: "Do you provide website hosting?",
      answer: "While we don't provide hosting directly, we partner with reliable hosting providers and can help you set up hosting as part of our service. We'll recommend the best hosting solution based on your website's requirements and traffic expectations."
    },
    {
      question: "Can you redesign my existing website?",
      answer: "Absolutely! We offer website redesign services to modernize your existing site. We'll analyze your current website, identify areas for improvement, and create a modern, responsive design that aligns with your brand and business goals."
    },
    {
      question: "Will my website be mobile-friendly?",
      answer: "Yes, all our websites are fully responsive and optimized for mobile devices, tablets, and desktops. With mobile traffic accounting for over 50% of web browsing, we ensure your site looks and functions perfectly on all screen sizes."
    },
    {
      question: "What is included in SEO optimization?",
      answer: "Our SEO services include on-page optimization (meta tags, headings, alt text), site speed optimization, mobile responsiveness, clean URL structure, XML sitemap creation, and basic keyword optimization. For advanced SEO campaigns, we can recommend specialized partners."
    },
    {
      question: "Do you provide ongoing maintenance and support?",
      answer: "While our MetroNexa Web Launch package focuses on getting your site built and launched, we do offer standalone maintenance plans for clients who need ongoing assistance with security updates, content updates, bug fixes, and technical support after launch."
    },
    {
      question: "Can I update the website content myself?",
      answer: "Depending on your package, we can implement a user-friendly content management system (CMS) that allows you to easily update text, images, and other content without technical knowledge. We'll provide training to ensure you're comfortable managing your site."
    },
    {
      question: "What happens if I need changes after the website is launched?",
      answer: "We offer post-launch support for all our clients. Minor tweaks and adjustments are typically included in the first 30 days. For larger changes or ongoing updates, we offer flexible maintenance packages or hourly rates depending on your needs."
    },
    {
      question: "How do I get started?",
      answer: "Getting started is easy! Simply fill out our contact form or reach out directly. We'll schedule a free consultation to discuss your project requirements, goals, and timeline. From there, we'll provide a detailed proposal and roadmap for your website project."
    }
  ]

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10 pt-24 py-16 sm:py-24 md:py-32 px-4">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-emerald-100 text-emerald-700 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
            Got Questions?
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 tracking-tight">
            <span className="text-gray-900">Frequently Asked</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500">Questions</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Find answers to common questions about our web development services
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h2>
            <p className="text-gray-600 mb-6">
              Can't find the answer you're looking for? We're here to help.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
