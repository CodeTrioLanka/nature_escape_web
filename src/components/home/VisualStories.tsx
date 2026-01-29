import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import sigiriyaImg from "@/assets/sigiriya.jpg";
import teaImg from "@/assets/tea-plantations.jpg";
import templeImg from "@/assets/temple.jpg";
import beachImg from "@/assets/beach-paradise.jpg";
import wildlifeImg from "@/assets/wildlife.jpg";
import honeymoonImg from "@/assets/honeymoon.jpg";

const images = [
  { src: sigiriyaImg, alt: "Sigiriya Rock Fortress" },
  { src: teaImg, alt: "Tea Plantations" },
  { src: templeImg, alt: "Ancient Temple" },
  { src: beachImg, alt: "Tropical Beach" },
  { src: wildlifeImg, alt: "Wildlife Safari" },
  { src: honeymoonImg, alt: "Romantic Getaway" },
];

const VisualStories = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-24 bg-sand relative overflow-hidden" ref={ref}>
      {/* Background Text */}
      <motion.div 
        className="absolute top-0 left-0 right-0 text-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <span className="text-[80px] md:text-[140px] font-display italic font-bold text-muted-foreground/10 leading-none select-none">
          Visual Stories
        </span>
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16 pt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-medium tracking-wider uppercase text-sm">
            Gallery
          </span>
          <h2 className="section-title mt-3 mb-4">Captured Moments</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Glimpses of unforgettable experiences from our travelers
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
                index === 0 || index === 5 ? "md:row-span-2" : ""
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 0.98 }}
            >
              <motion.img
                src={image.src}
                alt={image.alt}
                className={`w-full object-cover transition-all duration-700 ${
                  index === 0 || index === 5 ? "h-[400px] md:h-full" : "h-[200px] md:h-[250px]"
                }`}
                whileHover={{ scale: 1.15 }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/0 to-foreground/0 opacity-0 group-hover:opacity-100 transition-all duration-500" />
              
              {/* Content */}
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
              >
                <div className="text-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-primary-foreground font-display font-semibold text-xl">
                    {image.alt}
                  </span>
                  <motion.div 
                    className="w-12 h-0.5 bg-secondary mx-auto mt-2"
                    initial={{ width: 0 }}
                    whileHover={{ width: 48 }}
                  />
                </div>
              </motion.div>

              {/* Border glow on hover */}
              <div className="absolute inset-0 border-2 border-secondary/0 group-hover:border-secondary/50 rounded-2xl transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisualStories;
