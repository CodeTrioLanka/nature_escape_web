import { Link } from "react-router-dom";
import { Clock, MapPin, Star } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import sigiriyaImg from "@/assets/sigiriya.jpg";
import teaImg from "@/assets/tea-plantations.jpg";
import templeImg from "@/assets/temple.jpg";
import wildlifeImg from "@/assets/wildlife.jpg";

const tours = [
  {
    id: 1,
    title: "Sigiriya & Ancient Cities",
    category: "Cultural",
    duration: "5 Days",
    location: "Central Province",
    rating: 4.9,
    reviews: 156,
    price: 890,
    image: sigiriyaImg,
    href: "/sri-lanka-tours/cultural",
  },
  {
    id: 2,
    title: "Tea Country Explorer",
    category: "Hill Country",
    duration: "4 Days",
    location: "Nuwara Eliya",
    rating: 4.8,
    reviews: 98,
    price: 720,
    image: teaImg,
    href: "/sri-lanka-tours/hill-country",
  },
  {
    id: 3,
    title: "Temple Trail Journey",
    category: "Cultural",
    duration: "6 Days",
    location: "Cultural Triangle",
    rating: 4.9,
    reviews: 203,
    price: 1150,
    image: templeImg,
    href: "/sri-lanka-tours/cultural",
  },
  {
    id: 4,
    title: "Wildlife Safari Adventure",
    category: "Wildlife",
    duration: "3 Days",
    location: "Yala National Park",
    rating: 4.7,
    reviews: 124,
    price: 550,
    image: wildlifeImg,
    href: "/sri-lanka-tours/wildlife",
  },
];

const FeaturedTours = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [100, -50]);
  const cardsY = useTransform(scrollYProgress, [0, 1], [150, -80]);
  const backgroundX = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} className="py-20 bg-sand relative overflow-hidden">
      {/* Parallax Background Pattern */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        style={{ x: backgroundX }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_var(--primary)_1px,_transparent_0)] bg-[size:40px_40px]" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header with Parallax */}
        <motion.div 
          className="text-center mb-14"
          style={{ y: headerY }}
        >
          <motion.span 
            className="text-primary font-medium tracking-wider uppercase text-sm inline-block"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Popular Packages
          </motion.span>
          <motion.h2 
            className="section-title mt-3 mb-4"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Featured Sri Lanka Tours
          </motion.h2>
          <motion.p 
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Handpicked experiences showcasing the best of Sri Lanka's culture, nature, and adventure
          </motion.p>
        </motion.div>

        {/* Tours Grid with Parallax */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          style={{ y: cardsY }}
        >
          {tours.map((tour, index) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 80, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15, type: "spring" }}
              whileHover={{ y: -15, scale: 1.02 }}
            >
              <Link to={tour.href} className="tour-card group block">
                <div className="relative h-56 overflow-hidden">
                  <motion.img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.span 
                    className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full"
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    {tour.category}
                  </motion.span>
                </div>
                
                <div className="p-5">
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                    {tour.title}
                  </h3>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {tour.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {tour.location}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-secondary text-secondary" />
                      <span className="font-medium text-sm">{tour.rating}</span>
                      <span className="text-muted-foreground text-sm">({tour.reviews})</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-sm">From </span>
                      <span className="font-bold text-primary">${tour.price}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Link */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/sri-lanka-tours"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-ocean-light transition-colors"
            >
              View All Sri Lanka Tours
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedTours;
