import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const pages = [
  { path: '/', name: 'Home' },
  { path: '/services', name: 'Services' },
  { path: '/demos', name: 'Demos & Portfolio' },
  { path: '/about', name: 'About Us' },
  { path: '/contact', name: 'Contact' },
  { path: '/privacy-policy', name: 'Privacy Policy' },
  { path: '/terms-conditions', name: 'Terms & Conditions' },
  { path: '/refund-policy', name: 'Refund Policy' },
];

export default function SitemapPage() {
  return (
    <div className="pt-32 pb-24 bg-[#050A18] text-slate-300 min-h-screen">
      <SEO 
        title="Sitemap - All Pages"
        description="View all pages and URLs available on BizGrow Digital."
      />
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Sitemap</h1>
        <p className="text-lg text-slate-400 mb-12">
          A complete list of all pages and URLs on our website.
        </p>

        <div className="bg-[#0A1128] rounded-3xl p-8 border border-slate-800">
          <ul className="space-y-4">
            {pages.map((page) => (
              <li key={page.path} className="flex items-center gap-4 border-b border-slate-800 pb-4 last:border-0 last:pb-0">
                <Link 
                  to={page.path} 
                  className="text-amber-400 hover:text-amber-300 transition-colors font-medium text-lg w-48"
                >
                  {page.name}
                </Link>
                <code className="text-slate-500 bg-slate-900 px-3 py-1 rounded-lg text-sm flex-1 break-all">
                  {window.location.origin}{page.path}
                </code>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
