import { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { DemoProject } from '../types';
import { db } from '../firebase';
import { collection, query, getDocs, orderBy, limit } from 'firebase/firestore';

const defaultDemos: DemoProject[] = [
  {
    id: '1',
    projectName: 'Restaurant Website',
    category: 'Food & Restaurant',
    shortDescription: 'A complete restaurant website with menu and booking.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop',
    demoUrl: '#',
  },
  {
    id: '2',
    projectName: 'Coaching Website',
    category: 'Education',
    shortDescription: 'Platform for coaching institutes to sell courses.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop',
    demoUrl: '#',
  },
  {
    id: '3',
    projectName: 'Hospital Website',
    category: 'Healthcare',
    shortDescription: 'Professional website for hospitals and clinics.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop',
    demoUrl: '#',
  },
  {
    id: '4',
    projectName: 'Ecommerce Website',
    category: 'Ecommerce',
    shortDescription: 'Fully functional online store setup.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop',
    demoUrl: '#',
  },
];

export default function DemoProjects({ showAll = false }: { showAll?: boolean }) {
  const [demos, setDemos] = useState<DemoProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDemos() {
      try {
        let q = query(collection(db, 'demos'), orderBy('createdAt', 'desc'));
        if (!showAll) {
          q = query(collection(db, 'demos'), orderBy('createdAt', 'desc'), limit(4));
        }
        const querySnapshot = await getDocs(q);
        const fetchedDemos = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as DemoProject[];
        
        // Filter out duplicates by projectName
        const uniqueDemos: DemoProject[] = [];
        const seenDemos = new Set();
        for (const dem of fetchedDemos) {
          const name = (dem.projectName || '').trim().toLowerCase();
          if (name && !seenDemos.has(name)) {
            seenDemos.add(name);
            uniqueDemos.push(dem);
          }
        }
        
        setDemos(uniqueDemos);
      } catch (error) {
        console.error("Error fetching demos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDemos();
  }, [showAll]);

  if (loading && demos.length === 0) {
    return (
      <section id="demos" className="py-24 bg-[#050A18]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center text-white">
          <p className="text-slate-400">Loading demos...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="demos" className="py-24 bg-[#050A18]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold text-amber-500 tracking-wider uppercase mb-2">Our Demo Projects</h2>
          <h3 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">See Our Work in Action</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {(demos.length > 0 ? demos : (loading ? [] : (showAll ? defaultDemos : defaultDemos.slice(0, 4)))).map((demo, i) => (
            <motion.div
              key={demo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-[#0A1128] rounded-2xl overflow-hidden border border-slate-800 transition-all hover:border-amber-500/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.1)] group flex flex-col"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img 
                  src={demo.thumbnailUrl} 
                  alt={demo.projectName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 bg-slate-800"
                />
                <div className="absolute inset-0 bg-[#0A1128]/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <a href={demo.demoUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-amber-400 text-slate-900 rounded-lg font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all">
                    Preview Demo <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
              <div className="p-6 text-center flex-1 flex flex-col">
                <h4 className="text-lg font-bold text-white mb-1">{demo.projectName}</h4>
                <p className="text-sm text-slate-400 font-medium mb-3">{demo.category}</p>
                <div className="mt-auto pt-4">
                  <a href={demo.demoUrl} target="_blank" rel="noopener noreferrer" className="block w-full py-2.5 border border-slate-700 rounded-lg text-slate-300 font-medium hover:bg-slate-800 hover:text-white transition-colors text-center">
                    Preview Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {!showAll && (
          <div className="mt-12 text-center">
            <Link to="/demos" className="inline-block px-8 py-3.5 bg-amber-400 text-slate-900 rounded-lg font-bold hover:bg-amber-500 transition-colors">
              View More Demos &rarr;
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
