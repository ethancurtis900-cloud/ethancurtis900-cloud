import { Navbar } from '../components/Navbar'
import { Contact } from '../components/Contact'
import { Footer } from '../components/Footer'

export function ContactUs() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <Contact />
      </div>
      <Footer />
    </div>
  )
}
