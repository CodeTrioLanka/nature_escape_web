import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const milestones = [
  { year: "1970", title: "Founded", description: "Ceylon Tours was established" },
  { year: "1985", title: "Expansion", description: "Opened regional offices" },
  { year: "2000", title: "Award", description: "First tourism excellence award" },
  { year: "2010", title: "Innovation", description: "Digital transformation" },
  { year: "2020", title: "Sustainability", description: "Green tourism initiative" },
  { year: "2024", title: "Today", description: "Leading DMC in Sri Lanka" },
];

const Journey = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [80, -60]);
  const timelineY = useTransform(scrollYProgress, [0, 1], [100, -50]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section className="py-24 bg-primary text-primary-foreground overflow-hidden relative" ref={ref}>
      {/* Parallax Background Pattern */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,_currentColor_1px,_transparent_0)] bg-[size:60px_60px]" />
      </motion.div>

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-1/4 left-10 w-32 h-32 bg-secondary/20 rounded-full blur-2xl"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 150]) }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-10 w-48 h-48 bg-primary-foreground/10 rounded-full blur-3xl"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
        animate={{ scale: [1.2, 1, 1.2] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          style={{ y: headerY }}
        >
          <motion.span 
            className="text-secondary font-medium tracking-wider uppercase text-sm"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Our Journey of
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold mt-3 mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
          >
            <AnimatedCounter end={56} suffix="+" duration={2.5} /> Years
          </motion.h2>
          <motion.p 
            className="text-primary-foreground/70 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            A legacy of excellence in Sri Lankan tourism
          </motion.p>
        </motion.div>

        <motion.div className="relative" style={{ y: timelineY }}>
          {/* Timeline line with animation */}
          <motion.div 
            className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent -translate-y-1/2"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.3 }}
          />

          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                className="relative text-center"
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.15, type: "spring" }}
              >
                {/* Animated Dot */}
                <motion.div 
                  className="hidden md:block absolute top-1/2 left-1/2 w-6 h-6 bg-secondary rounded-full -translate-x-1/2 -translate-y-1/2 z-10 shadow-lg shadow-secondary/50"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.1, type: "spring" }}
                  whileHover={{ scale: 1.8, boxShadow: "0 0 30px rgba(218,165,32,0.6)" }}
                />
                
                <motion.div 
                  className={`${index % 2 === 0 ? "md:pb-28" : "md:pt-28"}`}
                  whileHover={{ y: index % 2 === 0 ? -10 : 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.span 
                    className="text-4xl md:text-5xl font-display font-bold text-secondary inline-block"
                    whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    {milestone.year}
                  </motion.span>
                  <motion.h4 
                    className="font-display font-semibold mt-2 mb-1"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    {milestone.title}
                  </motion.h4>
                  <motion.p 
                    className="text-primary-foreground/70 text-sm"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    {milestone.description}
                  </motion.p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Journey;
