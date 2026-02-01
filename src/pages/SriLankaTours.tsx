import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/common/PageHero";
import { fetchTourCategories, TourCategory } from "@/api/tours.api";

// Hero images
import beachSurfImg from "@/assets/ballon.jpg";
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



const SriLankaTours = () => {
  const [tourCategories, setTourCategories] = useState<TourCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const toursRef = useRef(null);
  const categoriesRef = useRef(null);
  const mapRef = useRef(null);
  const ctaRef = useRef(null);

  // Fetch tour categories from backend
  useEffect(() => {
    const loadTourCategories = async () => {
      try {
        setLoading(true);
        const data = await fetchTourCategories();
        setTourCategories(data);
        setError(null);
      } catch (err) {
        console.error('Error loading tour categories:', err);
        setError('Failed to load tour categories. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadTourCategories();
  }, []);

  const toursInView = useInView(toursRef, { once: true, margin: "-50px" });
  const categoriesInView = useInView(categoriesRef, { once: true, margin: "-50px" });
  const mapInView = useInView(mapRef, { once: true, margin: "-50px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-50px" });

  return (
    <Layout>
      {/* Hero Section with PageHero Component */}
      <PageHero
        title="Sri Lanka Tours"
        subtitle="Explore the pearl of the Indian Ocean with our curated tour packages"
        backgroundImage={beachSurfImg}
        height="h-[65vh] min-h-[500px]"
      />

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
              Sri Lanka tourism offers a unique mix of ancient history, tropical beaches, wildlife safaris, Ceylon tea, surfing locations, and local cuisine.
            </p>
          </motion.div>

          {/* Sample Tours Row */}
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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
          </div> */}

          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0 }}
            animate={toursInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {/* <Link 
              to="/sri-lanka-tours/sample"
              className="group inline-flex items-center gap-2 px-8 py-3 border-2 border-primary text-primary font-medium rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Sample Tours
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link> */}
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
              <span className="">Made</span> Tours<br />
              <span className="text-muted-foreground text-lg font-normal">to Match your Travel Style</span>
            </h3>
          </motion.div>

          {/* Categories Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
              <p className="mt-4 text-muted-foreground">Loading tour categories...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : tourCategories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No tour categories available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {tourCategories.map((category, index) => (
                <motion.div
                  key={category._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={categoriesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Link
                    to={`/sri-lanka-tours/${category.slug}`}
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
                            alt={`${category.title} - Image ${idx + 1}`}
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
          )}
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
                Sri Lanka is home to over 1,340 km of beautiful coastline, stretching from the golden beaches of the south coast to the unspoiled shores of the east.

                Enjoy pristine beaches, world-class surfing, whale watching experiences, and lively coastal towns across the island
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
