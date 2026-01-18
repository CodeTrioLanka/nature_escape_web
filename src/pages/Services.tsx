import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-srilanka.jpg";
import sigiriya from "@/assets/sigiriya.jpg";
import wildlife from "@/assets/wildlife.jpg";
import beachMirissa from "@/assets/beach-mirissa.jpg";
import temple from "@/assets/temple.jpg";
import adventure from "@/assets/adventure.jpg";
import teaPlantations from "@/assets/tea-plantations.jpg";

const services = [
  {
    title: "MICE",
    image: temple,
    slug: "mice"
  },
  {
    title: "VISA",
    image: sigiriya,
    slug: "visa"
  },
  {
    title: "TOUR GUIDE",
    image: heroImage,
    slug: "tour-guide"
  },
  {
    title: "CRUISE OPERATIONS",
    image: beachMirissa,
    slug: "cruise-operations"
  },
  {
    title: "CSR",
    image: teaPlantations,
    slug: "csr"
  },
  {
    title: "EXCURSIONS",
    image: adventure,
    slug: "excursions"
  },
  {
    title: "TRANSPORTATION",
    image: wildlife,
    slug: "transportation"
  }
];

const Services = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[45vh] min-h-[350px]">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Our Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-sm text-muted-foreground mb-2">Walkers Tours</p>
            <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-8">
              Our Services
            </h1>
            <div className="max-w-4xl mx-auto space-y-4 text-muted-foreground leading-relaxed">
              <p>
                At Walkers Tours, with over five decades of expertise in Sri Lanka's tourism industry, 
                we proudly offer a comprehensive range of travel services to guests from around the world. 
                As one of the country's most trusted destination management companies, our experience, 
                professionalism, and deep local knowledge allow us to deliver exceptional and tailor-made 
                travel solutions, while remaining committed to eco-conscious and responsible tourism practices.
              </p>
              <p>
                Our services include bespoke tour planning, premium accommodation arrangements, expertly guided excursions, 
                reliable transportation, and visa assistance. We also specialize in MICE (Meetings, Incentives, 
                Conferences, and Exhibitions) offering seamless support for corporate travel and events.
              </p>
              <p>
                Whether you're a solo traveler, couple, family, or group, every journey is thoughtfully designed 
                to minimize environmental impact while maximizing cultural immersion and comfort.
              </p>
              <p>
                From arrival to departure, our dedicated team ensures smooth, enriching, and memorable experiences 
                across Sri Lanka. At Walkers Tours, we do not just plan holidays; we create sustainable and 
                unforgettable journeys with care and the warmth of Sri Lankan hospitality.
              </p>
            </div>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link 
                  to={service.slug === "excursions" ? "/excursions" : service.slug === "mice" ? "/mice" : `/service/${service.slug}`} 
                  className="block group"
                >
                  <div className="relative h-[280px] overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white text-lg font-semibold tracking-wide">
                        {service.title}
                        <span className="inline-block ml-3 w-10 h-[2px] bg-primary align-middle" />
                      </h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
