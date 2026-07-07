import AdminGenericCrud from '../components/AdminGenericCrud';

export default function AdminDemos() {
  const columns = [
    { key: 'thumbnailUrl', label: 'Thumbnail', render: (val: any) => val ? <img src={val} alt="Thumbnail" className="w-12 h-12 object-cover rounded" /> : null },
    { key: 'projectName', label: 'Project Name' },
    { key: 'category', label: 'Category' },
    { key: 'shortDescription', label: 'Description' },
    { key: 'demoUrl', label: 'Link', render: (val: any) => val ? <a href={val} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View</a> : null },
  ];

  const formFields: any[] = [
    { name: 'projectName', label: 'Project Name', type: 'text', required: true },
    { name: 'category', label: 'Category', type: 'text', required: true },
    { name: 'shortDescription', label: 'Short Description', type: 'text', required: true },
    { name: 'demoUrl', label: 'Website Link', type: 'url', required: false },
    { name: 'thumbnailUrl', label: 'Thumbnail Image URL', type: 'url', required: false },
  ];

  return (
    <AdminGenericCrud 
      title="Demos & Portfolio"
      description="Manage your portfolio projects and case studies."
      collectionName="demos"
      columns={columns}
      formFields={formFields}
      orderByField="createdAt"
      orderDirection="desc"
    />
  );
}
