import { Routes, Route } from 'react-router-dom';
import PublicLayout from './pages/PublicLayout';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import ServiceDetail from './pages/ServiceDetail';
import DemosPage from './pages/DemosPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PricingPage from './pages/PricingPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import RefundPolicy from './pages/RefundPolicy';
import AdminLayout from './pages/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import AdminAiTools from './pages/AdminAiTools';
import AdminServices from './pages/AdminServices';
import AdminPricing from './pages/AdminPricing';
import AdminDemos from './pages/AdminDemos';
import AdminTestimonials from './pages/AdminTestimonials';
import AdminLeads from './pages/AdminLeads';
import AdminBookings from './pages/AdminBookings';
import AdminSettings from './pages/AdminSettings';
import AdminFeatures from './pages/AdminFeatures';
import AdminFaqs from './pages/AdminFaqs';

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:serviceId" element={<ServiceDetail />} />
        <Route path="/demos" element={<DemosPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="ai-tools" element={<AdminAiTools />} />
        <Route path="services" element={<AdminServices />} />
        <Route path="pricing" element={<AdminPricing />} />
        <Route path="demos" element={<AdminDemos />} />
        <Route path="features" element={<AdminFeatures />} />
        <Route path="faqs" element={<AdminFaqs />} />
        <Route path="testimonials" element={<AdminTestimonials />} />
        <Route path="leads" element={<AdminLeads />} />
        <Route path="bookings" element={<AdminBookings />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  );
}
