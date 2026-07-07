import AdminGenericCrud from '../components/AdminGenericCrud';

export default function AdminPricing() {
  const columns = [
    { key: 'plan', label: 'Plan Name' },
    { key: 'price', label: 'Price' },
    { key: 'billing', label: 'Billing Cycle' },
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
    { name: 'plan', label: 'Plan Name', type: 'text', required: true },
    { name: 'price', label: 'Price (e.g. ₹9,999)', type: 'text', required: true },
    { name: 'billing', label: 'Billing Cycle', type: 'select', options: ['Monthly', 'Annual', 'One-time'], required: true },
    { name: 'status', label: 'Status', type: 'select', options: ['Active', 'Draft'], required: true },
    { name: 'features', label: 'Plan Features (one per line)', type: 'textarea', required: false },
    { name: 'isPopular', label: 'Is Popular Plan?', type: 'select', options: ['No', 'Yes'], required: false },
  ];

  return (
    <AdminGenericCrud 
      title="Pricing Plans"
      description="Manage your pricing packages and features."
      collectionName="pricing"
      columns={columns}
      formFields={formFields}
      orderByField="plan"
      orderDirection="asc"
    />
  );
}
