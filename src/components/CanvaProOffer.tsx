import { 
  Infinity, Image as ImageIcon, Briefcase, Crop, Wand2, 
  Lightbulb, Calendar, Cloud, Headphones, ShieldCheck, 
  CheckCircle, Zap, Shield, Users, ArrowRight 
} from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { useSettings } from '../context/SettingsContext';

export default function CanvaProOffer() {
  const { settings } = useSettings();

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent("Hi, I'm interested in the Canva Pro ₹199 offer!");
    window.open(`https://wa.me/${settings.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section className="py-16 px-4 bg-[#050A18] relative overflow-hidden">
      {/* Background glowing effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="bg-gradient-to-b from-[#0f172a] to-[#0a0f1c] rounded-3xl border border-blue-500/30 p-8 md:p-12 shadow-2xl shadow-blue-900/20">
          
          {/* Header Section */}
          <div className="text-center mb-12 relative">
            <div className="absolute top-0 left-0 -translate-y-6 -translate-x-4 bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold py-2 px-6 rounded-br-2xl rounded-tl-xl shadow-lg transform -rotate-2 hidden md:block">
              <div className="text-sm">LIMITED TIME</div>
              <div className="text-2xl">OFFER</div>
              <div className="flex justify-center gap-1 mt-1 text-black">
                <span className="text-xl">★</span><span className="text-xl">★</span><span className="text-xl">★</span>
              </div>
            </div>

            <div className="absolute top-0 right-0 -translate-y-6 translate-x-4 bg-transparent border border-pink-500 rounded-xl p-3 shadow-[0_0_15px_rgba(236,72,153,0.5)] hidden md:block">
              <div className="flex items-center gap-2 text-white font-bold text-xl">
                <Calendar className="w-6 h-6 text-pink-500" />
                1 DAY
              </div>
              <div className="text-amber-400 font-bold">FREE TRIAL</div>
              <div className="text-xs text-gray-300">Try Canva Pro<br/>Risk-Free!</div>
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 italic">
              Unlock Your <br className="md:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 not-italic">CREATIVITY</span>
            </h2>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px bg-amber-400/50 w-12 md:w-24"></div>
              <span className="text-amber-400 font-semibold tracking-widest uppercase">WITH</span>
              <div className="h-px bg-amber-400/50 w-12 md:w-24"></div>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter drop-shadow-[0_0_25px_rgba(255,255,255,0.3)]">
              CANVA <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text rounded-2xl px-2 inline-block -rotate-3 border-2 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.5)] bg-slate-900/50">PRO</span>
            </h1>
            
            <div className="mt-8 inline-block bg-gradient-to-r from-slate-800 to-slate-900 border border-amber-500/50 px-8 py-2 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <span className="text-amber-400 font-bold tracking-widest text-lg">PAYMENT AFTER ACTIVATION</span>
            </div>
          </div>

          {/* Center Graphic & Features */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-12">
            
            {/* Left Features */}
            <div className="w-full lg:w-1/3 space-y-6">
              <FeatureItem 
                icon={<Infinity className="w-6 h-6 text-purple-400" />}
                title="Unlimited Premium Templates"
                desc="Access millions of professional templates."
                iconBg="bg-purple-900/40"
                iconBorder="border-purple-500/50"
              />
              <FeatureItem 
                icon={<ImageIcon className="w-6 h-6 text-blue-400" />}
                title="100M+ Photos, Videos, Graphics"
                desc="Everything you need in one place."
                iconBg="bg-blue-900/40"
                iconBorder="border-blue-500/50"
              />
              <FeatureItem 
                icon={<Briefcase className="w-6 h-6 text-teal-400" />}
                title="1000+ Brand Kits"
                desc="Keep your brand consistent and organized."
                iconBg="bg-teal-900/40"
                iconBorder="border-teal-500/50"
              />
              <FeatureItem 
                icon={<Crop className="w-6 h-6 text-pink-400" />}
                title="Quickly Resize & Translate"
                desc="Save time and reach a global audience."
                iconBg="bg-pink-900/40"
                iconBorder="border-pink-500/50"
              />
              <FeatureItem 
                icon={<Wand2 className="w-6 h-6 text-fuchsia-400" />}
                title="Remove Backgrounds"
                desc="Create professional designs instantly."
                iconBg="bg-fuchsia-900/40"
                iconBorder="border-fuchsia-500/50"
              />
            </div>

            {/* Center Graphic */}
            <div className="w-full lg:w-1/3 flex justify-center relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-[60px] rounded-full"></div>
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border border-cyan-400 shadow-[0_0_40px_rgba(6,182,212,0.6)] flex items-center justify-center bg-gradient-to-br from-[#0a1930] to-[#1e3a8a]">
                <div className="absolute -top-4 -right-4 text-6xl rotate-12">👑</div>
                <h3 className="text-5xl md:text-6xl font-serif italic text-white font-bold drop-shadow-lg">Canva</h3>
                {/* Floating Elements */}
                <div className="absolute -left-6 top-1/4 bg-slate-800 p-2 rounded-lg border border-slate-600 shadow-lg transform -rotate-12">
                   <div className="w-10 h-8 bg-green-500/20 rounded flex items-center justify-center"><ImageIcon className="w-5 h-5 text-green-400" /></div>
                </div>
                <div className="absolute -right-8 top-1/3 bg-purple-600/20 p-3 rounded-lg border border-purple-500 shadow-lg transform rotate-12">
                   <span className="text-white font-bold text-2xl">T</span>
                </div>
                <div className="absolute bottom-4 -right-4 bg-slate-800 p-2 rounded-lg border border-slate-600 shadow-lg transform rotate-6">
                   <div className="w-10 h-12 bg-gray-200 rounded text-slate-800 text-xs p-1 font-mono leading-none">====<br/>===<br/>=</div>
                </div>
              </div>
            </div>

            {/* Right Features */}
            <div className="w-full lg:w-1/3 space-y-6">
              <FeatureItem 
                icon={<Lightbulb className="w-6 h-6 text-green-400" />}
                title="Boost Creativity with AI"
                desc="Smart tools to create faster & better."
                iconBg="bg-green-900/40"
                iconBorder="border-green-500/50"
              />
              <FeatureItem 
                icon={<Calendar className="w-6 h-6 text-rose-400" />}
                title="Plan & Schedule Content"
                desc="Stay consistent, stay ahead."
                iconBg="bg-rose-900/40"
                iconBorder="border-rose-500/50"
              />
              <FeatureItem 
                icon={<Cloud className="w-6 h-6 text-cyan-400" />}
                title="1TB of Cloud Storage"
                desc="Store everything securely."
                iconBg="bg-cyan-900/40"
                iconBorder="border-cyan-500/50"
              />
              <FeatureItem 
                icon={<Headphones className="w-6 h-6 text-orange-400" />}
                title="Online Customer Support"
                desc="We're here to help anytime."
                iconBg="bg-orange-900/40"
                iconBorder="border-orange-500/50"
              />
              <FeatureItem 
                icon={<ShieldCheck className="w-6 h-6 text-emerald-400" />}
                title="24/7 Customer Support"
                desc="Round-the-clock assistance."
                iconBg="bg-emerald-900/40"
                iconBorder="border-emerald-500/50"
              />
            </div>
          </div>

          {/* Pricing & CTA */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-12 pt-8 border-t border-slate-800">
            
            <div className="bg-gradient-to-b from-[#1a0f2e] to-[#0d071c] border border-amber-500/50 rounded-2xl p-6 text-center shadow-[0_0_30px_rgba(245,158,11,0.15)] flex-1 w-full max-w-sm mx-auto">
              <div className="bg-amber-500 text-black font-bold py-1 px-4 rounded-full inline-block mb-4 text-sm tracking-wider">CONTACT PLAN</div>
              <div className="text-gray-400 text-2xl line-through decoration-red-500 decoration-2 mb-2 font-bold">₹4,000</div>
              <div className="text-6xl md:text-7xl font-black text-amber-400 mb-4 drop-shadow-md">₹199</div>
              <div className="bg-pink-600 text-white font-bold py-2 px-6 rounded-full text-sm tracking-widest shadow-lg">ONE TIME PAYMENT</div>
            </div>

            <div className="flex-1 flex flex-col items-center md:items-end w-full">
               
              <div className="flex flex-wrap justify-center md:justify-end gap-4 mb-8">
                <TrustBadge icon={<CheckCircle className="w-4 h-4" />} text="100% SAFE & SECURE" />
                <TrustBadge icon={<Zap className="w-4 h-4 text-amber-400" />} text="INSTANT ACTIVATION" />
                <TrustBadge icon={<Shield className="w-4 h-4 text-blue-400" />} text="PREMIUM FEATURES" />
                <TrustBadge icon={<Users className="w-4 h-4 text-purple-400" />} text="TRUSTED BY MILLIONS" />
              </div>

              <div className="w-full flex flex-col sm:flex-row items-center justify-center md:justify-end gap-4">
                <button 
                  onClick={handleWhatsAppClick}
                  className="w-full sm:w-auto flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white px-6 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-green-500/30 transition-all transform hover:scale-105 group"
                >
                  <WhatsAppIcon className="w-8 h-8 group-hover:scale-110 transition-transform" />
                  <div className="text-left leading-tight">
                    <div className="font-bold text-xl">Chat on WhatsApp</div>
                    <div className="text-xs text-green-100 font-normal">We're here to help you!</div>
                  </div>
                </button>
                
                <button 
                  onClick={handleWhatsAppClick}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg hover:shadow-cyan-500/40 transition-all transform hover:scale-105"
                >
                  GET CANVA PRO NOW
                  <ArrowRight className="w-6 h-6 bg-white text-blue-600 rounded-full p-1" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

function FeatureItem({ icon, title, desc, iconBg, iconBorder }: any) {
  return (
    <div className="flex items-start gap-4">
      <div className={`w-12 h-12 rounded-full ${iconBg} border ${iconBorder} flex items-center justify-center shrink-0 shadow-lg`}>
        {icon}
      </div>
      <div>
        <h4 className="text-white font-bold text-sm md:text-base">{title}</h4>
        <p className="text-gray-400 text-xs md:text-sm leading-snug">{desc}</p>
      </div>
    </div>
  );
}

function TrustBadge({ icon, text }: any) {
  return (
    <div className="flex items-center gap-2 text-xs font-semibold text-gray-300">
      {icon}
      <span>{text}</span>
    </div>
  );
}
