import { useState, useEffect } from 'react';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { Check, Sparkles, MessageSquare, ArrowRight, Calendar, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import SEO from '../components/SEO';
import BookingModal from '../components/BookingModal';

const formatPrice = (priceStr: string) => {
  if (!priceStr) return '';
  const trimmed = priceStr.trim();
  if (trimmed === '$199') return '₹9,999';
  if (trimmed === '$499') return '₹24,999';
  if (trimmed === '$999') return '₹49,999';
  return trimmed.replace(/\$/g, '₹');
};

const fallbackPlans = [
  {
    id: 'p1',
    plan: "Starter Plan",
    price: "₹9,999",
    billing: "Monthly",
    status: "Active",
    features: "Single Landing Page\nBasic SEO Setup\nContact Form Integration\n1 Month Free Support",
    isPopular: "No"
  },
  {
    id: 'p2',
    plan: "Growth Business Plan",
    price: "₹24,999",
    billing: "Monthly",
    status: "Active",
    features: "Up to 5 Pages Responsive Website\nAdvanced SEO Architecture\nGoogle Business Profile Setup\nSocial Media Integration\n3 Months Maintenance",
    isPopular: "Yes"
  },
  {
    id: 'p3',
    plan: "Enterprise Suite",
    price: "₹49,999",
    billing: "Monthly",
    status: "Active",
    features: "Full Custom Web Application\nComplete Local & National SEO\nGoogle & Meta Ads Setup\nDedicated Account Manager\nPriority 24/7 Support\n1 Year Maintenance",
    isPopular: "No"
  }
];

export default function PricingPage() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { settings, linkNumber } = useSettings();
  
  // Booking Modal State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedPlanName, setSelectedPlanName] = useState('');

  const openBooking = (planName: string) => {
    setSelectedPlanName(planName);
    setIsBookingOpen(true);
  };

  useEffect(() => {
    async function fetchPlans() {
      try {
        const q = query(collection(db, 'pricing'), orderBy('price', 'asc'));
        const querySnapshot = await getDocs(q);
        const fetchedPlans = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any[];
        
        // Filter out drafts or inactive ones
        const activePlans = fetchedPlans.filter(p => !p.status || p.status === 'Active');
        setPlans(activePlans);
      } catch (error) {
        console.error("Error fetching pricing plans:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPlans();
  }, []);

  const displayedPlans = plans.length > 0 ? plans : (loading ? [] : fallbackPlans);

  if (settings.showPricing === false) {
    return (
      <div className="pt-32 pb-24 text-center min-h-[60vh] flex flex-col items-center justify-center bg-[#050A18] text-white">
        <h1 className="text-3xl font-bold mb-4">Pricing Plans</h1>
        <p className="text-slate-400 max-w-md mx-auto mb-8">
          Our pricing plans are currently offline. Please contact us directly for quotes and estimations.
        </p>
        <Link to="/contact" className="px-6 py-2.5 bg-amber-400 text-slate-900 rounded-lg font-bold hover:bg-amber-500 transition-colors">
          Contact Us
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#050A18] min-h-screen text-white pt-32 pb-24 relative overflow-hidden">
      <SEO 
        title="Pricing Plans"
        description="Affordable, premium pricing packages for Website Development, SEO, Ads, and digital solutions."
      />

      {/* Background Decorative Blobs */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-amber-500/5 rounded-full filter blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl -z-10 animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-sm font-semibold text-amber-500 tracking-wider uppercase mb-2">Transparent Pricing</h1>
          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Choose the Perfect Plan for <br className="hidden sm:inline" />
            Your Business Growth
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            No hidden charges. Clear features, expert implementation, and dedicated support to help you scale.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-slate-400">
            <p>Loading plans...</p>
          </div>
        ) : displayedPlans.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <p className="mb-4">No active pricing plans found.</p>
            <Link to="/contact" className="px-6 py-2.5 bg-amber-400 text-slate-900 rounded-lg font-bold">
              Request Custom Quote
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {displayedPlans.map((plan, index) => {
              const featuresList = plan.features 
                ? (typeof plan.features === 'string' ? plan.features.split('\n') : plan.features)
                : [];
              const isPopular = plan.isPopular === 'Yes' || plan.isPopular === true;

              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className={`relative flex flex-col justify-between bg-gradient-to-b from-[#0A1128] to-[#050A18] rounded-3xl border transition-all duration-500 overflow-hidden ${
                    isPopular 
                      ? 'border-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.1)] scale-105 md:scale-105 lg:scale-105 z-10' 
                      : 'border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  {isPopular && (
                    <div className="absolute top-0 right-0 bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-bl-2xl flex items-center gap-1.5 shadow-md">
                      <Sparkles className="w-3.5 h-3.5 fill-slate-950" /> Most Popular
                    </div>
                  )}

                  <div className="p-8 sm:p-10">
                    <h3 className="text-xl font-bold text-white mb-2">{plan.plan}</h3>
                    <div className="flex items-baseline gap-1.5 my-6">
                      <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                        {formatPrice(plan.price)}
                      </span>
                      {plan.billing && (
                        <span className="text-slate-400 text-sm font-semibold">
                          / {plan.billing}
                        </span>
                      )}
                    </div>

                    <div className="h-px bg-slate-800/80 mb-8"></div>

                    <ul className="space-y-4">
                      {featuresList.map((feature: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                          <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                            isPopular ? 'bg-amber-400/20 text-amber-400' : 'bg-slate-800 text-slate-400'
                          }`}>
                            <Check className="w-3.5 h-3.5" />
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-8 pt-0 flex flex-col gap-3">
                    <a
                      href="#book"
                      onClick={(e) => {
                        e.preventDefault();
                        openBooking(plan.plan);
                      }}
                      className={`w-full py-4 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
                        isPopular 
                          ? 'bg-amber-400 hover:bg-amber-500 text-slate-900 shadow-lg shadow-amber-400/25' 
                          : 'bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20'
                      }`}
                    >
                      <Calendar className="w-4 h-4" /> Book Consultation
                    </a>
                    
                    <Link
                      to={`/contact?plan=${encodeURIComponent(plan.plan)}`}
                      className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                        isPopular 
                          ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700/50' 
                          : 'bg-slate-800 hover:bg-slate-700 text-white'
                      }`}
                    >
                      <Mail className="w-4 h-4" /> Direct Contact Form
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        planName={selectedPlanName} 
      />
    </div>
  );
}
