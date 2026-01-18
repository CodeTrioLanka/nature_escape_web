import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import sigiriyaImg from "@/assets/sigiriya.jpg";
import teaImg from "@/assets/tea-plantations.jpg";
import templeImg from "@/assets/temple.jpg";
import wildlifeImg from "@/assets/wildlife.jpg";
import beachImg from "@/assets/beach-unawatuna.jpg";
import familyImg from "@/assets/family-beach.jpg";

const packages = [
  {
    id: 1,
    title: "Cultural Triangle Explorer",
    duration: "7 Days / 6 Nights",
    description: "Explore ancient kingdoms, sacred temples, and UNESCO World Heritage sites",
    image: sigiriyaImg,
    href: "/tour/cultural-triangle-explorer",
  },
  {
    id: 2,
    title: "Tea Country Retreat",
    duration: "5 Days / 4 Nights",
    description: "Journey through misty mountains and lush tea plantations",
    image: teaImg,
    href: "/tour/tea-country-retreat",
  },
  {
    id: 3,
    title: "Spiritual Pilgrimage",
    duration: "6 Days / 5 Nights",
    description: "Visit sacred Buddhist and Hindu temples across the island",
    image: templeImg,
    href: "/tour/spiritual-pilgrimage",
  },
  {
    id: 4,
    title: "Wildlife Safari Adventure",
    duration: "4 Days / 3 Nights",
    description: "Encounter leopards, elephants, and exotic birds in their natural habitat",
    image: wildlifeImg,
    href: "/tour/wildlife-safari-adventure",
  },
  {
    id: 5,
    title: "Beach Paradise Getaway",
    duration: "6 Days / 5 Nights",
    description: "Relax on pristine beaches and experience coastal charm",
    image: beachImg,
    href: "/tour/beach-paradise-getaway",
  },
  {
    id: 6,
    title: "Family Fun Explorer",
    duration: "8 Days / 7 Nights",
    description: "Perfect family adventure with activities for all ages",
    image: familyImg,
    href: "/tour/family-fun-explorer",
  },
];

const TourPackages = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const bgTextY = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const headerY = useTransform(scrollYProgress, [0, 1], [50, -30]);

  return (
    <section className="py-24 bg-background relative overflow-hidden" ref={ref}>
      {/* Background Text with Parallax */}
      <motion.div 
        className="absolute top-10 left-0 right-0 text-center pointer-events-none"
        style={{ y: bgTextY }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <span className="text-[100px] md:text-[160px] font-display font-bold text-muted/20 leading-none select-none">
          unforgettable
        </span>
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16 pt-20"
          style={{ y: headerY }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-medium tracking-wider uppercase text-sm">
            Featured
          </span>
          <h2 className="section-title mt-3 mb-4">Tour Packages</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Carefully curated travel experiences designed to create lasting memories
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={pkg.href}
                className="group block bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative h-56 overflow-hidden">
                  <motion.img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Hover Badge */}
                  <motion.div 
                    className="absolute top-4 right-4 px-3 py-1.5 bg-secondary/90 backdrop-blur-sm rounded-full text-secondary-foreground text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ x: 20 }}
                    whileHover={{ x: 0 }}
                  >
                    Book Now
                  </motion.div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-primary text-sm mb-3">
                    <Clock className="w-4 h-4" />
                    {pkg.duration}
                  </div>
                  <h3 className="font-display font-semibold text-xl text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {pkg.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {pkg.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-4 transition-all duration-300">
                    View Details
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Link
            to="/sri-lanka-tours"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-medium rounded-full hover:bg-ocean-light hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
          >
            View All Tours
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TourPackages;
