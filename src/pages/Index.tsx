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
  "alternateName": "Nature Escape",
  "description": "Plan your perfect holiday with SL Nature Escape, the best travel and tour agency and your ultimate Sri Lanka best travel guide. Experience wildlife, culture, and nature. Book your tour today!",
  "url": "https://www.slnatureescape.com/",
  "telephone": ["+94 11 277 0294", "+94 74 207 7805", "+94 76 311 9077"],
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "No.150, Kothalawala",
    "addressLocality": "Kaduwela",
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
        title="SL Nature Escape | The Best Travel & Tours in Sri Lanka"
        description="Plan your perfect holiday with SL Nature Escape, the best travel and tour agency and your ultimate Sri Lanka best travel guide. Experience wildlife, culture, and nature. Book your tour today!"
        keywords="Nature Escape, SL Nature Escape, Nature Escape Sri Lanka, Sri Lanka tours, beach holidays, wildlife safaris, travel agency Sri Lanka, Sri Lanka best travel guide, travel guide, Jeewappriya Hanjin, tourism in Sri Lanka, Sri Lanka tourism, Sri Lanka adventure tours, Backpacking Sri Lanka, Hiking and trekking Sri Lanka, Surfing holidays Sri Lanka, White water rafting Kitulgala, Camping tours Sri Lanka, Ella rock hike guide, Sri Lanka cycling tours, Budget travel Sri Lanka, Affordable Sri Lanka tour packages, Cheap holidays Sri Lanka, Sri Lanka backpacker guide, Budget wildlife safaris Sri Lanka, Low cost travel Sri Lanka, Best budget places in Sri Lanka, Yala national park safari, Ella train ride tours, Whale watching Mirissa, Sigiriya rock fortress tour, Kandy heritage tours, Eco tourism Sri Lanka, Cultural tours Sri Lanka, Sri Lanka honeymoon packages, Adventure tours Sri Lanka, Luxury travel Sri Lanka, Sri Lanka holiday packages, Customized tours Sri Lanka, Sri Lanka vacation deals, Best places to visit in Sri Lanka, Private driver Sri Lanka, Sri Lanka round tours, Website design and develop by CodeTrioLanka"
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
