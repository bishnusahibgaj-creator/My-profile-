import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, orderBy } from 'firebase/firestore';
import AdminGenericList from './AdminGenericList';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'number' | 'date' | 'time' | 'url';
  options?: string[];
  required?: boolean;
}

interface Column {
  key: string;
  label: string;
  render?: (value: any, item: any) => React.ReactNode;
}

interface AdminGenericCrudProps {
  title: string;
  description: string;
  collectionName: string;
  columns: Column[];
  formFields: FormField[];
  orderByField?: string;
  orderDirection?: 'asc' | 'desc';
}

export default function AdminGenericCrud({
  title,
  description,
  collectionName,
  columns,
  formFields,
  orderByField = 'createdAt',
  orderDirection = 'desc'
}: AdminGenericCrudProps) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, [collectionName]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, collectionName), orderBy(orderByField, orderDirection));
      const querySnapshot = await getDocs(q);
      const items = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setData(items);
    } catch (error) {
      console.error(`Error fetching ${collectionName}:`, error);
      // Fallback if index doesn't exist
      try {
        const fallbackQ = query(collection(db, collectionName));
        const fallbackSnapshot = await getDocs(fallbackQ);
        const fallbackItems = fallbackSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setData(fallbackItems);
      } catch (fallbackError) {
        console.error("Fallback fetch failed", fallbackError);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (item: any = null) => {
    setEditingItem(item);
    if (item) {
      setFormData(item);
    } else {
      const emptyForm: any = {};
      formFields.forEach(f => {
        emptyForm[f.name] = '';
      });
      setFormData(emptyForm);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const dataToSave = { ...formData };
      
      if (editingItem?.id) {
        const docRef = doc(db, collectionName, editingItem.id);
        await updateDoc(docRef, {
          ...dataToSave,
          updatedAt: serverTimestamp()
        });
      } else {
        await addDoc(collection(db, collectionName), {
          ...dataToSave,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
      
      handleCloseModal();
      fetchData();
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save data. Please check console for details.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item: any) => {
    try {
      await deleteDoc(doc(db, collectionName, item.id));
      fetchData();
    } catch (error) {
      console.error("Error deleting:", error);
      alert("Failed to delete. Please check console for details.");
    }
  };

  const handleBulkDelete = async (items: any[]) => {
    try {
      setLoading(true);
      for (const item of items) {
        await deleteDoc(doc(db, collectionName, item.id));
      }
      fetchData();
    } catch (error) {
      console.error("Error bulk deleting:", error);
      alert("Failed to bulk delete some items. Please check console for details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-slate-400 text-sm">Loading {title}...</div>;
  }

  return (
    <>
      <AdminGenericList 
        title={title}
        description={description}
        columns={columns}
        data={data}
        onAdd={() => handleOpenModal()}
        onEdit={(item) => handleOpenModal(item)}
        onDelete={(item) => handleDelete(item)}
        onBulkDelete={handleBulkDelete}
      />

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#0A1128] border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="px-6 py-4 border-b border-slate-800/80 flex justify-between items-center bg-[#0D1836]">
              <h2 className="text-xl font-bold bg-gradient-to-r from-white via-slate-200 to-amber-300 bg-clip-text text-transparent">
                {editingItem ? 'Edit' : 'Add New'} {title.replace(/s$/, '')}
              </h2>
              <button 
                onClick={handleCloseModal}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {formFields.map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">
                    {field.label} {field.required && <span className="text-red-400">*</span>}
                  </label>
                  
                  {field.type === 'textarea' ? (
                    <textarea
                      name={field.name}
                      required={field.required}
                      value={formData[field.name] || ''}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-2 bg-[#050A18]/60 border border-slate-700/80 rounded-lg focus:ring-2 focus:ring-amber-500/50 focus:border-transparent outline-none text-white placeholder-slate-500"
                    />
                  ) : field.type === 'select' ? (
                    <select
                      name={field.name}
                      required={field.required}
                      value={formData[field.name] || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-[#050A18]/60 border border-slate-700/80 rounded-lg focus:ring-2 focus:ring-amber-500/50 focus:border-transparent outline-none text-white cursor-pointer"
                    >
                      <option value="" className="bg-[#0A1128] text-white">Select {field.label}</option>
                      {field.options?.map(opt => (
                        <option key={opt} value={opt} className="bg-[#0A1128] text-white">{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      required={field.required}
                      value={formData[field.name] || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-[#050A18]/60 border border-slate-700/80 rounded-lg focus:ring-2 focus:ring-amber-500/50 focus:border-transparent outline-none text-white placeholder-slate-500"
                    />
                  )}
                </div>
              ))}
              
              <div className="pt-4 flex justify-end gap-3 border-t border-slate-800/40 mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg text-sm font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-[#050A18] font-bold rounded-lg transition-all shadow-lg shadow-amber-500/10 text-sm disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
