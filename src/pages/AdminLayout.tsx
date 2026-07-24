import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Settings, 
  Briefcase, 
  Users, 
  MessageSquare, 
  Calendar,
  LogOut,
  Palette,
  CreditCard,
  Image,
  Bot,
  Menu,
  X,
  HelpCircle,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '../firebase';
import AdminLogin from './AdminLogin';

const sidebarLinks = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { name: 'Leads', path: '/admin/leads', icon: Users },
  { name: 'Bookings', path: '/admin/bookings', icon: Calendar },
  { name: 'Demo Projects', path: '/admin/demos', icon: Image },
  { name: 'Services', path: '/admin/services', icon: Briefcase },
  { name: 'Platform Features', path: '/admin/features', icon: Palette },
  { name: 'FAQs', path: '/admin/faqs', icon: HelpCircle },
  { name: 'Testimonials', path: '/admin/testimonials', icon: MessageSquare },
  { name: 'Pricing', path: '/admin/pricing', icon: CreditCard },
  { name: 'Settings', path: '/admin/settings', icon: Settings },
];

export default function AdminLayout() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Auth Loading Screen
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#050A18] flex flex-col items-center justify-center p-4">
        <div className="relative flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-slate-400 text-sm font-semibold tracking-wider animate-pulse uppercase">
            Verifying Admin Session...
          </p>
        </div>
      </div>
    );
  }

  // Auth Guard
  if (!user) {
    return <AdminLogin />;
  }

  return (
    <div className="min-h-screen bg-[#050A18] text-slate-100 flex flex-col md:flex-row font-sans">
      {/* Mobile Header */}
      <div className="md:hidden bg-[#0A1128] border-b border-slate-800/80 text-white p-4 flex items-center justify-between z-20">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-white hover:text-amber-400 transition-colors">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden bg-white/10 border border-white/20">
            <img src="https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=100&q=80" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">Admin Portal</span>
        </Link>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-300 hover:text-white transition-colors">
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/70 z-10 backdrop-blur-sm" onClick={closeMobileMenu}></div>
      )}

      {/* Sidebar */}
      <aside className={`w-64 bg-[#0A1128] border-r border-slate-800/80 text-white flex-col fixed md:sticky top-0 h-screen z-20 transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} flex`}>
        <div className="p-6 hidden md:block border-b border-slate-800/40">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-white hover:text-amber-400 transition-colors">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden bg-white/10 border border-white/20 shadow-lg shadow-amber-500/10">
              <img src="https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=100&q=80" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span className="bg-gradient-to-r from-white via-slate-200 to-amber-300 bg-clip-text text-transparent">Admin Portal</span>
          </Link>
        </div>
        
        {/* Mobile close button inside sidebar */}
        <div className="p-4 flex justify-end md:hidden">
            <button onClick={closeMobileMenu} className="p-2 text-slate-400 hover:text-white">
                <X className="w-6 h-6" />
            </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const isExactMatch = link.path === '/admin' ? location.pathname === '/admin' : location.pathname.startsWith(link.path);

            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={closeMobileMenu}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${isExactMatch ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-[#050A18] font-bold shadow-lg shadow-amber-500/20' : 'text-slate-300 hover:bg-white/[0.04] hover:text-white'}`}
              >
                <link.icon className="w-4.5 h-4.5" />
                <span className="text-sm">{link.name}</span>
              </Link>
            );
          })}
        </nav>
        
        {/* Sidebar Footer Operations */}
        <div className="p-4 border-t border-slate-800/80 space-y-1.5">
          <Link to="/" className="flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white w-full rounded-lg transition-colors hover:bg-white/[0.04]">
            <ExternalLink className="w-4.5 h-4.5" />
            <span className="text-sm">View Website</span>
          </Link>
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-3 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 w-full rounded-lg transition-colors text-left"
          >
            <LogOut className="w-4.5 h-4.5" />
            <span className="text-sm font-semibold">Log Out</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 p-3 sm:p-5 md:p-8 overflow-y-auto w-full md:w-auto min-h-screen bg-gradient-to-b from-[#050A18] to-[#0A1128]">
        <div className="w-full max-w-none">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
