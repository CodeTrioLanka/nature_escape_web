import { Link } from "react-router-dom";
import { Plane, Heart, Leaf, Briefcase, ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const experiences = [
  {
    icon: Plane,
    title: "Luxury Escapes",
    description: "Indulge in 5-star resorts, private villas, and exclusive experiences",
    href: "/sri-lanka-tours/honeymoon",
    gradient: "from-blue-500/20 to-purple-500/20",
  },
  {
    icon: Heart,
    title: "Wedding Journeys",
    description: "Celebrate your love with a dream destination wedding or honeymoon",
    href: "/sri-lanka-tours/honeymoon",
    gradient: "from-pink-500/20 to-red-500/20",
  },
  {
    icon: Leaf,
    title: "Wellness Retreats",
    description: "Rejuvenate with Ayurveda, yoga, and holistic healing experiences",
    href: "/sri-lanka-tours/ayurvedic",
    gradient: "from-green-500/20 to-teal-500/20",
  },
  {
    icon: Briefcase,
    title: "MICE Solutions",
    description: "Professional corporate events, conferences, and incentive tours",
    href: "/contact",
    gradient: "from-orange-500/20 to-amber-500/20",
  },
];

const ExclusiveExperiences = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const headerY = useTransform(scrollYProgress, [0, 1], [60, -40]);
  const cardsContainerY = useTransform(scrollYProgress, [0, 1], [80, -30]);
  const bgPatternY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section className="py-24 bg-sand overflow-hidden relative" ref={ref}>
      {/* Parallax Background Pattern */}
      <motion.div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ y: bgPatternY }}
      >
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-secondary blur-3xl" />
      </motion.div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          style={{ y: headerY }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-medium tracking-wider uppercase text-sm">
            A Symphony of
          </span>
          <h2 className="section-title mt-3 mb-4">Exclusive Experiences</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Beyond ordinary travel - discover curated experiences for discerning travelers
          </p>
        </motion.div>

        <motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" style={{ y: cardsContainerY }}>
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={exp.href}
                className="group block bg-card p-8 rounded-3xl border border-border hover:border-primary/30 hover:shadow-2xl transition-all duration-500 relative overflow-hidden h-full"
              >
                {/* Background Gradient on Hover */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${exp.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
                
                <div className="relative z-10">
                  <motion.div 
                    className="w-16 h-16 mb-6 rounded-2xl bg-accent flex items-center justify-center group-hover:bg-primary transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <exp.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
                  </motion.div>
                  
                  <h3 className="font-display font-semibold text-xl mb-3 text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                    {exp.title}
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ExclusiveExperiences;
