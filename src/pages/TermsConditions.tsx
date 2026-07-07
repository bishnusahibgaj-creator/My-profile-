import SEO from '../components/SEO';

export default function TermsConditions() {
  return (
    <div className="pt-32 pb-24 bg-[#050A18] text-slate-300 min-h-screen">
      <SEO 
        title="Terms & Conditions"
        description="Terms and Conditions for BizGrow Digital. Please read these terms carefully before using our services."
      />
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-8">Terms & Conditions</h1>
        <div className="prose prose-invert prose-amber max-w-none">
          <p className="mb-6">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">1. Agreement to Terms</h2>
          <p className="mb-4">
            By accessing or using our website and services, you agree to be bound by these Terms and Conditions. 
            If you disagree with any part of the terms, then you may not access our services.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">2. Intellectual Property</h2>
          <p className="mb-4">
            The Service and its original content, features, and functionality are and will remain the exclusive 
            property of BizGrow Digital and its licensors. Our services are protected by copyright, trademark, 
            and other laws of both the country and foreign countries.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">3. Services and Payments</h2>
          <p className="mb-4">
            We provide various digital marketing and website development services as described on our website. 
            All payments are due upon receipt. If a payment is not received or a payment method is declined, 
            the buyer forfeits the ownership of any services purchased.
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Web development projects require an initial deposit before work commences.</li>
            <li>SEO and Marketing retainer services are billed on a monthly subscription basis.</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">4. Client Responsibilities</h2>
          <p className="mb-4">
            To ensure the timely completion of projects, the client agrees to provide all necessary content, 
            images, access credentials, and feedback in a timely manner. Delays in client feedback may result 
            in project timeline extensions.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">5. Limitation of Liability</h2>
          <p className="mb-4">
            In no event shall BizGrow Digital, nor its directors, employees, partners, agents, suppliers, 
            or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, 
            including without limitation, loss of profits, data, use, goodwill, or other intangible losses, 
            resulting from your access to or use of or inability to access or use the Service.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">6. Changes to Terms</h2>
          <p className="mb-4">
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
            By continuing to access or use our Service after those revisions become effective, you agree 
            to be bound by the revised terms.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">7. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about these Terms, please contact us at info@digitalgrowth.com.
          </p>
        </div>
      </div>
    </div>
  );
}
