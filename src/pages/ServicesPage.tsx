import Services from '../components/Services';
import FeatureImages from '../components/FeatureImages';
import SEO from '../components/SEO';

export default function ServicesPage() {
  return (
    <div className="pt-20">
      <SEO 
        title="Our Services"
        description="Explore our range of digital solutions including Website Development, Local SEO, Google Business Profile optimization, and more."
      />
      <Services />
      <FeatureImages />
    </div>
  );
}
