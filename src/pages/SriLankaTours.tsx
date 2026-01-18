import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Layout from "@/components/layout/Layout";

// Hero images
import beachSurfImg from "@/assets/beach-surf.jpg";
import heroImage from "@/assets/hero-srilanka.jpg";

// Category images
import sigiriyaImg from "@/assets/sigiriya.jpg";
import teaImg from "@/assets/tea-plantations.jpg";
import templeImg from "@/assets/temple.jpg";
import wildlifeImg from "@/assets/wildlife.jpg";
import familyImg from "@/assets/family-beach.jpg";
import honeymoonImg from "@/assets/honeymoon.jpg";
import adventureImg from "@/assets/adventure.jpg";
import golfImg from "@/assets/golf.jpg";
import mapImg from "@/assets/sri-lanka-map.jpg";
import beachParadiseImg from "@/assets/beach-paradise.jpg";
import beachMirissaImg from "@/assets/beach-mirissa.jpg";

// Sample tours data
const sampleTours = [
  {
    id: 1,
    title: "Discover Essences of Sri Lanka",
    duration: "9 Nights / 10 Days",
    image: heroImage,
  },
  {
    id: 2,
    title: "Heavenly Sri Lanka",
    duration: "6 Nights / 7 Days",
    image: teaImg,
  },
  {
    id: 3,
    title: "Wonder of the Isle",
    duration: "11 Nights / 12 Days",
    image: sigiriyaImg,
  },
];

// Tour categories
const tourCategories = [
  { id: 1, title: "BEACH TOURS", images: [beachParadiseImg, beachMirissaImg], href: "/sri-lanka-tours/beach" },
  { id: 2, title: "CULTURAL TOURS", images: [sigiriyaImg, templeImg], href: "/sri-lanka-tours/cultural" },
  { id: 3, title: "HONEYMOON TOURS", images: [honeymoonImg, beachMirissaImg], href: "/sri-lanka-tours/honeymoon" },
  { id: 4, title: "HILL COUNTRY TOURS", images: [teaImg, golfImg], href: "/sri-lanka-tours/hill-country" },
  { id: 5, title: "WILDLIFE TOURS", images: [wildlifeImg, adventureImg], href: "/sri-lanka-tours/wildlife" },
  { id: 6, title: "ADVENTURE TOURS", images: [adventureImg, beachSurfImg], href: "/sri-lanka-tours/adventure" },
  { id: 7, title: "AYURVEDIC TOURS", images: [teaImg, honeymoonImg], href: "/sri-lanka-tours/ayurvedic" },
  { id: 8, title: "FAMILY TOURS", images: [familyImg, wildlifeImg], href: "/sri-lanka-tours/family" },
  { id: 9, title: "RAMAYANA TOURS", images: [templeImg, sigiriyaImg], href: "/sri-lanka-tours/ramayana" },
  { id: 10, title: "GOLF TOURS", images: [golfImg, teaImg], href: "/sri-lanka-tours/golf" },
];

const SriLankaTours = () => {
  const toursRef = useRef(null);
  const categoriesRef = useRef(null);
  const mapRef = useRef(null);
  const ctaRef = useRef(null);
  
  const toursInView = useInView(toursRef, { once: true, margin: "-50px" });
  const categoriesInView = useInView(categoriesRef, { once: true, margin: "-50px" });
  const mapInView = useInView(mapRef, { once: true, margin: "-50px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-50px" });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${beachSurfImg})` }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-transparent to-foreground/60" />
        </motion.div>
        
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="container mx-auto">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-primary-foreground"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Sri Lanka Tours
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Across Sri Lanka Section */}
      <section className="py-20 bg-background" ref={toursRef}>
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-14"
            initial={{ opacity: 0, y: 30 }}
            animate={toursInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-4">
              Across Sri Lanka
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Experience the beauty of Sri Lanka, a tropical paradise with ancient ruins, endless beaches, 
              welcoming locals, abundant wildlife, rolling surf, famous tea, and delicious cuisine.
            </p>
          </motion.div>

          {/* Sample Tours Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {sampleTours.map((tour, index) => (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, y: 30 }}
                animate={toursInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link 
                  to={`/sri-lanka-tours/${tour.id}`}
                  className="group relative rounded-2xl overflow-hidden aspect-[4/3] shadow-lg block"
                >
                  <motion.img 
                    src={tour.image} 
                    alt={tour.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="text-primary-foreground/70 text-sm">{tour.duration}</span>
                    <h3 className="text-primary-foreground font-display font-semibold text-xl mt-1 group-hover:text-secondary transition-colors">
                      {tour.title}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0 }}
            animate={toursInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link 
              to="/sri-lanka-tours/sample"
              className="group inline-flex items-center gap-2 px-8 py-3 border-2 border-primary text-primary font-medium rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Sample Tours
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Match Tours Section */}
          <motion.div 
            className="text-center mb-12"
            ref={categoriesRef}
            initial={{ opacity: 0, y: 20 }}
            animate={categoriesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <p className="text-muted-foreground mb-2">Also Take A Look</p>
            <h3 className="text-2xl md:text-3xl font-display font-semibold">
              <span className="text-secondary">Made</span> Tours<br />
              <span className="text-muted-foreground text-lg font-normal">to Match your Travel Style</span>
            </h3>
          </motion.div>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {tourCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={categoriesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link 
                  to={category.href}
                  className="group block"
                >
                  <div className="grid grid-cols-2 gap-1 mb-3 rounded-xl overflow-hidden">
                    {category.images.map((img, idx) => (
                      <motion.div 
                        key={idx} 
                        className="aspect-square overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                      >
                        <img 
                          src={img} 
                          alt=""
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </motion.div>
                    ))}
                  </div>
                  <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors text-center">
                    {category.title}
                  </h4>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Coastline Section with Map */}
      <section className="py-20 bg-accent" ref={mapRef}>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Map Image */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              animate={mapInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <motion.img 
                src={mapImg} 
                alt="Map of Sri Lanka"
                className="w-full max-w-md mx-auto rounded-3xl shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={mapInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-primary font-medium tracking-wider uppercase text-sm">
                Explore the Island
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-semibold mt-3 mb-6">
                Discover Sri Lanka's Stunning Coastline
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                From the golden beaches of the south coast to the untouched shores of the east, 
                Sri Lanka offers over 1,340 km of breathtaking coastline. Experience pristine beaches, 
                world-class surfing, whale watching, and vibrant coastal towns.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-10">
                {[
                  { value: "1,340", label: "km of Coastline" },
                  { value: "8", label: "UNESCO Sites" },
                  { value: "26", label: "National Parks" },
                  { value: "100+", label: "Beach Resorts" },
                ].map((stat, index) => (
                  <motion.div 
                    key={index}
                    className="bg-card p-5 rounded-2xl hover:shadow-lg transition-shadow"
                    initial={{ opacity: 0, y: 20 }}
                    animate={mapInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <span className="text-3xl font-display font-bold text-primary">{stat.value}</span>
                    <p className="text-muted-foreground text-sm mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-medium rounded-full hover:bg-ocean-light hover:shadow-lg transition-all duration-300"
              >
                Plan Your Journey
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="relative py-24 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${honeymoonImg})` }}
        ref={ctaRef}
      >
        <div className="absolute inset-0 bg-foreground/70 backdrop-blur-sm" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h2 
            className="text-3xl md:text-5xl font-display font-bold text-primary-foreground mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Ready to Explore Sri Lanka?
          </motion.h2>
          <motion.p 
            className="text-primary-foreground/80 max-w-xl mx-auto mb-10 text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Let our travel experts craft your perfect Sri Lankan adventure. 
            Customized itineraries tailored to your preferences.
          </motion.p>
          <motion.div 
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-secondary text-secondary-foreground font-semibold rounded-full hover:shadow-lg hover:shadow-secondary/30 transition-all duration-300"
            >
              Get a Free Quote
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="tel:+94112345678"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-foreground/10 text-primary-foreground font-semibold rounded-full backdrop-blur-md border border-primary-foreground/30 hover:bg-primary-foreground/20 transition-all duration-300"
            >
              Call Us Now
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default SriLankaTours;
