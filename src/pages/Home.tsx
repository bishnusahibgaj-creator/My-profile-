import Hero from '../components/Hero';
import CanvaProOffer from '../components/CanvaProOffer';
import Services from '../components/Services';
import FeatureImages from '../components/FeatureImages';
import DemoProjects from '../components/DemoProjects';
import FaqSection from '../components/FaqSection';
import Contact from '../components/Contact';
import SEO from '../components/SEO';

export default function Home() {
  return (
    <div className="bg-[#050A18] min-h-screen">
      <SEO 
        title="Home"
        description="Website Building - Premium Website Development, SEO, Ads, and digital marketing services to help your business grow online."
      />
      <Hero />
      <CanvaProOffer />
      <Services />
      <FeatureImages />
      <DemoProjects />
      <FaqSection />
      <Contact />
    </div>
  );
}
