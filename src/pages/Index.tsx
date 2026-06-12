import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import TourCategories from "@/components/home/TourCategories";
import TourPackages from "@/components/home/TourPackages";
import ExclusiveExperiences from "@/components/home/ExclusiveExperiences";
import Testimonials from "@/components/home/Testimonials";
import VisualStories from "@/components/home/VisualStories";
// import Journey from "@/components/home/Journey";
import SEO from "@/components/common/SEO";

const homeSchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "name": "SL Nature Escape",
  "description": "Discover pristine beaches, ancient rainforests, and exotic wildlife with SL Nature Escape. Your gateway to unforgettable experiences in Sri Lanka & Maldives.",
  "url": "https://www.slnatureescape.com/",
  "telephone": "+94 11 277 0294",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "130 Galle Road",
    "addressLocality": "Colombo 03",
    "addressCountry": "LK"
  },
  "sameAs": [
    "https://www.facebook.com/slnatureescape",
    "https://www.instagram.com/slnatureescape"
  ]
};

const Index = () => {
  return (
    <Layout>
      <SEO
        title="Sri Lanka & Maldives Travel & Tours"
        description="Discover pristine beaches, ancient rainforests, and exotic wildlife with SL Nature Escape. Experience customized, sustainable travel in Sri Lanka and the Maldives."
        keywords="Sri Lanka tours, Maldives tours, SL Nature Escape, beach holidays, wildlife safaris, cultural tours, travel agency Sri Lanka"
        schema={homeSchema}
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
