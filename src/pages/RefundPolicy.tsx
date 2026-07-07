import SEO from '../components/SEO';

export default function RefundPolicy() {
  return (
    <div className="pt-32 pb-24 bg-[#050A18] text-slate-300 min-h-screen">
      <SEO 
        title="Refund Policy"
        description="Refund and Cancellation Policy for BizGrow Digital."
      />
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-8">Refund Policy</h1>
        <div className="prose prose-invert prose-amber max-w-none">
          <p className="mb-6">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">1. General Policy</h2>
          <p className="mb-4">
            At BizGrow Digital, we strive to ensure 100% satisfaction with our services. However, due to the nature 
            of digital products and services, our refund policy varies depending on the specific service provided.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">2. Web Development Services</h2>
          <p className="mb-4">
            For website design and development projects, we typically require an upfront deposit. 
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Before Project Commencement:</strong> If you cancel your project before any work has begun, you are entitled to a full refund of your deposit.</li>
            <li><strong>During the Project:</strong> If you choose to cancel the project after work has commenced but before completion, we will retain a portion of the deposit corresponding to the amount of work completed. Any remaining balance will be refunded.</li>
            <li><strong>After Completion:</strong> Once the final project has been delivered and approved, no refunds will be issued.</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">3. SEO & Digital Marketing Subscriptions</h2>
          <p className="mb-4">
            SEO and ongoing digital marketing services are billed on a month-to-month basis unless a long-term contract is signed.
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>You may cancel your monthly subscription at any time with a 30-day notice.</li>
            <li>We do not offer prorated refunds for partial months of service used.</li>
            <li>Due to the nature of SEO (search engine algorithms are outside of our control), we cannot guarantee specific ranking results, and refunds are not provided based on ranking outcomes.</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">4. Digital Products</h2>
          <p className="mb-4">
            Any downloadable digital products, templates, or software are non-refundable once they have been downloaded or accessed, 
            unless the product is proven to be defective or not as described.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">5. How to Request a Refund</h2>
          <p className="mb-4">
            To request a refund or cancellation, please email us at info@digitalgrowth.com with your project details and the reason for your request. 
            We will review your request and respond within 3-5 business days.
          </p>
        </div>
      </div>
    </div>
  );
}
