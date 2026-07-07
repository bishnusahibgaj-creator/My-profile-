import AdminGenericCrud from '../components/AdminGenericCrud';

export default function AdminFaqs() {
  const columns = [
    { key: 'question', label: 'Question' },
    { key: 'answer', label: 'Answer' },
    { key: 'order', label: 'Display Order', render: (val: any) => val !== undefined ? val : '0' },
  ];

  const formFields: any[] = [
    { name: 'question', label: 'Question', type: 'text', required: true },
    { name: 'answer', label: 'Answer', type: 'textarea', required: true },
    { name: 'order', label: 'Display Order (Higher numbers show first or lower numbers? Let\'s sort by ascending order)', type: 'number', required: false },
  ];

  return (
    <AdminGenericCrud 
      title="Frequently Asked Questions (FAQ)"
      description="Manage the Frequently Asked Questions shown on the home page."
      collectionName="faqs"
      columns={columns}
      formFields={formFields}
      orderByField="order"
      orderDirection="asc"
    />
  );
}
