import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    websiteName: 'BizGrow Digital',
    contactEmail: 'info@digitalgrowth.com',
    whatsappNumber: '911234567890',
    heroHeadline: 'Grow Your Business \\nwith Professional \\n<span class="text-amber-400">Digital Services</span>',
    heroSubheadline: 'We provide Website Development, SEO, Ads, and complete digital solutions to grow your business online.',
    heroImages: [
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop'
    ],
    showPricing: true
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const docRef = doc(db, 'settings', 'general');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSettings(prev => ({ ...prev, ...docSnap.data() }));
        }
      } catch (error) {
        console.error("Error fetching settings", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaveStatus(null);
    try {
      await setDoc(doc(db, 'settings', 'general'), settings);
      setSaveStatus({ message: 'Settings saved successfully!', type: 'success' });
      setTimeout(() => setSaveStatus(null), 4000);
    } catch (error) {
      console.error("Error saving settings", error);
      setSaveStatus({ message: 'Failed to save settings. Please try again.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSettings(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleHeroImageChange = (index: number, value: string) => {
    const newImages = [...settings.heroImages];
    newImages[index] = value;
    setSettings(prev => ({ ...prev, heroImages: newImages }));
  };

  if (loading) return <div className="p-8 text-slate-400 text-sm">Loading settings...</div>;

  return (
    <div className="space-y-6 w-full max-w-full">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white bg-gradient-to-r from-white via-slate-200 to-amber-300 bg-clip-text text-transparent">
          Settings
        </h1>
        <p className="text-slate-400 mt-1 text-sm">Manage website settings, social accounts, and slide media configurations.</p>
      </div>

      {saveStatus && (
        <div className={`p-4 rounded-xl border text-sm font-medium transition-all ${
          saveStatus.type === 'success' 
            ? 'bg-green-500/10 text-green-400 border-green-500/20' 
            : 'bg-red-500/10 text-red-400 border-red-500/20'
        }`}>
          {saveStatus.message}
        </div>
      )}

      <div className="bg-[#0A1128]/70 backdrop-blur-md rounded-2xl border border-slate-800/80 overflow-hidden shadow-2xl w-full">
        <div className="p-4 sm:p-6 border-b border-slate-800/60 bg-[#0D1836]">
          <h2 className="text-lg font-bold text-white tracking-tight">General Settings</h2>
        </div>
        <div className="p-4 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Website Name</label>
              <input 
                type="text" 
                name="websiteName"
                value={settings.websiteName} 
                onChange={handleChange}
                className="w-full px-4 py-2 bg-[#050A18]/60 border border-slate-700/80 rounded-lg focus:ring-2 focus:ring-amber-500/50 focus:border-transparent outline-none text-white placeholder-slate-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Contact Email</label>
              <input 
                type="email" 
                name="contactEmail"
                value={settings.contactEmail} 
                onChange={handleChange}
                className="w-full px-4 py-2 bg-[#050A18]/60 border border-slate-700/80 rounded-lg focus:ring-2 focus:ring-amber-500/50 focus:border-transparent outline-none text-white placeholder-slate-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Admin Phone Number (WhatsApp)</label>
              <div className="flex">
                <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-slate-700/80 bg-slate-900/60 text-slate-400 text-sm">
                  +91
                </span>
                <input 
                  type="text" 
                  name="whatsappNumber"
                  value={settings.whatsappNumber.replace(/^\+?91/, '')} 
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    if (val.length <= 10) {
                      setSettings(prev => ({ ...prev, whatsappNumber: val }));
                    }
                  }}
                  className="w-full px-4 py-2 bg-[#050A18]/60 border border-slate-700/80 border-l-0 rounded-r-lg focus:ring-2 focus:ring-amber-500/50 focus:border-transparent outline-none text-white placeholder-slate-500" 
                  placeholder="10-digit number"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Feature Toggles</label>
              <label className="flex items-center gap-3 cursor-pointer select-none mt-3.5">
                <input 
                  type="checkbox" 
                  name="showPricing"
                  checked={settings.showPricing !== false} 
                  onChange={(e) => {
                    setSettings(prev => ({ ...prev, showPricing: e.target.checked }));
                  }}
                  className="w-5 h-5 rounded bg-[#050A18]/60 border-slate-700 text-amber-500 focus:ring-amber-500/50 cursor-pointer" 
                />
                <span className="text-sm text-slate-300 font-medium">Enable Pricing Page / Plan Tabs on Website</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#0A1128]/70 backdrop-blur-md rounded-2xl border border-slate-800/80 overflow-hidden shadow-2xl w-full">
        <div className="p-4 sm:p-6 border-b border-slate-800/60 bg-[#0D1836]">
          <h2 className="text-lg font-bold text-white tracking-tight">Hero Section Content</h2>
        </div>
        <div className="p-4 sm:p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Headline (Supports basic HTML like &lt;span class="text-amber-400"&gt; and &lt;br&gt;)</label>
            <textarea 
              name="heroHeadline"
              value={settings.heroHeadline} 
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 bg-[#050A18]/60 border border-slate-700/80 rounded-lg focus:ring-2 focus:ring-amber-500/50 focus:border-transparent outline-none text-white placeholder-slate-500 font-mono text-xs sm:text-sm" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Sub-headline</label>
            <textarea 
              name="heroSubheadline"
              value={settings.heroSubheadline} 
              onChange={handleChange}
              rows={2}
              className="w-full px-4 py-2 bg-[#050A18]/60 border border-slate-700/80 rounded-lg focus:ring-2 focus:ring-amber-500/50 focus:border-transparent outline-none text-white placeholder-slate-500 text-xs sm:text-sm" 
            />
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-300">Hero Slider Images (URLs)</label>
            {[0, 1, 2].map(index => (
              <div key={index} className="flex gap-4 items-center">
                <span className="text-sm font-medium text-slate-500 w-6">{index + 1}.</span>
                <input 
                  type="url" 
                  value={settings.heroImages[index] || ''} 
                  onChange={(e) => handleHeroImageChange(index, e.target.value)}
                  placeholder="https://..."
                  className="flex-1 px-4 py-2 bg-[#050A18]/60 border border-slate-700/80 rounded-lg focus:ring-2 focus:ring-amber-500/50 focus:border-transparent outline-none text-white placeholder-slate-500 text-xs sm:text-sm" 
                />
                {settings.heroImages[index] && (
                  <img src={settings.heroImages[index]} alt="" className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover border border-slate-800/80 shadow-inner" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#0A1128]/70 backdrop-blur-md rounded-2xl border border-slate-800/80 overflow-hidden shadow-2xl w-full">
        <div className="p-4 sm:p-6 flex justify-end">
          <button 
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-[#050A18] font-bold rounded-lg transition-all shadow-lg shadow-amber-500/10 text-sm disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

