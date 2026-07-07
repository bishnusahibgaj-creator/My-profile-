import AdminGenericCrud from '../components/AdminGenericCrud';

export default function AdminBookings() {
  const columns = [
    { key: 'client', label: 'Client' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'planName', label: 'Selected Plan' },
    { 
      key: 'status', 
      label: 'Status',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
        }`}>
          {value || 'Pending'}
        </span>
      )
    },
  ];

  const formFields: any[] = [
    { name: 'client', label: 'Client Name', type: 'text', required: true },
    { name: 'email', label: 'Client Email', type: 'text', required: true },
    { name: 'phone', label: 'Client Phone', type: 'text', required: false },
    { name: 'planName', label: 'Selected Plan', type: 'text', required: false },
    { name: 'status', label: 'Status', type: 'select', options: ['Pending', 'Confirmed', 'Cancelled'], required: true },
    { name: 'type', label: 'Meeting Type (Internal)', type: 'select', options: ['Consultation', 'Project Kickoff', 'Review', 'Other'], required: false },
    { name: 'date', label: 'Date (Internal)', type: 'date', required: false },
    { name: 'time', label: 'Time (Internal)', type: 'time', required: false },
  ];

  return (
    <AdminGenericCrud 
      title="Bookings"
      description="Manage your calendar, meetings, and consultations."
      collectionName="bookings"
      columns={columns}
      formFields={formFields}
      orderByField="createdAt"
      orderDirection="desc"
    />
  );
}
