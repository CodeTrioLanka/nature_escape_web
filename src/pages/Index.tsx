import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import TourCategories from "@/components/home/TourCategories";
import TourPackages from "@/components/home/TourPackages";
import BespokeTours from "@/components/home/BespokeTours";
import ExclusiveExperiences from "@/components/home/ExclusiveExperiences";
import Testimonials from "@/components/home/Testimonials";
import Sustainability from "@/components/home/Sustainability";
import VisualStories from "@/components/home/VisualStories";
import Journey from "@/components/home/Journey";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <AboutSection />
      <TourCategories />
      <TourPackages />
      <BespokeTours />
      <ExclusiveExperiences />
      <Testimonials />
      <Sustainability />
      <VisualStories />
      <Journey />
    </Layout>
  );
};

export default Index;
