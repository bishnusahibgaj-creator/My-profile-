import DemoProjects from '../components/DemoProjects';
import SEO from '../components/SEO';

export default function DemosPage() {
  return (
    <div className="pt-20">
      <SEO 
        title="Demo Projects & Portfolio"
        description="See our work in action. Explore our portfolio of high-converting websites, landing pages, and digital solutions."
      />
      <DemoProjects showAll={true} />
    </div>
  );
}
