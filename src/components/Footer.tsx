import { Mail, Instagram, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="bg-navy-950 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="shadow-lg shadow-emerald-500/25 rounded-xl">
                <Logo className="w-10 h-10" />
              </div>
              <div className="text-xl font-bold">
                Metro<span className="relative">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Nexa</span>
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500"></div>
                </span>
              </div>
            </div>
            <p className="text-navy-300 mb-6 max-w-md leading-relaxed text-sm">
              Building high-converting websites that help businesses grow online. Your success is our mission.
            </p>
            <div className="space-y-2">
              <a href="mailto:contact@metronexa.com" className="flex items-center gap-2 text-navy-300 hover:text-emerald-400 transition-colors text-sm">
                <Mail className="w-4 h-4" />
                <span>contact@metronexa.com</span>
              </a>
              <a href="https://instagram.com/metronexaweb" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-navy-300 hover:text-emerald-400 transition-colors text-sm">
                <Instagram className="w-4 h-4" />
                <span>@metronexaweb</span>
              </a>
              <div className="flex items-center gap-2 text-navy-300 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Baltimore, MD</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Services</h4>
            <ul className="space-y-2">
              <li><Link to="/#services" className="text-navy-300 hover:text-emerald-400 transition-colors text-sm">Web Design</Link></li>
              <li><Link to="/#services" className="text-navy-300 hover:text-emerald-400 transition-colors text-sm">SEO</Link></li>
              <li><Link to="/#services" className="text-navy-300 hover:text-emerald-400 transition-colors text-sm">Branding</Link></li>
              <li><Link to="/#services" className="text-navy-300 hover:text-emerald-400 transition-colors text-sm">Optimization</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-navy-300 hover:text-emerald-400 transition-colors text-sm">About Us</Link></li>
              <li><Link to="/contact" className="text-navy-300 hover:text-emerald-400 transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-navy-400 text-sm">
              © 2025 MetroNexa. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/privacy" className="text-navy-400 hover:text-emerald-400 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-navy-400 hover:text-emerald-400 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
