import { useState, useEffect } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { db } from '../firebase';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  order?: number;
}

const fallbackFaqs = [
  {
    id: 'f1',
    question: "What services does Website Building offer?",
    answer: "We specialize in high-converting Website Development, Search Engine Optimization (SEO), and targeted Google/Meta Ads campaigns designed to scale your business."
  },
  {
    id: 'f2',
    question: "How long does it take to build a website?",
    answer: "Typically, a professional business website takes 2-4 weeks from design inception to final launch, depending on the complexity and content requirements."
  },
  {
    id: 'f3',
    question: "Do you provide maintenance and support?",
    answer: "Yes, we offer monthly maintenance and optimization support packages to keep your website fast, secure, and up to date."
  },
  {
    id: 'f4',
    question: "How do you help our business rank higher on Google?",
    answer: "Our built-in advanced SEO architecture optimizes your site's structure, keywords, and performance to ensure maximum visibility and organic lead generation."
  }
];

export default function FaqSection() {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFaqs() {
      try {
        const q = query(collection(db, 'faqs'), orderBy('order', 'asc'));
        const querySnapshot = await getDocs(q);
        const fetched = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            question: data.question || '',
            answer: data.answer || '',
            order: data.order !== undefined ? Number(data.order) : 0
          };
        });
        
        setFaqs(fetched);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchFaqs();
  }, []);

  const toggleFaq = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 bg-[#050A18] relative overflow-hidden border-t border-slate-900">
      {/* Background Ornaments */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest mb-4"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-4"
          >
            Frequently Asked Questions
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto"
          >
            Everything you need to know about working with us, our development processes, and our specialized digital marketing services.
          </motion.p>
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-4">
          {(faqs.length > 0 ? faqs : (loading ? [] : fallbackFaqs)).map((faq, index) => {
            const isOpen = openIndex === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen 
                    ? 'border-amber-500/30 bg-[#0A1128] shadow-lg shadow-amber-500/5' 
                    : 'border-slate-800/60 bg-[#0A1128]/40 hover:bg-[#0A1128]/70 hover:border-slate-700'
                }`}
                id={`faq-item-${faq.id}`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-bold text-white group"
                  aria-expanded={isOpen}
                  id={`faq-btn-${faq.id}`}
                >
                  <span className="text-base sm:text-lg tracking-tight group-hover:text-amber-400 transition-colors">
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400 group-hover:text-white transition-all ${isOpen ? 'rotate-180 border-amber-500/20 text-amber-400 bg-amber-500/10' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 text-sm sm:text-base text-slate-300 leading-relaxed border-t border-slate-800/40 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
