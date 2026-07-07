import { useLocation } from 'react-router-dom';

export default function AdminPlaceholder() {
  const location = useLocation();
  const pathName = location.pathname.split('/').pop();
  const title = pathName ? pathName.charAt(0).toUpperCase() + pathName.slice(1).replace('-', ' ') : 'Page';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
        <p className="text-slate-500 mt-2">Manage your {title.toLowerCase()} settings here.</p>
      </div>
      <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">Coming Soon</h3>
        <p className="text-slate-500 max-w-md mx-auto">
          The {title} module is currently under development. Check back later for updates.
        </p>
      </div>
    </div>
  );
}
