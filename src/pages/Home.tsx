import { Hero } from '../components/Hero'
import { WhyChooseUs } from '../components/WhyChooseUs'
import { Services } from '../components/Services'
import { Benefits } from '../components/Benefits'
import { Testimonials } from '../components/Testimonials'
import { CTA } from '../components/CTA'
import { Footer } from '../components/Footer'

export function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <WhyChooseUs />
      <Services />
      <Benefits />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  )
}