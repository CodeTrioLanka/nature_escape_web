import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import TourCategories from "@/components/home/TourCategories";
import TourPackages from "@/components/home/TourPackages";
// import BespokeTours from "@/components/home/BespokeTours";
import ExclusiveExperiences from "@/components/home/ExclusiveExperiences";
import Testimonials from "@/components/home/Testimonials";
import Sustainability from "@/components/home/Sustainability";
import VisualStories from "@/components/home/VisualStories";
import GSAPParallaxContainer from "@/components/common/GSAPParallaxContainer";
// import Journey from "@/components/home/Journey";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <GSAPParallaxContainer speed={0.9}>
        <AboutSection />
      </GSAPParallaxContainer>
      <GSAPParallaxContainer speed={1.1}>
        <TourCategories />
      </GSAPParallaxContainer>
      <GSAPParallaxContainer speed={0.95}>
        <TourPackages />
      </GSAPParallaxContainer>
      {/* <BespokeTours /> */}
      <GSAPParallaxContainer speed={1.05}>
        <ExclusiveExperiences />
      </GSAPParallaxContainer>
      <GSAPParallaxContainer speed={0.9}>
        <Testimonials />
      </GSAPParallaxContainer>
      <GSAPParallaxContainer speed={1.1}>
        <Sustainability />
      </GSAPParallaxContainer>
      <GSAPParallaxContainer speed={0.95}>
        <VisualStories />
      </GSAPParallaxContainer>
      {/* <Journey /> */}
    </Layout>
  );
};

export default Index;
