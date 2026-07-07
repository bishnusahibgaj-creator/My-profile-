import SEO from '../components/SEO';

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 bg-[#050A18] text-slate-300 min-h-screen">
      <SEO 
        title="About Us"
        description="Learn why businesses trust BizGrow Digital for their online growth. Experience, results, and premium service you can rely on."
      />
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">About BizGrow Digital</h1>
        <p className="text-xl text-slate-400 mb-12">
          We are a premium digital marketing agency dedicated to helping businesses achieve exponential growth online.
        </p>
        <div className="bg-[#0A1128] rounded-3xl p-8 border border-slate-800 text-left space-y-6">
          <h2 className="text-2xl font-bold text-white">Our Mission</h2>
          <p className="text-slate-300 leading-relaxed">
            Our mission is to provide cutting-edge digital marketing solutions that drive real, measurable results for our clients. We believe in transparency, innovation, and a data-driven approach to marketing.
          </p>
          <h2 className="text-2xl font-bold text-white mt-8">Why Choose Us?</h2>
          <ul className="list-disc pl-6 space-y-3 text-slate-300">
            <li>Proven track record of success across various industries.</li>
            <li>Dedicated team of digital marketing experts.</li>
            <li>Customized strategies tailored to your business goals.</li>
            <li>Transparent reporting and clear communication.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
