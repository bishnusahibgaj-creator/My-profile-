import AdminGenericCrud from '../components/AdminGenericCrud';

export default function AdminFeatures() {
  const columns = [
    { key: 'imageUrl', label: 'Image', render: (val: any) => val ? <img src={val} alt="Feature" className="w-12 h-12 object-cover rounded" /> : null },
    { key: 'title', label: 'Feature Title' },
    { key: 'description', label: 'Description' },
  ];

  const formFields: any[] = [
    { name: 'title', label: 'Feature Title', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea', required: true },
    { name: 'imageUrl', label: 'Image URL', type: 'url', required: true },
  ];

  return (
    <AdminGenericCrud 
      title="Platform Features"
      description="Manage feature images and descriptions shown on the home page."
      collectionName="features"
      columns={columns}
      formFields={formFields}
      orderByField="createdAt"
      orderDirection="desc"
    />
  );
}