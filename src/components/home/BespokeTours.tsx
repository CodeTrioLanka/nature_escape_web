import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import honeymoonImg from "@/assets/honeymoon.jpg";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const features = [
  "Personalized itineraries designed just for you",
  "Flexible scheduling and private experiences",
  "Expert local guides and luxury accommodations",
];

const BespokeTours = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const contentY = useTransform(scrollYProgress, [0, 1], [50, -30]);
  const imageY = useTransform(scrollYProgress, [0, 1], [80, -50]);

  return (
    <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden" ref={ref}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.span 
              className="text-secondary font-medium tracking-wider uppercase text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Personalized
            </motion.span>
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold mt-3 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Tailor-made Bespoke Tours
            </motion.h2>
            <motion.p 
              className="text-primary-foreground/80 mb-8 leading-relaxed text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Create your perfect Sri Lanka journey with our bespoke tour service. 
              Tell us your dreams, and we'll craft an exclusive itinerary tailored 
              to your preferences, pace, and interests.
            </motion.p>
            
            <ul className="space-y-4 mb-10">
              {features.map((feature, index) => (
                <motion.li 
                  key={index}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                >
                  <motion.span 
                    className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Check className="w-4 h-4 text-secondary-foreground" />
                  </motion.span>
                  <span className="text-primary-foreground/90">{feature}</span>
                </motion.li>
              ))}
            </ul>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-secondary text-secondary-foreground font-semibold rounded-full hover:shadow-lg hover:shadow-secondary/30 transition-all duration-300"
              >
                Start Planning Your Trip
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative overflow-hidden rounded-3xl">
              <motion.img
                src={honeymoonImg}
                alt="Bespoke Tours"
                className="w-full h-[500px] object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
            </div>
            
            {/* Floating Stats Card with Animated Counter */}
            <motion.div 
              className="absolute -bottom-6 -left-6 bg-card text-foreground p-6 rounded-2xl shadow-2xl hidden lg:block"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6, type: "spring" }}
              whileHover={{ y: -8, scale: 1.05 }}
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-secondary/20 flex items-center justify-center">
                  <span className="text-2xl font-display font-bold text-primary">
                    <AnimatedCounter end={98} suffix="%" duration={2} />
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Customer Satisfaction</p>
                  <p className="text-sm text-muted-foreground">
                    Based on <AnimatedCounter end={500} suffix="+" duration={2.5} className="font-medium" /> reviews
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BespokeTours;
