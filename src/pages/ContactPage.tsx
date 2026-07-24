import Contact from '../components/Contact';
import SEO from '../components/SEO';

export default function ContactPage() {
  return (
    <div className="pt-20">
      <SEO 
        title="Contact Us"
        description="Get in touch with Website Building. Book a free consultation and let's discuss how we can grow your business."
      />
      <Contact />
    </div>
  );
}
