import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroImage from "@/assets/hero-srilanka.jpg";

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const particlesY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={ref} className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${heroImage})`,
          y: backgroundY,
          scale: backgroundScale
        }}
      >
        <div className="absolute inset-0 hero-overlay" />
      </motion.div>

      {/* Floating Particles with Parallax */}
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ y: particlesY }}
      >
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-foreground/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-30, 30],
              x: [-10, 10],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </motion.div>

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-forest/20 rounded-full blur-3xl"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 200]) }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold/20 rounded-full blur-3xl"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -150]) }}
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, delay: 2 }}
      />

      {/* Content with Parallax */}
      <motion.div 
        className="container mx-auto px-4 relative z-10"
        style={{ y: textY, opacity }}
      >
        <div className="max-w-3xl">
          {/* <motion.span 
            className="inline-block px-4 py-1.5 bg-forest/90 backdrop-blur-sm text-primary-foreground text-sm font-medium rounded-full mb-6"
            initial={{ opacity: 0, y: 20, x: -50 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            ✨ Discover Untouched Paradise
          </motion.span>
           */}
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-primary-foreground leading-tight mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <motion.span
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Escape Into{" "}
            </motion.span>
            <motion.span 
              className="text-gold inline-block"
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
              whileHover={{ scale: 1.1, rotate: 3 }}
            >
              Nature's
            </motion.span>
            <br />
            <motion.span 
              className="text-primary-foreground/90"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Wonders
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-primary-foreground/85 max-w-xl mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Immerse yourself in Sri Lanka's pristine beaches, ancient rainforests, 
            and breathtaking wildlife. Your adventure into nature begins here.
          </motion.p>

          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <motion.div whileHover={{ scale: 1.05, x: 5 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/sri-lanka-tours"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-forest text-primary-foreground font-semibold rounded-lg hover:bg-forest/90 hover:shadow-lg hover:shadow-forest/30 transition-all duration-300"
              >
                Explore Adventures
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, x: -5 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/things-to-do"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-primary-foreground/10 text-primary-foreground font-semibold rounded-lg backdrop-blur-md border border-primary-foreground/30 hover:bg-primary-foreground/20 hover:border-primary-foreground/50 transition-all duration-300"
              >
                Things To Do
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator with Parallax */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        style={{ opacity }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2">
          <motion.span 
            className="text-primary-foreground/60 text-sm font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll to explore
          </motion.span>
          <div className="w-8 h-12 border-2 border-primary-foreground/50 rounded-full flex justify-center pt-2">
            <motion.div 
              className="w-1.5 h-3 bg-secondary rounded-full"
              animate={{ y: [0, 12, 0], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
