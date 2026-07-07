import AdminGenericCrud from '../components/AdminGenericCrud';

export default function AdminTestimonials() {
  const columns = [
    { key: 'author', label: 'Author' },
    { key: 'company', label: 'Company' },
    { key: 'rating', label: 'Rating' },
    { key: 'date', label: 'Date' },
  ];

  const formFields: any[] = [
    { name: 'author', label: 'Author Name', type: 'text', required: true },
    { name: 'company', label: 'Company', type: 'text', required: true },
    { name: 'rating', label: 'Rating (e.g. 5 Stars)', type: 'select', options: ['5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star'], required: true },
    { name: 'content', label: 'Testimonial Text', type: 'textarea', required: true },
    { name: 'date', label: 'Date', type: 'date', required: true },
  ];

  return (
    <AdminGenericCrud 
      title="Testimonials"
      description="Manage client reviews and testimonials."
      collectionName="testimonials"
      columns={columns}
      formFields={formFields}
      orderByField="date"
      orderDirection="desc"
    />
  );
}
