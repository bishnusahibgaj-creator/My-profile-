import { Code2, Menu, X, PhoneCall } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { settings, displayNumber, linkNumber } = useSettings();

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-[#0A1128]/95 backdrop-blur-md border-b border-slate-800/50 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link to="/" onClick={closeMenu} className="flex items-center gap-2 text-white font-bold text-xl tracking-tight">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden bg-white">
            <img src="https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=100&q=80" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <span className="flex flex-col leading-tight">
            <span>{settings.websiteName || 'Digital Growth'}</span>
            <span className="text-[10px] text-amber-400 font-medium uppercase tracking-widest">Web Solutions</span>
          </span>
        </Link>
        
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <Link to="/services" className="hover:text-white transition-colors">Services</Link>
          <Link to="/demos" className="hover:text-white transition-colors">Demos</Link>
          {settings.showPricing !== false && (
            <Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link>
          )}
          <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
          <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
        </nav>

        <div className="hidden lg:flex items-center gap-6">
          <a href={`tel:+${linkNumber}`} className="flex items-center gap-2 text-slate-200 hover:text-amber-400 font-semibold transition-colors">
            <PhoneCall className="w-4 h-4 text-amber-400" /> {displayNumber}
          </a>
          <Link 
            to="/contact"
            className="px-6 py-2.5 bg-amber-400 text-slate-900 hover:bg-amber-500 transition-colors rounded-lg font-bold text-sm"
          >
            Book Now
          </Link>
        </div>

        <button 
          className="lg:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0A1128] border-b border-slate-800 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4 text-sm font-medium text-slate-300">
              <Link to="/" onClick={closeMenu} className="text-left py-2 hover:text-white transition-colors">Home</Link>
              <Link to="/services" onClick={closeMenu} className="text-left py-2 hover:text-white transition-colors">Services</Link>
              <Link to="/demos" onClick={closeMenu} className="text-left py-2 hover:text-white transition-colors">Demos</Link>
              {settings.showPricing !== false && (
                <Link to="/pricing" onClick={closeMenu} className="text-left py-2 hover:text-white transition-colors">Pricing</Link>
              )}
              <Link to="/about" onClick={closeMenu} className="text-left py-2 hover:text-white transition-colors">About Us</Link>
              <Link to="/contact" onClick={closeMenu} className="text-left py-2 hover:text-white transition-colors">Contact</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
