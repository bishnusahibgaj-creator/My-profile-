import { Code2, Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';

export default function Footer() {
  const { settings, displayNumber, linkNumber } = useSettings();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050A18] text-slate-400 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        
        <div>
          <Link to="/" onClick={scrollToTop} className="flex items-center gap-2 text-white font-bold text-xl tracking-tight mb-6">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden bg-white">
              <img src="https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=100&q=80" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span className="flex flex-col leading-tight">
              <span>{settings.websiteName || 'Website Building'}</span>
              <span className="text-[10px] text-amber-400 font-medium uppercase tracking-widest">Web Solutions</span>
            </span>
          </Link>
          <p className="text-sm leading-relaxed mb-6">
            We provide premium website development, local SEO, Google Business Profile optimization, and digital marketing services to help your business grow online.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-amber-400 hover:text-slate-900 transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-amber-400 hover:text-slate-900 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-amber-400 hover:text-slate-900 transition-colors">
              <Youtube className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-amber-400 hover:text-slate-900 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Quick Links</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/services" onClick={scrollToTop} className="hover:text-amber-400 transition-colors">Services</Link></li>
            <li><Link to="/demos" onClick={scrollToTop} className="hover:text-amber-400 transition-colors">Demo Projects</Link></li>
            {settings.showPricing !== false && (
              <li><Link to="/pricing" onClick={scrollToTop} className="hover:text-amber-400 transition-colors">Pricing</Link></li>
            )}
            <li><Link to="/about" onClick={scrollToTop} className="hover:text-amber-400 transition-colors">About Us</Link></li>
            <li><Link to="/contact" onClick={scrollToTop} className="hover:text-amber-400 transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Services</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-amber-400 transition-colors">Website Development</a></li>
            <li><a href="#" className="hover:text-amber-400 transition-colors">Local SEO</a></li>
            <li><a href="#" className="hover:text-amber-400 transition-colors">Google Meta Ads</a></li>
            <li><a href="#" className="hover:text-amber-400 transition-colors">Website Maintenance</a></li>
            <li><a href="#" className="hover:text-amber-400 transition-colors">Landing Page Design</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Contact Info</h4>
          <ul className="space-y-4 text-sm">
            <li>
              <p className="text-slate-300">Call Us:</p>
              <a href={`tel:+${linkNumber}`} className="hover:text-amber-400 transition-colors font-medium">{displayNumber}</a>
            </li>
            <li>
              <p className="text-slate-300">Email Us:</p>
              <a href={`mailto:${settings.contactEmail}`} className="hover:text-amber-400 transition-colors font-medium">{settings.contactEmail}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-slate-800 text-xs">
        <div>
          &copy; {new Date().getFullYear()} {settings.websiteName || 'Website Building Web Solutions'}. All rights reserved.
        </div>
        <div className="flex gap-4">
          <Link to="/privacy-policy" onClick={scrollToTop} className="hover:text-amber-400 transition-colors">Privacy Policy</Link>
          <Link to="/refund-policy" onClick={scrollToTop} className="hover:text-amber-400 transition-colors">Refund Policy</Link>
          <Link to="/terms-conditions" onClick={scrollToTop} className="hover:text-amber-400 transition-colors">Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
}
