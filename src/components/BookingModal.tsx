import { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { User, Mail, X, Check, Loader2, Phone } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName?: string;
}

export default function BookingModal({ isOpen, onClose, planName = "Starter Plan" }: BookingModalProps) {
  const { settings } = useSettings();
  const [formData, setFormData] = useState({
    client: '',
    email: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await addDoc(collection(db, 'bookings'), {
        client: formData.client,
        email: formData.email,
        phone: formData.phone,
        planName: planName,
        status: 'Pending',
        createdAt: serverTimestamp(),
      });
      
      if (settings.googleSheetsWebhookUrl) {
        try {
          await fetch(settings.googleSheetsWebhookUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              timestamp: new Date().toISOString(),
              type: 'Booking',
              name: formData.client,
              email: formData.email,
              phone: formData.phone,
              service: planName
            })
          });
        } catch (webhookErr) {
          console.warn("Webhook submission failed:", webhookErr);
        }
      }

      setSubmitStatus('success');
      setTimeout(() => {
        onClose();
        setFormData({
          client: '',
          email: '',
          phone: '',
        });
        setSubmitStatus('idle');
      }, 3000);
    } catch (err) {
      console.error("Error creating booking:", err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#0A1128] border border-slate-800 rounded-3xl p-8 shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-1.5 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-full transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {submitStatus === 'success' ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/20">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Consultation Booked!</h3>
            <p className="text-slate-400 max-w-sm mx-auto">
              Your meeting request for <span className="text-amber-400 font-semibold">{planName}</span> is registered. We will reach out shortly to confirm the slot!
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-xs text-amber-500 font-semibold tracking-wider uppercase">Secure Booking</span>
              <h3 className="text-2xl font-bold text-white mt-1">Book Consultation</h3>
              <p className="text-slate-400 text-sm mt-1">
                Schedule a briefing or consultation session for <span className="text-amber-400 font-medium">{planName}</span>.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-[#050A18] border border-slate-800 text-white rounded-xl focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors placeholder:text-slate-500 text-sm"
                    placeholder="Enter your name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-[#050A18] border border-slate-800 text-white rounded-xl focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors placeholder:text-slate-500 text-sm"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-[#050A18] border border-slate-800 text-white rounded-xl focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors placeholder:text-slate-500 text-sm"
                      placeholder="e.g. 9876543210"
                    />
                  </div>
                </div>
              </div>

              {submitStatus === 'error' && (
                <p className="text-red-400 text-xs text-center">Failed to reserve booking. Please try again.</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 mt-2 bg-amber-400 hover:bg-amber-500 disabled:bg-slate-800 text-slate-900 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-amber-400/10"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Reserving...
                  </>
                ) : (
                  "Confirm Appointment Slot"
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
