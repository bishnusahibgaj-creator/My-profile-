import { useState, useEffect } from 'react';
import { X, Send, Loader2, Phone, Mail, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useSettings } from '../context/SettingsContext';

export default function PopupContactForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', service: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { settings } = useSettings();

  useEffect(() => {
    // Check if the user has already closed or submitted the popup in this session
    const hasSeenPopup = sessionStorage.getItem('hasSeenContactPopup');
    if (hasSeenPopup) return;

    // Show popup after 5 seconds of visit
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('hasSeenContactPopup', 'true');
  };

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
      
      // Auto close after 3 seconds on success
      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (error) {
      console.error('Error submitting popup contact form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-lg bg-[#0A1128] border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]"
          >
            {/* Top Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-1.5 hover:bg-white/5 rounded-full z-20"
              aria-label="Close form"
              id="close-popup-btn"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content Container */}
            <div className="p-6 sm:p-8 overflow-y-auto">
              {submitStatus === 'success' ? (
                <div className="py-12 text-center flex flex-col items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="w-16 h-16 bg-green-500/10 text-green-400 rounded-full flex items-center justify-center mb-6 border border-green-500/20"
                  >
                    <CheckCircle className="w-8 h-8" />
                  </motion.div>
                  <h3 className="text-2xl font-extrabold text-white mb-3">Thank You!</h3>
                  <p className="text-slate-300 text-sm max-w-sm">
                    Your request has been successfully submitted. Our marketing specialist will call/WhatsApp you shortly.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-500">EXCLUSIVE OFFER</span>
                    <h3 className="text-xl sm:text-2xl font-black mt-1 text-white bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                      Get Free Business Consultation
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1.5">
                      Enter your details below and our expert strategist will analyze your online presence for free.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Your Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#050A18] border border-slate-800 text-white rounded-xl focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors text-sm placeholder:text-slate-600"
                        placeholder="John Doe"
                        id="popup-name-input"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Phone Number</label>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-800 bg-slate-900 text-slate-400 text-xs font-medium">
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
                            className="w-full px-4 py-2.5 bg-[#050A18] border border-slate-800 text-white rounded-r-xl focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors text-sm placeholder:text-slate-600"
                            placeholder="9876543210"
                            id="popup-phone-input"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Address</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-2.5 bg-[#050A18] border border-slate-800 text-white rounded-xl focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors text-sm placeholder:text-slate-600"
                          placeholder="johndoe@gmail.com"
                          id="popup-email-input"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Required Service</label>
                      <select
                        required
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#050A18] border border-slate-800 text-white rounded-xl focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors text-sm appearance-none cursor-pointer"
                        id="popup-service-select"
                      >
                        <option value="" disabled className="text-slate-500">Select Service</option>
                        <option value="Website Development">Website Development</option>
                        <option value="SEO">SEO</option>
                        <option value="Ads">Ads</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Message</label>
                      <textarea
                        required
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#050A18] border border-slate-800 text-white rounded-xl focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors text-sm placeholder:text-slate-600 resize-none"
                        placeholder="Tell us briefly about your business requirement..."
                        id="popup-message-textarea"
                      />
                    </div>

                    {submitStatus === 'error' && (
                      <p className="text-xs text-red-400 font-medium">
                        Failed to submit. Please check your internet and try again.
                      </p>
                    )}

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 disabled:opacity-50 text-[#050A18] text-sm font-black rounded-xl transition-all shadow-lg shadow-amber-500/15 flex items-center justify-center gap-2"
                        id="popup-submit-btn"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Submitting Request...</span>
                          </>
                        ) : (
                          <>
                            <span>Request Free Consultation</span>
                            <Send className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
