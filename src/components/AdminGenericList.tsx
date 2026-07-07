import { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';

interface Column {
  key: string;
  label: string;
  render?: (value: any, item: any) => React.ReactNode;
}

interface AdminGenericListProps {
  title: string;
  description: string;
  columns: Column[];
  data: any[];
  onAdd?: () => void;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
  onBulkDelete?: (items: any[]) => void;
}

export default function AdminGenericList({ 
  title, 
  description, 
  columns, 
  data,
  onAdd,
  onEdit,
  onDelete,
  onBulkDelete
}: AdminGenericListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  
  // Custom confirmation modal state
  const [deleteConfirmItem, setDeleteConfirmItem] = useState<any>(null);
  const [bulkDeleteConfirm, setBulkDeleteConfirm] = useState(false);
  
  const filteredData = data.filter(item => 
    Object.values(item).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredData.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredData.map(item => item.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const handleBulkDeleteClick = () => {
    setBulkDeleteConfirm(true);
  };

  const confirmBulkDelete = () => {
    if (onBulkDelete) {
      const itemsToDelete = data.filter(item => selectedIds.has(item.id));
      onBulkDelete(itemsToDelete);
      setSelectedIds(new Set());
    }
    setBulkDeleteConfirm(false);
  };

  const handleDeleteClick = (item: any) => {
    setDeleteConfirmItem(item);
  };

  const confirmDelete = () => {
    if (onDelete && deleteConfirmItem) {
      onDelete(deleteConfirmItem);
    }
    setDeleteConfirmItem(null);
  };

  return (
    <div className="space-y-6 w-full max-w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white bg-gradient-to-r from-white via-slate-200 to-amber-300 bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-slate-400 mt-1 text-sm">{description}</p>
        </div>
        <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
          {onBulkDelete && selectedIds.size > 0 && (
            <button 
              onClick={handleBulkDeleteClick}
              className="flex items-center gap-2 px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-semibold rounded-lg transition-colors border border-red-500/30 text-sm"
            >
              <Trash2 className="w-4 h-4" />
              Delete ({selectedIds.size})
            </button>
          )}
          {onAdd && (
            <button 
              onClick={onAdd}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-[#050A18] font-bold rounded-lg transition-all shadow-lg shadow-amber-500/15 text-sm"
            >
              <Plus className="w-4.5 h-4.5" />
              Add New
            </button>
          )}
        </div>
      </div>

      <div className="bg-[#0A1128]/70 backdrop-blur-md rounded-2xl border border-slate-800/80 overflow-hidden shadow-2xl w-full">
        <div className="p-4 border-b border-slate-800/60 bg-slate-900/10">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder={`Search ${title.toLowerCase()}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#050A18]/60 border border-slate-700/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent text-sm text-white placeholder-slate-500"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#0D1836] border-b border-slate-800/80">
              <tr className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                {onBulkDelete && (
                  <th className="px-4 py-3 sm:px-6 sm:py-4 w-10 text-center">
                    <input 
                      type="checkbox" 
                      className="rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-amber-500/50 cursor-pointer w-4 h-4"
                      checked={filteredData.length > 0 && selectedIds.size === filteredData.length}
                      onChange={toggleSelectAll}
                    />
                  </th>
                )}
                {columns.map(col => (
                  <th key={col.key} className="px-4 py-3 sm:px-6 sm:py-4 font-bold text-slate-300">
                    {col.label}
                  </th>
                ))}
                {(onEdit || onDelete) && (
                  <th className="px-4 py-3 sm:px-6 sm:py-4 font-bold text-slate-300 text-right">Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40 text-slate-300">
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr key={item.id || index} className="hover:bg-slate-800/10 transition-colors">
                    {onBulkDelete && (
                      <td className="px-4 py-3 sm:px-6 sm:py-4 w-10 text-center">
                        <input 
                          type="checkbox" 
                          className="rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-amber-500/50 cursor-pointer w-4 h-4"
                          checked={selectedIds.has(item.id)}
                          onChange={() => toggleSelect(item.id)}
                        />
                      </td>
                    )}
                    {columns.map(col => (
                      <td key={col.key} className="px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm text-slate-200">
                        {col.render ? col.render(item[col.key], item) : item[col.key]}
                      </td>
                    ))}
                    {(onEdit || onDelete) && (
                      <td className="px-4 py-3 sm:px-6 sm:py-4 text-right">
                        <div className="flex justify-end gap-1 sm:gap-2">
                          {onEdit && (
                            <button 
                               onClick={() => onEdit(item)}
                              className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-slate-800/40 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                          )}
                          {onDelete && (
                            <button 
                               onClick={() => handleDeleteClick(item)}
                              className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800/40 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length + (onEdit || onDelete ? 1 : 0) + (onBulkDelete ? 1 : 0)} className="px-6 py-8 text-center text-slate-500 text-sm">
                    No matching records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {(deleteConfirmItem || bulkDeleteConfirm) && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#0A1128] border border-slate-800 rounded-2xl w-full max-w-sm p-6 shadow-2xl">
            <h2 className="text-lg font-bold text-white mb-2">Confirm Deletion</h2>
            <p className="text-slate-400 text-sm mb-6">
              Are you sure you want to delete {bulkDeleteConfirm ? `these ${selectedIds.size} items` : 'this item'}? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setDeleteConfirmItem(null);
                  setBulkDeleteConfirm(false);
                }}
                className="px-4 py-2 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg text-sm font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={bulkDeleteConfirm ? confirmBulkDelete : confirmDelete}
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg text-sm font-bold transition-all shadow-lg shadow-red-500/10"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
