import { useState } from 'react';
import { Bot, Search, Loader2 } from 'lucide-react';
import Markdown from 'react-markdown';

export default function AdminAiTools() {
  const [industry, setIndustry] = useState('');
  const [location, setLocation] = useState('');
  const [seoResult, setSeoResult] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSeoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!industry || !location) return;
    setIsAnalyzing(true);
    setSeoResult('');
    
    try {
      const res = await fetch('/api/seo-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ industry, location })
      });
      const data = await res.json();
      if (data.result) {
        setSeoResult(data.result);
      }
    } catch {
      setSeoResult('An error occurred.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6 w-full max-w-full">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white bg-gradient-to-r from-white via-slate-200 to-amber-300 bg-clip-text text-transparent">
          AI Assistant Tools
        </h1>
        <p className="text-slate-400 mt-1 text-sm">Deploy high-performance AI engines to optimize local marketing strategies.</p>
      </div>
      
      <div className="bg-[#0A1128]/70 backdrop-blur-md rounded-2xl border border-slate-800/80 p-5 sm:p-6 shadow-2xl w-full">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.1)]">
            <Search className="w-5.5 h-5.5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">Local SEO Analyzer</h2>
            <p className="text-xs sm:text-sm text-slate-400">Uses Gemini Search Grounding to run competitor & keywords intelligence.</p>
          </div>
        </div>

        <form onSubmit={handleSeoSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="text" 
              placeholder="Industry (e.g., Dentist)"
              className="w-full px-4 py-3 bg-[#050A18]/60 border border-slate-700/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent text-sm text-white placeholder-slate-500"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              required
            />
            <input 
              type="text" 
              placeholder="Location (e.g., Chicago, IL)"
              className="w-full px-4 py-3 bg-[#050A18]/60 border border-slate-700/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent text-sm text-white placeholder-slate-500"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={isAnalyzing}
            className="px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 disabled:opacity-50 text-[#050A18] font-bold rounded-lg transition-all shadow-lg shadow-amber-500/15 flex items-center justify-center gap-2 w-full text-sm"
          >
            {isAnalyzing ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Analyze Local Market'}
          </button>
        </form>

        {seoResult && (
          <div className="mt-6 p-5 bg-[#050A18]/80 rounded-xl border border-slate-800/80 max-h-[50vh] overflow-y-auto">
            <div className="prose prose-invert prose-sm max-w-none text-slate-300 leading-relaxed">
              <Markdown>{seoResult}</Markdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
