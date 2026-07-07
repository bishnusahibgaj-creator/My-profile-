import AdminGenericCrud from '../components/AdminGenericCrud';

export default function AdminServices() {
  const columns = [
    { key: 'name', label: 'Service Name' },
    { key: 'category', label: 'Category' },
    { 
      key: 'status', 
      label: 'Status',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'
        }`}>
          {value || 'Draft'}
        </span>
      )
    },
  ];

  const formFields: any[] = [
    { name: 'name', label: 'Service Name', type: 'text', required: true },
    { name: 'category', label: 'Category', type: 'select', options: ['Development', 'Marketing', 'Advertising', 'Design', 'Other'], required: true },
    { name: 'description', label: 'Description', type: 'textarea', required: true },
    { name: 'icon', label: 'Icon Name (code, refresh, layout, search, map, store, megaphone, target, server, wrench)', type: 'text', required: false },
    { name: 'status', label: 'Status', type: 'select', options: ['Active', 'Draft'], required: true },
  ];

  return (
    <AdminGenericCrud 
      title="Services"
      description="Manage your service offerings, categories, and descriptions."
      collectionName="services"
      columns={columns}
      formFields={formFields}
      orderByField="name"
      orderDirection="asc"
    />
  );
}
