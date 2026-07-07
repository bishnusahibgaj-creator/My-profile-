import { useState, useEffect } from 'react';
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
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { services as defaultServices } from '../data/services';
import { db } from '../firebase';
import { collection, query, getDocs, orderBy, limit, addDoc, serverTimestamp } from 'firebase/firestore';
import { useSettings } from '../context/SettingsContext';

const getIcon = (iconName: string) => {
  switch (iconName?.toLowerCase()) {
    case 'code': return <Code className="w-8 h-8" />;
    case 'refresh': return <RefreshCcw className="w-8 h-8" />;
    case 'layout': return <LayoutTemplate className="w-8 h-8" />;
    case 'search': return <Search className="w-8 h-8" />;
    case 'map': return <MapPin className="w-8 h-8" />;
    case 'store': return <Store className="w-8 h-8" />;
    case 'megaphone': return <Megaphone className="w-8 h-8" />;
    case 'target': return <Target className="w-8 h-8" />;
    case 'server': return <Server className="w-8 h-8" />;
    case 'wrench': return <Wrench className="w-8 h-8" />;
    default: return <Code className="w-8 h-8" />;
  }
};

export default function Services({ showAll = true }: { showAll?: boolean }) {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { settings } = useSettings();

  useEffect(() => {
    async function fetchServices() {
      try {
        const servicesColl = collection(db, 'services');
        const q = query(servicesColl, orderBy('name', 'asc'));
        const querySnapshot = await getDocs(q);
        let fetchedServices = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any[];
        
        // If empty, auto-create (seed) the default services into the database
        if (fetchedServices.length === 0) {
          const toSeed = [
            {
              name: "Website Development",
              category: "Development",
              price: "$499 onwards",
              description: "Custom websites that are fast, responsive and SEO friendly.",
              icon: "code",
              status: "Active",
            },
            {
              name: "Website Rebuilding",
              category: "Development",
              price: "$299 onwards",
              description: "Redesign your old website with modern look & better performance.",
              icon: "refresh",
              status: "Active",
            },
            {
              name: "Landing Page Design",
              category: "Design",
              price: "$199 onwards",
              description: "High converting landing pages for your business or campaign.",
              icon: "layout",
              status: "Active",
            },
            {
              name: "Google SEO",
              category: "Marketing",
              price: "$299/mo",
              description: "Rank your website on Google and get more organic traffic.",
              icon: "search",
              status: "Active",
            },
            {
              name: "Local SEO",
              category: "Marketing",
              price: "$149/mo",
              description: "Improve your local ranking and get more customers in your area.",
              icon: "map",
              status: "Active",
            },
            {
              name: "Google Business Profile",
              category: "Marketing",
              price: "$99 onwards",
              description: "Setup & optimize your Google Business Profile for more visibility.",
              icon: "store",
              status: "Active",
            },
            {
              name: "Meta Ads",
              category: "Marketing",
              price: "$299/mo",
              description: "Run targeted Facebook & Instagram ads and grow your business.",
              icon: "megaphone",
              status: "Active",
            },
            {
              name: "Google Ads",
              category: "Marketing",
              price: "$299/mo",
              description: "Get more leads & sales with high converting Google Ads.",
              icon: "target",
              status: "Active",
            },
            {
              name: "Server Services",
              category: "Development",
              price: "$199 onwards",
              description: "Fast, secure and reliable server for your website and business.",
              icon: "server",
              status: "Active",
            },
            {
              name: "Website Maintenance",
              category: "Development",
              price: "$99/mo",
              description: "Keep your website updated, secure and running smoothly.",
              icon: "wrench",
              status: "Active",
            }
          ];

          for (const s of toSeed) {
            await addDoc(servicesColl, {
              ...s,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            });
          }

          // Fetch again after seeding
          const refetchedSnapshot = await getDocs(q);
          fetchedServices = refetchedSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any[];
        }

        const activeServices = fetchedServices.filter((s: any) => !s.status || s.status === 'Active');
        
        // Filter out duplicates by name / title
        const uniqueServices: any[] = [];
        const seenNames = new Set();
        for (const s of activeServices) {
          const serviceName = (s.name || s.title || '').trim().toLowerCase();
          if (serviceName && !seenNames.has(serviceName)) {
            seenNames.add(serviceName);
            uniqueServices.push(s);
          }
        }

        // Apply showAll limit if necessary (limit to 5 if !showAll)
        const finalServices = showAll ? uniqueServices : uniqueServices.slice(0, 5);
        setServices(finalServices);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, [showAll]);

  if (loading && services.length === 0) {
    return (
      <section id="services" className="py-24 bg-[#050A18] relative overflow-hidden text-center text-white">
        <p className="text-slate-400">Loading services...</p>
      </section>
    );
  }

  return (
    <section id="services" className="py-24 bg-[#050A18] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold text-amber-500 tracking-wider uppercase mb-2">Our Services</h2>
          <h3 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Complete Digital Solutions for Your Business</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {(services.length > 0 ? services : (loading ? [] : (showAll ? defaultServices : defaultServices.slice(0, 5)))).map((service, index) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 5) * 0.1, duration: 0.5 }}
            >
              <Link
                to={`/services/${service.id}`}
                className="block h-full relative bg-gradient-to-b from-[#0A1128] to-[#050A18] p-8 rounded-3xl border border-slate-800/60 hover:border-amber-500/30 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] transition-all duration-500 flex flex-col items-center text-center group cursor-pointer overflow-hidden"
              >
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-500/0 group-hover:via-amber-500/50 to-transparent transition-all duration-500"></div>
                
                <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 text-amber-500">
                  {getIcon(service.icon || 'code')}
                </div>
                <h4 className="text-lg font-bold text-white mb-3 group-hover:text-amber-400 transition-colors duration-300">{service.name || service.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed flex-1">
                  {service.description || 'Professional digital service tailored to your needs.'}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
