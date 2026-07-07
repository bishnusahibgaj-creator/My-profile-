import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Send, Loader2, PhoneCall, Mail, MapPin } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useSettings } from '../context/SettingsContext';

export default function Contact() {
  const [searchParams] = useSearchParams();
  const planParam = searchParams.get('plan');

  const [formData, setFormData] = useState({ 
    name: '', 
    phone: '', 
    email: '', 
    service: '', 
    message: '' 
  });

  useEffect(() => {
    if (planParam) {
      setFormData(prev => ({
        ...prev,
        service: planParam,
        message: `Hi, I am interested in the ${planParam}. Please provide more details.`
      }));
    }
  }, [planParam]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { settings, displayNumber, linkNumber } = useSettings();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await addDoc(collection(db, 'contacts'), {
        ...formData,
        status: 'New',
        createdAt: serverTimestamp()
      });
      setSubmitStatus('success');
      
      setFormData({ name: '', phone: '', email: '', service: '', message: '' });
    } catch (error) {
      console.error(error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#0A1128] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="flex-1">
            <h2 className="text-sm font-semibold text-amber-500 tracking-wider uppercase mb-2">LET'S WORK TOGETHER</h2>
            <h3 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Ready to Grow Your Business?
            </h3>
            <p className="text-lg text-slate-300 mb-12">
              Get in touch with us today and take your business to the next level.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <PhoneCall className="w-6 h-6 text-amber-500 mt-1" />
                <div>
                  <h4 className="font-semibold text-sm">Call Us</h4>
                  <a href={`tel:+${linkNumber}`} className="text-slate-300 hover:text-white">{displayNumber}</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <WhatsAppIcon className="w-6 h-6 text-[#25D366] mt-1" />
                <div>
                  <h4 className="font-semibold text-sm">WhatsApp</h4>
                  <a href={`https://wa.me/${linkNumber}`} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white">{displayNumber}</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-amber-500 mt-1" />
                <div>
                  <h4 className="font-semibold text-sm">Email Us</h4>
                  <a href={`mailto:${settings.contactEmail}`} className="text-slate-300 hover:text-white">{settings.contactEmail}</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-amber-500 mt-1" />
                <div>
                  <h4 className="font-semibold text-sm">Location</h4>
                  <p className="text-slate-300">India</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full max-w-2xl">
            {submitStatus === 'success' ? (
              <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 text-center py-16">
                <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">Message Sent Successfully!</h3>
                <p className="text-slate-300">Thank you for reaching out. Our team will get back to you shortly.</p>
                <button 
                  onClick={() => setSubmitStatus('idle')}
                  className="mt-6 text-amber-400 hover:text-amber-300 transition-colors font-medium"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-[#050A18] border border-slate-800 text-white rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors placeholder:text-slate-500"
                    placeholder="Your Name"
                  />
                  <div className="flex">
                    <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-slate-800 bg-slate-800/50 text-slate-400 sm:text-sm">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        if (val.length <= 10) {
                          setFormData({ ...formData, phone: val });
                        }
                      }}
                      pattern="[0-9]{10}"
                      title="Please enter a 10-digit phone number"
                      className="w-full px-4 py-3 bg-[#050A18] border border-slate-800 text-white rounded-r-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors placeholder:text-slate-500"
                      placeholder="Phone Number"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <select
                    required
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 bg-[#050A18] border border-slate-800 text-white rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors appearance-none"
                  >
                    <option value="" disabled className="text-slate-500">Select Service</option>
                    {planParam && (
                      <option value={planParam}>{planParam}</option>
                    )}
                    <option value="Website Development">Website Development</option>
                    <option value="SEO">SEO</option>
                    <option value="Ads">Ads</option>
                    <option value="Other">Other</option>
                  </select>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-[#050A18] border border-slate-800 text-white rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors placeholder:text-slate-500"
                    placeholder="Email Address"
                  />
                </div>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-[#050A18] border border-slate-800 text-white rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors placeholder:text-slate-500 resize-none"
                  placeholder="Your Message"
                />
                
                {submitStatus === 'error' && (
                  <div className="text-red-400 text-sm">
                    Failed to send message. Please try again.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70 w-full sm:w-auto"
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Send Message'}
                  {!isSubmitting && <Send className="w-4 h-4 ml-1" />}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
