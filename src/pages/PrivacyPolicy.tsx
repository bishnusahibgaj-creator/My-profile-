import SEO from '../components/SEO';

export default function PrivacyPolicy() {
  return (
    <div className="pt-32 pb-24 bg-[#050A18] text-slate-300 min-h-screen">
      <SEO 
        title="Privacy Policy"
        description="Privacy Policy for Website Building. Learn how we collect, use, and protect your data."
      />
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-8">Privacy Policy</h1>
        <div className="prose prose-invert prose-amber max-w-none">
          <p className="mb-6">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          
          <h2 className="text-2xl font-bold text-white mt-10 mb-4">1. Introduction</h2>
          <p className="mb-4">
            At Website Building, we respect your privacy and are committed to protecting your personal data. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website 
            or use our services.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">2. Information We Collect</h2>
          <p className="mb-4">
            We may collect personal information that you voluntarily provide to us when you express an interest in obtaining 
            information about us or our products and services. The personal information we collect may include the following:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Name and Contact Data (such as email address, phone number, and postal address).</li>
            <li>Business Information (such as company name, website URL, and business goals).</li>
            <li>Payment Information (processed securely through our payment gateways; we do not store full credit card details).</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">3. How We Use Your Information</h2>
          <p className="mb-4">We use the information we collect or receive to:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Provide, operate, and maintain our services.</li>
            <li>Improve, personalize, and expand our services.</li>
            <li>Understand and analyze how you use our services.</li>
            <li>Develop new products, services, features, and functionality.</li>
            <li>Communicate with you, either directly or through one of our partners, including for customer service.</li>
            <li>Send you emails and marketing communications (you can opt-out at any time).</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">4. Sharing Your Information</h2>
          <p className="mb-4">
            We only share information with your consent, to comply with laws, to provide you with services, 
            to protect your rights, or to fulfill business obligations. We do not sell your personal information to third parties.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">5. Security of Your Information</h2>
          <p className="mb-4">
            We use administrative, technical, and physical security measures to help protect your personal information. 
            While we have taken reasonable steps to secure the personal information you provide to us, please be aware 
            that despite our efforts, no security measures are perfect or impenetrable.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">6. Contact Us</h2>
          <p className="mb-4">
            If you have questions or comments about this policy, you may email us at info@websitebuilding.com.
          </p>
        </div>
      </div>
    </div>
  );
}
