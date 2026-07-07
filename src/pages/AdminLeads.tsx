import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, getDocs, limit, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import AdminGenericList from '../components/AdminGenericList';
import { PhoneCall, Users, Calendar } from 'lucide-react';

export default function AdminLeads() {
  const [activeTab, setActiveTab] = useState<'leads' | 'bookings'>('leads');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const collectionName = activeTab === 'leads' ? 'contacts' : 'bookings';
      const q = query(collection(db, collectionName), orderBy('createdAt', 'desc'), limit(50));
      const querySnapshot = await getDocs(q);
      const itemsData = querySnapshot.docs.map(doc => {
        const itemData = doc.data();
        return {
          id: doc.id,
          ...itemData,
          createdAt: itemData.createdAt?.toDate ? itemData.createdAt.toDate().toLocaleDateString() : 'N/A'
        };
      });
      setData(itemsData);
    } catch (error) {
      console.error(`Error fetching ${activeTab}:`, error);
      // Fallback
      try {
        const collectionName = activeTab === 'leads' ? 'contacts' : 'bookings';
        const q2 = query(collection(db, collectionName), limit(50));
        const qs2 = await getDocs(q2);
        const itemsData2 = qs2.docs.map(doc => {
          const itemData = doc.data();
          return {
            id: doc.id,
            ...itemData,
            createdAt: itemData.createdAt?.toDate ? itemData.createdAt.toDate().toLocaleDateString() : 'N/A'
          };
        });
        setData(itemsData2);
      } catch (e2) {}
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handleDelete = async (item: any) => {
    try {
      const collectionName = activeTab === 'leads' ? 'contacts' : 'bookings';
      await deleteDoc(doc(db, collectionName, item.id));
      fetchData();
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete. Please try again.");
    }
  };

  const handleBulkDelete = async (items: any[]) => {
    try {
      const collectionName = activeTab === 'leads' ? 'contacts' : 'bookings';
      for (const item of items) {
        await deleteDoc(doc(db, collectionName, item.id));
      }
      fetchData();
    } catch (error) {
      console.error("Error in bulk delete:", error);
      alert("Failed to delete some items. Please try again.");
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const collectionName = activeTab === 'leads' ? 'contacts' : 'bookings';
      await updateDoc(doc(db, collectionName, id), { status: newStatus });
      setData(data.map(item => item.id === id ? { ...item, status: newStatus } : item));
    } catch (error) {
      console.error('Error updating status', error);
      alert('Failed to update status');
    }
  };

  const leadsColumns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone', render: (val: any) => (
      <div className="flex items-center gap-2">
        <span className="text-slate-200">{val}</span>
        {val && (
          <a 
            href={`tel:${val}`} 
            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300 text-xs font-semibold rounded-full border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-200 shadow-sm shrink-0"
            title="Call Customer"
          >
            <PhoneCall className="w-3 h-3 text-emerald-400" />
            <span>Call</span>
          </a>
        )}
      </div>
    )},
    { key: 'service', label: 'Service/Plan' },
    { key: 'status', label: 'Status', render: (val: any, item: any) => (
      <select 
        value={val || 'New'} 
        onChange={(e) => handleStatusChange(item.id, e.target.value)}
        className={`text-xs px-2.5 py-1 rounded-full border outline-none bg-[#050A18] cursor-pointer transition-colors ${
          val === 'Converted' ? 'text-green-400 border-green-500/30 bg-green-500/5' :
          val === 'Lost' ? 'text-red-400 border-red-500/30 bg-red-500/5' :
          val === 'Contacted' ? 'text-blue-400 border-blue-500/30 bg-blue-500/5' :
          val === 'Follow Up' ? 'text-purple-400 border-purple-500/30 bg-purple-500/5' :
          val === 'In Progress' ? 'text-amber-400 border-amber-500/30 bg-amber-500/5' :
          val === 'Spam' ? 'text-slate-400 border-slate-700 bg-slate-800/40' :
          'text-slate-200 border-slate-700 bg-slate-800/40' // New
        }`}
      >
        <option value="New" className="bg-[#0A1128] text-white">New</option>
        <option value="Contacted" className="bg-[#0A1128] text-white">Contacted</option>
        <option value="Follow Up" className="bg-[#0A1128] text-white">Follow Up</option>
        <option value="In Progress" className="bg-[#0A1128] text-white">In Progress</option>
        <option value="Converted" className="bg-[#0A1128] text-white">Converted</option>
        <option value="Lost" className="bg-[#0A1128] text-white">Lost</option>
        <option value="Spam" className="bg-[#0A1128] text-white">Spam</option>
      </select>
    )},
    { key: 'createdAt', label: 'Date' },
  ];

  const bookingsColumns = [
    { key: 'client', label: 'Client Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone', render: (val: any) => (
      <div className="flex items-center gap-2">
        <span className="text-slate-200">{val}</span>
        {val && (
          <a 
            href={`tel:${val}`} 
            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300 text-xs font-semibold rounded-full border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-200 shadow-sm shrink-0"
            title="Call Customer"
          >
            <PhoneCall className="w-3 h-3 text-emerald-400" />
            <span>Call</span>
          </a>
        )}
      </div>
    )},
    { key: 'planName', label: 'Selected Plan' },
    { key: 'status', label: 'Status', render: (val: any, item: any) => (
      <select 
        value={val || 'Pending'} 
        onChange={(e) => handleStatusChange(item.id, e.target.value)}
        className={`text-xs px-2.5 py-1 rounded-full border outline-none bg-[#050A18] cursor-pointer transition-colors ${
          val === 'Confirmed' ? 'text-green-400 border-green-500/30 bg-green-500/5' :
          val === 'Cancelled' ? 'text-red-400 border-red-500/30 bg-red-500/5' :
          'text-amber-400 border-amber-500/30 bg-amber-500/5' // Pending
        }`}
      >
        <option value="Pending" className="bg-[#0A1128] text-white">Pending</option>
        <option value="Confirmed" className="bg-[#0A1128] text-white">Confirmed</option>
        <option value="Cancelled" className="bg-[#0A1128] text-white">Cancelled</option>
      </select>
    )},
    { key: 'createdAt', label: 'Date' },
  ];

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex items-center gap-2 bg-[#0A1128]/80 p-1 rounded-xl border border-slate-800 max-w-md">
        <button
          onClick={() => setActiveTab('leads')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-200 ${
            activeTab === 'leads'
              ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 font-bold shadow-md shadow-amber-500/10'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/30'
          }`}
        >
          <Users className="w-4 h-4" />
          Contact Leads
        </button>
        <button
          onClick={() => setActiveTab('bookings')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-200 ${
            activeTab === 'bookings'
              ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 font-bold shadow-md shadow-amber-500/10'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/30'
          }`}
        >
          <Calendar className="w-4 h-4" />
          Consultation Bookings
        </button>
      </div>

      {loading ? (
        <div className="p-8 text-slate-400 text-sm">Loading data...</div>
      ) : (
        <AdminGenericList 
          title={activeTab === 'leads' ? "Leads & Messages" : "Consultation Bookings"}
          description={activeTab === 'leads' ? "View incoming contact form submissions and leads." : "View and manage registered business package bookings."}
          columns={activeTab === 'leads' ? leadsColumns : bookingsColumns}
          data={data}
          onEdit={(item) => setSelectedItem(item)}
          onDelete={handleDelete}
          onBulkDelete={handleBulkDelete}
        />
      )}

      {selectedItem && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#0A1128] border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative">
            <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-white via-slate-200 to-amber-300 bg-clip-text text-transparent">
              {activeTab === 'leads' ? "Lead Details" : "Booking Details"}
            </h2>
            <div className="space-y-3.5 text-slate-300 text-sm">
              <p className="flex justify-between border-b border-slate-800/60 pb-2">
                <strong className="text-slate-400">Name:</strong> 
                <span className="font-medium text-white">{activeTab === 'leads' ? selectedItem.name : selectedItem.client}</span>
              </p>
              <p className="flex justify-between border-b border-slate-800/60 pb-2">
                <strong className="text-slate-400">Email:</strong> 
                <a href={`mailto:${selectedItem.email}`} className="text-amber-400 hover:underline">{selectedItem.email}</a>
              </p>
              <div className="flex justify-between border-b border-slate-800/60 pb-2 items-center">
                <strong className="text-slate-400">Phone:</strong> 
                <span className="flex items-center gap-2 text-white">
                  {selectedItem.phone || 'N/A'}
                  {selectedItem.phone && (
                    <a 
                      href={`tel:${selectedItem.phone}`} 
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300 text-xs font-bold rounded-full border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-200"
                    >
                      <PhoneCall className="w-3 h-3" /> Call Now
                    </a>
                  )}
                </span>
              </div>
              <p className="flex justify-between border-b border-slate-800/60 pb-2">
                <strong className="text-slate-400">{activeTab === 'leads' ? 'Service:' : 'Selected Plan:'}</strong> 
                <span className="font-semibold text-amber-300">
                  {activeTab === 'leads' ? (selectedItem.service || 'General Query') : selectedItem.planName}
                </span>
              </p>
              <p className="flex justify-between border-b border-slate-800/60 pb-2">
                <strong className="text-slate-400">Status:</strong> 
                <span className="text-white font-medium">{selectedItem.status || (activeTab === 'leads' ? 'New' : 'Pending')}</span>
              </p>
              <p className="flex justify-between border-b border-slate-800/60 pb-2">
                <strong className="text-slate-400">Created:</strong> 
                <span className="text-slate-400">{selectedItem.createdAt}</span>
              </p>
              {activeTab === 'leads' && (
                <div className="pt-2">
                  <strong className="text-slate-400 block mb-2">Message:</strong>
                  <p className="bg-[#050A18]/80 border border-slate-800/80 p-3 rounded-xl text-slate-300 text-xs sm:text-sm whitespace-pre-wrap leading-relaxed">
                    {selectedItem.message}
                  </p>
                </div>
              )}
            </div>
            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => setSelectedItem(null)}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
