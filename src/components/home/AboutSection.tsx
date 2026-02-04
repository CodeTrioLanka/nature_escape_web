import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import heroImage from "@/assets/hero-srilanka.jpg";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { fetchAboutUsData } from "@/api/aboutUs.api";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Fetch About Us data from backend
  const { data: aboutUsData, isLoading, error } = useQuery({
    queryKey: ['aboutUs'],
    queryFn: fetchAboutUsData,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  // Prepare stats from API data or use defaults
  const stats = aboutUsData?.stats ? [
    { value: aboutUsData.stats.yearExperience || 56, suffix: "+", label: "Years of Experience" },
    { value: aboutUsData.stats.happyTravelers || 175, suffix: "+", label: "Expert Team Members" },
    { value: aboutUsData.stats.toursCompleted || 300, suffix: "+", label: "Total Tours" },
    { value: aboutUsData.stats.destination || 600, suffix: "+", label: "Happy Travelers" },
  ] : [
    { value: 56, suffix: "+", label: "Years of Experience" },
    { value: 175, suffix: "+", label: "Expert Team Members" },
    { value: 300, suffix: "+", label: "Total Tours" },
    { value: 600, suffix: "+", label: "Happy Travelers" },
  ];

  // Get hero data from API or use defaults
  const heroData = aboutUsData?.hero || {
    heroTitle: "Destination Management Company",
    heroDescription: "Ceylon Tours is a leading Destination Management Company in Sri Lanka, offering premium travel experiences since 1970.",
    heroBackground: heroImage
  };

  const displayImage = aboutUsData?.hero?.heroBackground || heroImage;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const contentY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const decorY = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const statsY = useTransform(scrollYProgress, [0, 1], [80, -40]);
  const circleY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  // Show loading state
  if (isLoading) {
    return (
      <section className="py-24 bg-background overflow-hidden" ref={ref}>
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-muted rounded w-2/3 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  // Show error state (but still render with defaults)
  if (error) {
    console.error('Error loading About Us data:', error);
  }

  return (
    <section className="py-24 bg-background overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image with Parallax */}
          <motion.div
            className="relative p-4 md:p-6"
            style={{ y: imageY }}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Main Image Container */}
            <div className="relative z-10 mx-auto max-w-md transform transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] rounded-[2.5rem] bg-white p-2 shadow-2xl group">
              <div className="relative overflow-hidden rounded-[2rem] h-[380px] md:h-[480px] w-full">
                <motion.img
                  src={displayImage}
                  alt={heroData.heroTitle || "Sri Lanka Destination"}
                  className="h-full w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,0.8,0.25,1)] group-hover:scale-110"
                />

                {/* Gloss/Shine Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60" />
              </div>

              {/* Elegant Border Line */}
              <div className="absolute inset-3 rounded-[2.2rem] border border-gray-100 pointer-events-none" />
            </div>
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
              Sri Lanka’s Leading
            </motion.span>
            <motion.h2
              className="section-title mt-3 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {heroData.heroTitle}
            </motion.h2>
            <motion.p
              className="text-xl font-bold text-foreground mb-4 leading-relaxed text-justify"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Experience the beauty of Sri Lanka with Nature Escape.
            </motion.p>
            <motion.p
              className="text-muted-foreground mb-6 leading-relaxed text-justify"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {heroData.heroDescription}
            </motion.p>


            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <Link
                to="/about"
                className="group relative inline-flex items-center gap-3 px-10 py-4 bg-primary text-primary-foreground font-bold rounded-full overflow-hidden transition-all duration-500 uppercase tracking-[0.2em] text-xs md:text-sm shadow-lg hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95"
              >
                {/* 1. Animated Background Fill */}
                <div className="absolute inset-0 bg-gradient-to-r from-ocean-light via-ocean to-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />

                {/* 2. Shimmer/Glint effect */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />

                <span className="relative z-10">About Us</span>

                {/* 3. Highly dynamic arrow */}
                <div className="relative z-10 flex items-center">
                  <span className="inline-block text-xl transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-8 group-hover:opacity-0">
                    →
                  </span>
                  <span className="absolute left-0 inline-block text-xl -translate-x-8 opacity-0 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-0 group-hover:opacity-100">
                    →
                  </span>
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats with Animated Counters */}
        <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20" style={{ y: statsY }}>
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="relative p-6 rounded-2xl bg-white shadow-xl shadow-black/5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100 group overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              {/* Decorative background gradient blob */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-ocean/5 rounded-full blur-2xl group-hover:bg-ocean/10 transition-colors duration-500" />

              {/* Content */}
              <div className="relative z-10 text-center">
                <div className="text-4xl md:text-5xl font-display font-bold mb-3 bg-gradient-to-br from-primary via-ocean-dark to-ocean bg-clip-text text-transparent">
                  <AnimatedCounter
                    end={stat.value}
                    suffix={stat.suffix}
                    duration={2.5}
                  />
                </div>
                <div className="h-1 w-12 mx-auto bg-gradient-to-r from-transparent via-gold to-transparent mb-3 opacity-50" />
                <div className="text-muted-foreground font-medium text-xs uppercase tracking-widest group-hover:text-ocean-dark transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
