import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import TourCategories from "@/components/home/TourCategories";
import TourPackages from "@/components/home/TourPackages";
import ExclusiveExperiences from "@/components/home/ExclusiveExperiences";
import Testimonials from "@/components/home/Testimonials";
import VisualStories from "@/components/home/VisualStories";
import SEO from "@/components/common/SEO";

const Index = () => {
  return (
    <Layout>
      <SEO 
        title="Best Sri Lanka & Maldives Nature Tours"
        description="Experience the ultimate nature escape in Sri Lanka and the Maldives. Book tailor-made wildlife tours, beach holidays, and cultural experiences."
      />
      <Hero />
      <AboutSection />
      <TourCategories />
      <TourPackages />
      <ExclusiveExperiences />
      <Testimonials />
      <VisualStories />
    </Layout>
  );
};

export default Index;
