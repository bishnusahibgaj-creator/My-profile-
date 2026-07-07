import { useState, useEffect } from 'react';
import { Users, FileText, Briefcase, Calendar } from 'lucide-react';
import { db } from '../firebase';
import { collection, query, orderBy, limit, getDocs, getCountFromServer } from 'firebase/firestore';

export default function AdminDashboard() {
  const [stats, setStats] = useState([
    { name: 'Total Leads', value: '0', icon: Users, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
    { name: 'Demo Projects', value: '0', icon: FileText, color: 'text-green-400 bg-green-500/10 border-green-500/20' },
    { name: 'Active Services', value: '0', icon: Briefcase, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
    { name: 'Bookings', value: '0', icon: Calendar, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
  ]);
  const [recentLeads, setRecentLeads] = useState<any[]>([]);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const [leadsCount, demosCount, servicesCount, bookingsCount] = await Promise.all([
          getCountFromServer(collection(db, 'contacts')),
          getCountFromServer(collection(db, 'demos')),
          getCountFromServer(collection(db, 'services')),
          getCountFromServer(collection(db, 'bookings')),
        ]);

        setStats([
          { name: 'Total Leads', value: leadsCount.data().count.toString(), icon: Users, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]' },
          { name: 'Demo Projects', value: demosCount.data().count.toString(), icon: FileText, color: 'text-green-400 bg-green-500/10 border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.1)]' },
          { name: 'Active Services', value: servicesCount.data().count.toString(), icon: Briefcase, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.1)]' },
          { name: 'Bookings', value: bookingsCount.data().count.toString(), icon: Calendar, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.1)]' },
        ]);

        // Fetch recent leads
        const leadsQuery = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'), limit(5));
        const leadsSnapshot = await getDocs(leadsQuery);
        const leadsData = leadsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate().toLocaleDateString() || 'N/A'
        }));
        setRecentLeads(leadsData);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
        
        // Fallback for leads if index fails
        try {
          const leadsQuery = query(collection(db, 'contacts'), limit(5));
          const leadsSnapshot = await getDocs(leadsQuery);
          const leadsData = leadsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate ? doc.data().createdAt.toDate().toLocaleDateString() : 'N/A'
          }));
          setRecentLeads(leadsData);
        } catch (e2) {}
      }
    }
    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-6 w-full max-w-full">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white bg-gradient-to-r from-white via-slate-200 to-amber-300 bg-clip-text text-transparent">
          Dashboard Overview
        </h1>
        <p className="text-sm text-slate-400 mt-1">Real-time health of your digital marketing systems.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-[#0A1128]/70 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-800/80 hover:border-amber-400/30 transition-all duration-300 flex items-center gap-4 group shadow-xl">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 ${stat.color} group-hover:scale-105`}>
              <stat.icon className="w-5.5 h-5.5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium tracking-wide uppercase">{stat.name}</p>
              <p className="text-2xl font-black text-white mt-1 group-hover:text-amber-400 transition-colors">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#0A1128]/70 backdrop-blur-md rounded-2xl border border-slate-800/80 p-4 sm:p-6 shadow-xl overflow-hidden w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-amber-400 rounded-full animate-pulse inline-block"></span>
            Recent Leads & Submissions
          </h2>
        </div>
        <div className="overflow-x-auto -mx-4 sm:-mx-6">
          <div className="inline-block min-w-full align-middle px-4 sm:px-6">
            <table className="min-w-full divide-y divide-slate-800 text-left">
              <thead>
                <tr className="text-xs text-slate-400 uppercase tracking-wider">
                  <th className="pb-3 font-semibold">Name</th>
                  <th className="pb-3 font-semibold">Email</th>
                  <th className="pb-3 font-semibold">Service</th>
                  <th className="pb-3 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-800/50">
                {recentLeads.map(lead => (
                  <tr key={lead.id} className="hover:bg-slate-800/20 transition-colors">
                    <td className="py-3 font-medium text-white">{lead.name}</td>
                    <td className="py-3 text-slate-300 text-xs sm:text-sm max-w-[150px] sm:max-w-none truncate">{lead.email}</td>
                    <td className="py-3 text-slate-300">
                      <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-400/10 text-amber-300 border border-amber-400/20">
                        {lead.service || 'General Query'}
                      </span>
                    </td>
                    <td className="py-3 text-slate-400 text-xs">{lead.createdAt}</td>
                  </tr>
                ))}
                {recentLeads.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-6 text-slate-400 text-center">No recent leads found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

