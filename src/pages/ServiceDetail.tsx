import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import sigiriya from "@/assets/sigiriya.jpg";
import wildlife from "@/assets/wildlife.jpg";
import beachMirissa from "@/assets/beach-mirissa.jpg";
import temple from "@/assets/temple.jpg";
import heroImage from "@/assets/hero-srilanka.jpg";
import teaPlantations from "@/assets/tea-plantations.jpg";

interface ServiceData {
  title: string;
  heroImage: string;
  paragraphs: string[];
  ctaType: "inquire" | "link";
  ctaLink?: string;
  ctaText?: string;
}

const servicesData: Record<string, ServiceData> = {
  "visa": {
    title: "Visa",
    heroImage: sigiriya,
    paragraphs: [
      "Planning your dream getaway just got easier!",
      "Skip the long queues, confusing paperwork, and embassy visits — now you can apply for your travel visa online in just a few clicks. With our secure and user-friendly platform, you can complete your application from anywhere, at any time.",
      "Whether you're traveling for leisure, business, or adventure, this hassle-free process is designed to save you time and effort. No more stress, no hidden steps — just a smooth, guided experience from start to finish. Simply follow the link below to access the official visa application page, submit your details, upload the required documents, and make the payment online.",
      "It's that simple. Your adventure awaits — and getting there has never been this convenient!"
    ],
    ctaType: "link",
    ctaLink: "https://www.eta.gov.lk",
    ctaText: "WWW.ETA.GOV.LK"
  },
  "tour-guide": {
    title: "Tour Guide",
    heroImage: teaPlantations,
    paragraphs: [
      "At Walkers Tours, our tour guides play an indispensable role in delivering exceptional travel experiences. Serving as the bridge between our guests and the destination, they are much more than guides — they are storytellers, cultural interpreters, and trusted companions on every journey.",
      "With extensive local knowledge, professionalism, and a genuine passion for hospitality, our guides bring Sri Lanka's history, culture, and landscapes to life. Their ability to manage itineraries, respond to guest needs, and offer insightful commentary ensures each tour is smooth, enriching, and enjoyable.",
      "Whether leading a city exploration, a historical site visit, or a scenic excursion, our tour guides create meaningful connections that leave lasting impressions. They help navigate language and cultural differences with ease, providing both comfort and confidence to every traveler.",
      "At Walkers Tours, we recognize that the success of any journey lies in the hands of those who lead it. Our tour guides truly are the heart of what we do."
    ],
    ctaType: "inquire"
  },
  "cruise-operations": {
    title: "Cruise Operations",
    heroImage: beachMirissa,
    paragraphs: [
      "At Walkers Tours, we are proud to offer professional and seamless ground handling services for cruise passengers arriving on the shores of Sri Lanka. From the moment a vessel berths, our experienced team ensures that every aspect of the onshore experience is meticulously managed with efficiency, care, and attention to detail.",
      "Our comprehensive services include well-organized disembarkation, curated shore excursions, reliable transportation, and, where required, premium accommodation arrangements. Whether guests wish to explore historic landmarks, vibrant cities, or the natural beauty of the countryside, we craft itineraries that reflect the richness of Sri Lanka within the available timeframe.",
      "We work in close collaboration with cruise lines, port authorities, and local partners to uphold the highest standards of safety and service. Backed by decades of industry experience and deep destination knowledge, Walkers Tours is a trusted partner in delivering refined, memorable, and culturally immersive cruise experiences, enhanced by the warmth and hospitality for which Sri Lanka is renowned."
    ],
    ctaType: "inquire"
  },
  "csr": {
    title: "CSR",
    heroImage: temple,
    paragraphs: [
      "Corporate Social Responsibility (CSR) is at the heart of our sustainability journey. We believe in creating lasting value for communities, the environment, and future generations through purposeful action. Our CSR initiatives focus on education, community empowerment, environmental conservation, and inclusive tourism. From school renovations and mental health awareness programs to beach cleanups and wildlife protection, we strive to uplift lives and protect the destinations we serve.",
      "We work closely with JKH Foundation, local communities, non-profit organizations, and government bodies to ensure our impact is meaningful and aligned with real needs. Our projects are funded through our operations and often enriched by the collaboration of our tour partners and clients, who join us in giving back responsibly. We also actively support accessibility and inclusion by developing infrastructure for people with disabilities.",
      "Through these efforts, we aim to lead by example, creating travel experiences that are not only memorable, but mindful of the people and places that make them possible."
    ],
    ctaType: "inquire"
  },
  "transportation": {
    title: "Transportation",
    heroImage: heroImage,
    paragraphs: [
      "At Walkers Tours, we understand that reliable, comfortable transportation is essential to a seamless travel experience. Our fleet of modern, well-maintained vehicles ensures you travel in style and comfort throughout your Sri Lankan journey.",
      "From luxury coaches for group tours to private cars with experienced chauffeur-guides, we offer a range of transportation options tailored to your needs. All our vehicles are air-conditioned, regularly serviced, and equipped with safety features to ensure your peace of mind.",
      "Our professional drivers are more than just chauffeurs — they are trained guides with extensive knowledge of local routes, attractions, and culture. They ensure timely arrivals, smooth transfers, and can offer valuable insights throughout your journey.",
      "Whether you need airport transfers, day excursions, or comprehensive tour transportation, Walkers Tours delivers punctual, safe, and comfortable travel solutions across Sri Lanka."
    ],
    ctaType: "inquire"
  }
};

const ServiceDetail = () => {
  const { serviceSlug } = useParams();
  const service = servicesData[serviceSlug || ""];

  if (!service) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-serif mb-4">Service not found</h1>
            <Link to="/services" className="text-primary hover:underline">
              Back to Services
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[45vh] min-h-[350px]">
        <div className="absolute inset-0">
          <img
            src={service.heroImage}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <p className="text-sm text-muted-foreground mb-2">Walkers Tour Services</p>
            <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-10">
              {service.title}
            </h1>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              {service.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* CTA Button */}
            <div className="mt-10">
              {service.ctaType === "inquire" ? (
                <Link to="/contact">
                  <Button className="rounded-full px-8" size="lg">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    INQUIRE NOW
                  </Button>
                </Link>
              ) : (
                <a 
                  href={service.ctaLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button className="rounded-full px-8" size="lg">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {service.ctaText}
                  </Button>
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ServiceDetail;
