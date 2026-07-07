import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { db } from '../firebase';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';

const defaultFeatures = [
  {
    title: 'Mobile First Design',
    description: 'Flawless experience across all devices.',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop'
  },
  {
    title: 'Advanced SEO',
    description: 'Built-in architecture for search engine dominance.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop'
  },
  {
    title: 'Performance Optimized',
    description: 'Lightning fast load times for better conversions.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop'
  },
  {
    title: 'Conversion Tracking',
    description: 'Data-driven insights to measure your success.',
    imageUrl: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=2070&auto=format&fit=crop'
  }
];

export default function FeatureImages() {
  const [features, setFeatures] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatures() {
      try {
        const q = query(collection(db, 'features'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetchedFeatures = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any[];
        
        // Filter out duplicates by title
        const uniqueFeatures: any[] = [];
        const seenFeatures = new Set();
        for (const feat of fetchedFeatures) {
          const title = (feat.title || '').trim().toLowerCase();
          if (title && !seenFeatures.has(title)) {
            seenFeatures.add(title);
            uniqueFeatures.push(feat);
          }
        }
        
        setFeatures(uniqueFeatures);
      } catch (error) {
        console.error("Error fetching features:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFeatures();
  }, []);

  if (loading && features.length === 0) {
    return (
      <section id="features" className="py-24 bg-[#0A1128] text-white relative text-center">
        <p className="text-slate-400">Loading features...</p>
      </section>
    );
  }

  return (
    <section id="features" className="py-24 bg-[#0A1128] text-white relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold text-amber-400 tracking-wider uppercase mb-2">Platform Features</h2>
          <h3 className="text-3xl font-bold tracking-tight sm:text-4xl">Built for Growth and Scale</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(features.length > 0 ? features : (loading ? [] : defaultFeatures)).map((feature, i) => (
            <motion.div
              key={feature.id || i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              className="group relative overflow-hidden rounded-2xl aspect-[16/9]"
            >
              <img 
                src={feature.imageUrl} 
                alt={feature.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/90 via-[#0A1128]/40 to-transparent flex flex-col justify-end p-8">
                <h4 className="text-2xl font-bold text-white mb-2">{feature.title}</h4>
                <p className="text-slate-300">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
