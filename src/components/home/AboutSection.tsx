import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import heroImage from "@/assets/hero-srilanka.jpg";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const stats = [
  { value: 56, suffix: "+", label: "Years of Experience" },
  { value: 175, suffix: "+", label: "Expert Team Members" },
  { value: 300, suffix: "+", label: "Curated Destinations" },
  { value: 600, suffix: "+", label: "Happy Travelers" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const contentY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const decorY = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const statsY = useTransform(scrollYProgress, [0, 1], [80, -40]);

  return (
    <section className="py-24 bg-background overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image with Parallax */}
          <motion.div 
            className="relative"
            style={{ y: imageY }}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <motion.img
                src={heroImage}
                alt="Sri Lanka Destination"
                className="w-full h-[500px] object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
            </div>
            {/* Decorative Elements with Parallax */}
            <motion.div 
              className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-primary to-ocean-dark rounded-2xl hidden lg:block -z-10"
              style={{ y: decorY }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
            <motion.div 
              className="absolute -top-4 -left-4 w-24 h-24 bg-secondary/20 rounded-full blur-2xl hidden lg:block"
              style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </motion.div>

          {/* Content with Parallax */}
          <motion.div
            style={{ y: contentY }}
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
              Sri Lanka's Leading
            </motion.span>
            <motion.h2 
              className="section-title mt-3 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Destination Management Company
            </motion.h2>
            <motion.p 
              className="text-muted-foreground mb-6 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Ceylon Tours is a leading Destination Management Company in Sri Lanka, 
              offering premium travel experiences since 1970. We specialize in creating 
              bespoke journeys that showcase the authentic beauty and rich culture of 
              the Pearl of the Indian Ocean.
            </motion.p>
            <motion.p 
              className="text-muted-foreground mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              From ancient temples and pristine beaches to lush tea plantations and 
              exotic wildlife, we craft unforgettable experiences tailored to your dreams.
            </motion.p>

            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <h3 className="font-display font-semibold text-xl mb-4 text-foreground">
                Why Book with Ceylon Tours?
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                {[
                  "Award-winning service excellence",
                  "Local expertise with global standards",
                  "Sustainable and responsible tourism"
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                  >
                    <span className="w-2 h-2 bg-secondary rounded-full" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-ocean-light hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
              >
                Learn More About Us
                <motion.span
                  className="inline-block"
                  whileHover={{ x: 5 }}
                >
                  →
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats with Animated Counters */}
        <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20" style={{ y: statsY }}>
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-8 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-500 group"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="text-4xl md:text-5xl font-display font-bold text-primary mb-2">
                <AnimatedCounter 
                  end={stat.value} 
                  suffix={stat.suffix} 
                  duration={2.5}
                />
              </div>
              <div className="text-muted-foreground text-sm group-hover:text-primary transition-colors">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
