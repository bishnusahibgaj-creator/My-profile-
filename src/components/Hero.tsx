import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import WhatsAppIcon from './WhatsAppIcon';
import { useSettings } from '../context/SettingsContext';

export default function Hero() {
  const { settings, linkNumber } = useSettings();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = settings.heroImages?.filter(Boolean) || [
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop'
  ];

  useEffect(() => {
    if (images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative overflow-hidden bg-[#0A1128] text-white pt-24 pb-16 sm:pt-32 sm:pb-24 flex items-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-12 w-full">
        <motion.div
          className="flex-1 text-center lg:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 text-amber-500 text-sm font-medium mb-6">
            We Build Your Online Success
          </div>
          <h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight text-white"
            dangerouslySetInnerHTML={{ __html: (settings.heroHeadline || '').replace(/\\n/g, '<br/>').replace(/\n/g, '<br/>') }}
          />
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 mb-10 font-light">
            {settings.heroSubheadline}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Link 
              to="/contact"
              className="px-8 py-3.5 bg-amber-400 hover:bg-amber-500 transition-colors text-slate-900 font-bold rounded-lg flex items-center justify-center gap-2"
            >
              Get Free Consultation <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/services"
              className="px-8 py-3.5 bg-transparent border border-slate-600 hover:bg-slate-800 transition-colors text-white font-semibold rounded-lg flex items-center justify-center gap-2"
            >
              View Services <span className="grid grid-cols-2 gap-1 w-4 h-4 ml-1"><span className="bg-current rounded-sm"></span><span className="bg-current rounded-sm"></span><span className="bg-current rounded-sm"></span><span className="bg-current rounded-sm"></span></span>
            </Link>
            <a 
              href={`https://wa.me/${linkNumber}?text=Hi%2C%20I'm%20interested%20in%20your%20digital%20marketing%20services.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-transparent border border-[#25D366] hover:bg-[#25D366]/10 transition-colors text-[#25D366] font-semibold rounded-lg flex items-center justify-center gap-2"
            >
               <WhatsAppIcon className="w-5 h-5" /> Chat on WhatsApp
            </a>
          </div>
        </motion.div>

        <motion.div 
          className="flex-1 w-full max-w-2xl lg:max-w-none relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            <motion.img 
              key={currentImageIndex}
              src={images[currentImageIndex]} 
              alt="Digital Services" 
              className="absolute inset-0 w-full h-full object-cover opacity-90"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            />
          </AnimatePresence>
          
          {images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    idx === currentImageIndex ? 'bg-amber-400 w-6' : 'bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
