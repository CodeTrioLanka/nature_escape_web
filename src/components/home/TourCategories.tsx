import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
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
    rotate: "-3deg",
  },
  {
    title: "Hill Country",
    image: teaImg,
    href: "/sri-lanka-tours/hill-country",
    rotate: "2deg",
  },
  {
    title: "Wildlife Safari",
    image: wildlifeImg,
    href: "/sri-lanka-tours/wildlife",
    rotate: "-2deg",
  },
  {
    title: "Beach Escapes",
    image: beachImg,
    href: "/sri-lanka-tours/beach",
    rotate: "4deg",
  },
  {
    title: "Adventure Tours",
    image: adventureImg,
    href: "/sri-lanka-tours/adventure",
    rotate: "-4deg",
  },
  {
    title: "Honeymoon",
    image: honeymoonImg,
    href: "/sri-lanka-tours/honeymoon",
    rotate: "3deg",
  },
];

const TourCategories = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-28 bg-sand overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-20"
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

        <div className="flex flex-wrap justify-center gap-8 md:gap-10 pb-10">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
              animate={isInView ? { opacity: 1, scale: 1, rotate: category.rotate } : {}}
              transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 100 }}
              className="relative group"
              style={{ zIndex: 1 }}
              whileHover={{
                scale: 1.1,
                rotate: 0,
                zIndex: 10,
                transition: { duration: 0.3 }
              }}
            >
              <Link
                to={category.href}
                className="block p-3 bg-white rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-300 transform"
              >
                <div className="relative w-64 h-64 md:w-72 md:h-72 overflow-hidden rounded-[1.5rem]">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="absolute bottom-6 left-0 right-0 text-center px-4">
                    <h3 className="font-display font-bold text-white text-xl md:text-2xl tracking-wide drop-shadow-md">
                      {category.title}
                    </h3>
                  </div>
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
