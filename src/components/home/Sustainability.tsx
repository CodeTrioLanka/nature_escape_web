import { Leaf, TreePine, Recycle, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import wildlifeImg from "@/assets/wildlife.jpg";

const initiatives = [
  {
    icon: Leaf,
    title: "Eco-Friendly Practices",
    description: "Reducing plastic waste and promoting sustainable tourism",
  },
  {
    icon: TreePine,
    title: "Conservation Support",
    description: "Supporting local wildlife and habitat conservation projects",
  },
  {
    icon: Recycle,
    title: "Community Impact",
    description: "Empowering local communities through responsible tourism",
  },
  {
    icon: Globe,
    title: "Carbon Neutral",
    description: "Working towards carbon-neutral travel experiences",
  },
];

const Sustainability = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-background overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div 
            className="order-2 lg:order-1 relative"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <motion.img
                src={wildlifeImg}
                alt="Sustainable Tourism"
                className="w-full h-[500px] object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/30 to-transparent" />
            </div>
            
            {/* Decorative Leaf */}
            <motion.div 
              className="absolute -top-6 -right-6 w-24 h-24 bg-forest/20 rounded-full blur-xl hidden lg:block"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </motion.div>

          {/* Content */}
          <motion.div 
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span 
              className="text-primary font-medium tracking-wider uppercase text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Travel Smart
            </motion.span>
            <motion.h2 
              className="section-title mt-3 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Tread Lightly
            </motion.h2>
            <motion.p 
              className="text-muted-foreground mb-10 leading-relaxed text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              We believe in responsible tourism that preserves Sri Lanka's natural 
              beauty and cultural heritage for generations to come. Our sustainable 
              practices ensure your journey makes a positive impact.
            </motion.p>

            <div className="grid grid-cols-2 gap-6">
              {initiatives.map((initiative, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-start gap-4 group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                >
                  <motion.div 
                    className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors duration-300"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                  >
                    <initiative.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </motion.div>
                  <div>
                    <h4 className="font-display font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {initiative.title}
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {initiative.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Sustainability;
