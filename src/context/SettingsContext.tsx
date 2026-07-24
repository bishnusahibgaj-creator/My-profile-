import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { db } from '../firebase';
import { doc, getDoc, collection, addDoc, setDoc, serverTimestamp } from 'firebase/firestore';

interface Settings {
  websiteName: string;
  contactEmail: string;
  whatsappNumber: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroImages: string[];
  showPricing?: boolean;
  googleSheetsWebhookUrl?: string;
}

interface SettingsContextType {
  settings: Settings;
  loading: boolean;
}

const defaultSettings: Settings = {
  websiteName: 'Website Building',
  contactEmail: 'info@websitebuilding.com',
  whatsappNumber: '911234567890',
  heroHeadline: 'Grow Your Business \\nwith Professional \\n<span class="text-amber-400">Digital Services</span>',
  heroSubheadline: 'We provide Website Development, SEO, Ads, and complete digital solutions to grow your business online.',
  heroImages: [
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop'
  ],
  showPricing: true,
  googleSheetsWebhookUrl: ''
};

const SettingsContext = createContext<SettingsContextType>({
  settings: defaultSettings,
  loading: true,
});

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSettings() {
      // 1. Fetch general settings
      try {
        const docRef = doc(db, 'settings', 'general');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const fetchedSettings = docSnap.data();
          if (fetchedSettings.websiteName === 'BizGrow Digital') {
            fetchedSettings.websiteName = 'Website Building';
            // update in firestore
            await setDoc(docRef, { websiteName: 'Website Building' }, { merge: true });
          }
          setSettings({ ...defaultSettings, ...fetchedSettings });
        }
      } catch (error) {
        console.warn("Offline or failed to fetch general settings, using default local settings:", error);
      }

      // 2. Run seeding of default demos & features if never seeded before
      try {
        const seedingRef = doc(db, 'settings', 'seeding');
        const seedingSnap = await getDoc(seedingRef);
        if (!seedingSnap.exists()) {
          // Seed features collection
          const featuresColl = collection(db, 'features');
          const defaultFeatures = [
            {
              title: 'Mobile First Design',
              description: 'Flawless experience across all devices.',
              imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop',
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            },
            {
              title: 'Advanced SEO',
              description: 'Built-in architecture for search engine dominance.',
              imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            },
            {
              title: 'Performance Optimized',
              description: 'Lightning fast load times for better conversions.',
              imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            },
            {
              title: 'Conversion Tracking',
              description: 'Data-driven insights to measure your success.',
              imageUrl: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=2070&auto=format&fit=crop',
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            }
          ];

          for (const feat of defaultFeatures) {
            await addDoc(featuresColl, feat);
          }

          // Seed demos collection
          const demosColl = collection(db, 'demos');
          const defaultDemos = [
            {
              projectName: 'Restaurant Website',
              category: 'Food & Restaurant',
              shortDescription: 'A complete restaurant website with menu and booking.',
              thumbnailUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop',
              demoUrl: '#',
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            },
            {
              projectName: 'Coaching Website',
              category: 'Education',
              shortDescription: 'Platform for coaching institutes to sell courses.',
              thumbnailUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop',
              demoUrl: '#',
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            },
            {
              projectName: 'Hospital Website',
              category: 'Healthcare',
              shortDescription: 'Professional website for hospitals and clinics.',
              thumbnailUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop',
              demoUrl: '#',
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            },
            {
              projectName: 'Ecommerce Website',
              category: 'Ecommerce',
              shortDescription: 'Fully functional online store setup.',
              thumbnailUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop',
              demoUrl: '#',
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            }
          ];

          for (const dem of defaultDemos) {
            await addDoc(demosColl, dem);
          }

          // Set seeding flag in Firestore
          await setDoc(seedingRef, { seeded: true, timestamp: serverTimestamp() });
        }
      } catch (error) {
        console.warn("Offline or failed to seed features & demos (will use local fallbacks):", error);
      }

      // 3. Run seeding of default FAQs if never seeded before
      try {
        const faqSeedingRef = doc(db, 'settings', 'faqSeeding');
        const faqSeedingSnap = await getDoc(faqSeedingRef);
        if (!faqSeedingSnap.exists()) {
          const faqsColl = collection(db, 'faqs');
          const defaultFaqs = [
            {
              question: "What services does Website Building offer?",
              answer: "We specialize in high-converting Website Development, Search Engine Optimization (SEO), and targeted Google/Meta Ads campaigns designed to scale your business.",
              order: 1,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            },
            {
              question: "How long does it take to build a website?",
              answer: "Typically, a professional business website takes 2-4 weeks from design inception to final launch, depending on the complexity and content requirements.",
              order: 2,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            },
            {
              question: "Do you provide maintenance and support?",
              answer: "Yes, we offer monthly maintenance and optimization support packages to keep your website fast, secure, and up to date.",
              order: 3,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            },
            {
              question: "How do you help our business rank higher on Google?",
              answer: "Our built-in advanced SEO architecture optimizes your site's structure, keywords, and performance to ensure maximum visibility and organic lead generation.",
              order: 4,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            }
          ];

          for (const faq of defaultFaqs) {
            await addDoc(faqsColl, faq);
          }

          await setDoc(faqSeedingRef, { seeded: true, timestamp: serverTimestamp() });
        }
      } catch (error) {
        console.warn("Offline or failed to seed FAQs (will use local fallbacks):", error);
      }

      // 4. Run seeding of default services if never seeded before
      try {
        const servicesSeedingRef = doc(db, 'settings', 'servicesSeeding');
        const servicesSeedingSnap = await getDoc(servicesSeedingRef);
        if (!servicesSeedingSnap.exists()) {
          const servicesColl = collection(db, 'services');
          const defaultServices = [
            {
              name: "Website Development",
              category: "Development",
              price: "$499 onwards",
              description: "Custom websites that are fast, responsive and SEO friendly.",
              icon: "code",
              status: "Active",
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            },
            {
              name: "Website Rebuilding",
              category: "Development",
              price: "$299 onwards",
              description: "Redesign your old website with modern look & better performance.",
              icon: "refresh",
              status: "Active",
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            },
            {
              name: "Landing Page Design",
              category: "Design",
              price: "$199 onwards",
              description: "High converting landing pages for your business or campaign.",
              icon: "layout",
              status: "Active",
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            },
            {
              name: "Google SEO",
              category: "Marketing",
              price: "$299/mo",
              description: "Rank your website on Google and get more organic traffic.",
              icon: "search",
              status: "Active",
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            },
            {
              name: "Local SEO",
              category: "Marketing",
              price: "$149/mo",
              description: "Improve your local ranking and get more customers in your area.",
              icon: "map",
              status: "Active",
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            }
          ];

          for (const s of defaultServices) {
            await addDoc(servicesColl, s);
          }

          await setDoc(servicesSeedingRef, { seeded: true, timestamp: serverTimestamp() });
        }
      } catch (error) {
        console.warn("Offline or failed to seed services (will use local fallbacks):", error);
      }

      // 5. Run seeding of default pricing plans if never seeded before
      try {
        const pricingSeedingRef = doc(db, 'settings', 'pricingSeeding');
        const pricingSeedingSnap = await getDoc(pricingSeedingRef);
        if (!pricingSeedingSnap.exists()) {
          const pricingColl = collection(db, 'pricing');
          const defaultPricing = [
            {
              plan: "Starter Plan",
              price: "₹9,999",
              billing: "Monthly",
              status: "Active",
              features: "Single Landing Page\nBasic SEO Setup\nContact Form Integration\n1 Month Free Support",
              isPopular: "No",
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            },
            {
              plan: "Growth Business Plan",
              price: "₹24,999",
              billing: "Monthly",
              status: "Active",
              features: "Up to 5 Pages Responsive Website\nAdvanced SEO Architecture\nGoogle Business Profile Setup\nSocial Media Integration\n3 Months Maintenance",
              isPopular: "Yes",
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            },
            {
              plan: "Enterprise Suite",
              price: "₹49,999",
              billing: "Monthly",
              status: "Active",
              features: "Full Custom Web Application\nComplete Local & National SEO\nGoogle & Meta Ads Setup\nDedicated Account Manager\nPriority 24/7 Support\n1 Year Maintenance",
              isPopular: "No",
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            }
          ];

          for (const p of defaultPricing) {
            await addDoc(pricingColl, p);
          }

          await setDoc(pricingSeedingRef, { seeded: true, timestamp: serverTimestamp() });
        }
      } catch (error) {
        console.warn("Offline or failed to seed pricing (will use local fallbacks):", error);
      }

      // Mark settings loading as finished
      setLoading(false);
    }
    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  
  // Extract just the 10-digit number by stripping any non-digits and taking the last 10
  const cleanNumber = context.settings.whatsappNumber.replace(/\D/g, '').slice(-10);
  const displayNumber = cleanNumber.length === 10 ? `+91 ${cleanNumber.slice(0, 5)} ${cleanNumber.slice(5)}` : `+91 ${cleanNumber}`;
  const linkNumber = cleanNumber.length === 10 ? `91${cleanNumber}` : `91${cleanNumber}`;
  
  return {
    ...context,
    displayNumber,
    linkNumber,
    cleanNumber
  };
}
