import WhatsAppIcon from './WhatsAppIcon';
import { useSettings } from '../context/SettingsContext';

export default function FloatingWhatsApp() {
  const { linkNumber } = useSettings();
  const phoneNumber = linkNumber || "911234567890";
  const message = "Hi, I'm interested in your digital marketing services.";
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#1ebd5a] text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center group"
      aria-label="Contact us on WhatsApp"
    >
      <WhatsAppIcon className="w-8 h-8" />
      <span className="absolute right-full mr-4 bg-slate-900 text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-slate-700 shadow-xl">
        Chat with us
      </span>
    </a>
  );
}
