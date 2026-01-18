import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import sigiriyaImg from "@/assets/sigiriya.jpg";
import teaImg from "@/assets/tea-plantations.jpg";
import wildlifeImg from "@/assets/wildlife.jpg";
import beachImg from "@/assets/beach-paradise.jpg";
import adventureImg from "@/assets/adventure.jpg";
import honeymoonImg from "@/assets/honeymoon.jpg";

const categories = [
  {
    title: "Cultural Tours",
    image: sigiriyaImg,
    href: "/sri-lanka-tours/cultural",
  },
  {
    title: "Hill Country",
    image: teaImg,
    href: "/sri-lanka-tours/hill-country",
  },
  {
    title: "Wildlife Safari",
    image: wildlifeImg,
    href: "/sri-lanka-tours/wildlife",
  },
  {
    title: "Beach Escapes",
    image: beachImg,
    href: "/sri-lanka-tours/beach",
  },
  {
    title: "Adventure Tours",
    image: adventureImg,
    href: "/sri-lanka-tours/adventure",
  },
  {
    title: "Honeymoon",
    image: honeymoonImg,
    href: "/sri-lanka-tours/honeymoon",
  },
];

const TourCategories = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-24 bg-sand overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-medium tracking-wider uppercase text-sm">
            Explore
          </span>
          <h2 className="section-title mt-3 mb-4">Tour Categories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the diverse experiences Sri Lanka has to offer
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={category.href}
                className="group relative h-72 overflow-hidden rounded-2xl block"
              >
                <motion.img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent group-hover:from-primary/90 transition-all duration-500" />
                
                {/* Hover Overlay */}
                <motion.div 
                  className="absolute inset-0 bg-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <motion.h3 
                    className="font-display font-semibold text-primary-foreground text-base text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    {category.title}
                  </motion.h3>
                  <motion.div 
                    className="w-0 h-0.5 bg-secondary mx-auto mt-2 group-hover:w-12 transition-all duration-300"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TourCategories;
