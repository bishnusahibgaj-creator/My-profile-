import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';
import { db } from '../firebase';
import { useSettings } from '../context/SettingsContext';
import { doc, getDoc } from 'firebase/firestore';
import { 
  Code, 
  RefreshCcw, 
  LayoutTemplate, 
  MapPin, 
  Server, 
  Wrench,
  Search,
  Store,
  Megaphone,
  Target
} from 'lucide-react';

const getIcon = (iconName: string) => {
  switch (iconName?.toLowerCase()) {
    case 'code': return <Code className="w-16 h-16" />;
    case 'refresh': return <RefreshCcw className="w-16 h-16" />;
    case 'layout': return <LayoutTemplate className="w-16 h-16" />;
    case 'search': return <Search className="w-16 h-16" />;
    case 'map': return <MapPin className="w-16 h-16" />;
    case 'store': return <Store className="w-16 h-16" />;
    case 'megaphone': return <Megaphone className="w-16 h-16" />;
    case 'target': return <Target className="w-16 h-16" />;
    case 'server': return <Server className="w-16 h-16" />;
    case 'wrench': return <Wrench className="w-16 h-16" />;
    default: return <Code className="w-16 h-16" />;
  }
};

export default function ServiceDetail() {
  const { serviceId } = useParams();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { settings } = useSettings();

  useEffect(() => {
    async function fetchService() {
      if (!serviceId) return;
      try {
        const docRef = doc(db, 'services', serviceId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setService({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        console.error("Error fetching service detail:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchService();
  }, [serviceId]);

  if (loading) {
    return (
      <div className="pt-32 pb-24 text-center min-h-[60vh] flex flex-col items-center justify-center bg-[#050A18] text-white">
        <p className="text-slate-400">Loading service details...</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="pt-32 pb-24 text-center min-h-[60vh] flex flex-col items-center justify-center bg-[#050A18] text-white">
        <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
        <Link to="/services" className="text-amber-400 hover:text-amber-300 font-medium flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Services
        </Link>
      </div>
    );
  }

  const benefits = [
    "Increased conversions and engagement",
    "Modern, responsive, and mobile-friendly",
    "Optimized for performance and speed",
    "Dedicated support and maintenance"
  ];

  return (
    <div className="bg-[#050A18] min-h-screen">
      <SEO 
        title={service.name || service.title} 
        description={service.description} 
      />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-[#0A1128]">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <Link to="/services" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </Link>
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 lg:gap-16">
            <div className="w-24 h-24 shrink-0 bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 text-amber-500 rounded-3xl flex items-center justify-center mb-5 md:mb-0">
              {getIcon(service.icon)}
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">{service.name || service.title}</h1>
              <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
                {service.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Details & Benefits */}
      <section className="py-20 bg-[#050A18]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Why choose our {service.name || service.title} service?</h2>
              <p className="text-slate-400 leading-relaxed mb-8">
                We specialize in delivering top-tier {(service.name || service.title).toLowerCase()} tailored to your specific business needs. Our team ensures that every project not only meets your expectations but actively contributes to your growth and online success.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-300">
                    <CheckCircle2 className="w-6 h-6 text-amber-500 shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-[#0A1128] rounded-3xl p-8 border border-slate-800 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 text-amber-500 rounded-full flex items-center justify-center mb-6">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Ready to start?</h3>
              <p className="text-slate-400 mb-8">
                Let's discuss how we can help your business thrive with our {(service.name || service.title).toLowerCase()} solutions.
              </p>
              <Link to="/contact" className="px-8 py-4 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold rounded-xl transition-colors w-full sm:w-auto">
                Get a Free Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
