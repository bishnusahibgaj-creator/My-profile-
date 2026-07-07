import { useState } from 'react';
import { Bot, Search, Loader2, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import Markdown from 'react-markdown';

export default function AIStrategist() {
  const [activeTab, setActiveTab] = useState<'strategy' | 'seo'>('strategy');
  
  // Strategy State
  const [projectDetails, setProjectDetails] = useState('');
  const [strategyResult, setStrategyResult] = useState('');
  const [isStrategizing, setIsStrategizing] = useState(false);

  // SEO State
  const [industry, setIndustry] = useState('');
  const [location, setLocation] = useState('');
  const [seoResult, setSeoResult] = useState('');
  const [seoSources, setSeoSources] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleStrategySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectDetails) return;
    setIsStrategizing(true);
    setStrategyResult('');
    
    try {
      const res = await fetch('/api/strategize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectDetails })
      });
      const data = await res.json();
      if (data.result) setStrategyResult(data.result);
      else setStrategyResult('Failed to generate strategy.');
    } catch (error) {
      setStrategyResult('An error occurred. Please try again.');
    } finally {
      setIsStrategizing(false);
    }
  };

  const handleSeoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!industry || !location) return;
    setIsAnalyzing(true);
    setSeoResult('');
    setSeoSources([]);
    
    try {
      const res = await fetch('/api/seo-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ industry, location })
      });
      const data = await res.json();
      if (data.result) {
        setSeoResult(data.result);
        if (data.sources) setSeoSources(data.sources);
      } else {
        setSeoResult('Failed to analyze SEO.');
      }
    } catch (error) {
      setSeoResult('An error occurred. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <section id="ai-strategist" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" /> Powered by Google Gemini
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Interactive AI Consultant
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Not sure what services you need? Let our AI strategize your project or analyze your local SEO competition instantly.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden flex flex-col md:flex-row min-h-[500px]">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-slate-50 p-6 flex flex-col gap-4 border-r border-slate-100 shrink-0">
            <button
              onClick={() => setActiveTab('strategy')}
              className={`flex items-center gap-3 w-full text-left p-3 rounded-xl transition-colors ${
                activeTab === 'strategy' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Bot className="w-5 h-5" />
              <span className="font-medium">Project Strategist</span>
            </button>
            <button
              onClick={() => setActiveTab('seo')}
              className={`flex items-center gap-3 w-full text-left p-3 rounded-xl transition-colors ${
                activeTab === 'seo' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Search className="w-5 h-5" />
              <span className="font-medium">Local SEO Analyzer</span>
            </button>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 p-6 md:p-10">
            {activeTab === 'strategy' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Build Your Project Plan</h3>
                <p className="text-sm text-slate-500 mb-6">Describe your business goals and current situation, and our high-thinking AI will draft a customized service proposal.</p>
                
                <form onSubmit={handleStrategySubmit} className="mb-6 flex gap-2">
                  <input 
                    type="text" 
                    placeholder="E.g., I need a new website for my plumbing business to get more calls..."
                    className="flex-1 px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={projectDetails}
                    onChange={(e) => setProjectDetails(e.target.value)}
                    required
                  />
                  <button 
                    type="submit" 
                    disabled={isStrategizing}
                    className="px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 disabled:opacity-70 flex items-center gap-2"
                  >
                    {isStrategizing ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Strategize'}
                  </button>
                </form>

                <div className="flex-1 bg-slate-50 rounded-xl p-6 border border-slate-100 overflow-y-auto min-h-[200px]">
                  {isStrategizing ? (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4">
                      <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
                      <p>Analyzing requirements and formulating strategy...</p>
                    </div>
                  ) : strategyResult ? (
                    <div className="prose prose-sm md:prose-base prose-indigo max-w-none text-slate-700">
                      <Markdown>{strategyResult}</Markdown>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-400">
                      Submit your project details to see the magic.
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'seo' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Live Local SEO Research</h3>
                <p className="text-sm text-slate-500 mb-6">Our AI searches the live web to analyze local competition and give you actionable SEO tips.</p>
                
                <form onSubmit={handleSeoSubmit} className="mb-6 flex flex-col sm:flex-row gap-2">
                  <input 
                    type="text" 
                    placeholder="Industry (e.g., Dentist)"
                    className="flex-1 px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    required
                  />
                  <input 
                    type="text" 
                    placeholder="Location (e.g., Chicago, IL)"
                    className="flex-1 px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                  <button 
                    type="submit" 
                    disabled={isAnalyzing}
                    className="px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {isAnalyzing ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Analyze'}
                  </button>
                </form>

                <div className="flex-1 bg-slate-50 rounded-xl p-6 border border-slate-100 overflow-y-auto min-h-[200px] flex flex-col">
                  {isAnalyzing ? (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4 my-auto">
                      <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
                      <p>Searching the web and analyzing local trends...</p>
                    </div>
                  ) : seoResult ? (
                    <>
                      <div className="prose prose-sm md:prose-base prose-indigo max-w-none text-slate-700">
                        <Markdown>{seoResult}</Markdown>
                      </div>
                      {seoSources.length > 0 && (
                        <div className="mt-6 pt-4 border-t border-slate-200">
                          <h4 className="text-sm font-semibold text-slate-900 mb-2">Sources Consulted:</h4>
                          <ul className="text-xs text-slate-500 space-y-1">
                            {seoSources.map((src, i) => (
                              <li key={i}>• {src}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-400 my-auto">
                      Enter your industry and location to begin.
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
