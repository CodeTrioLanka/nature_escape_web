import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

// Import images
import luxuryImg from "@/assets/honeymoon.jpg";
import weddingImg from "@/assets/beach-paradise.jpg";
import wellnessImg from "@/assets/tea-plantations.jpg";
import miceImg from "@/assets/colombo.webp";
import bgImage from "@/assets/adventure.jpg"; // Using adventure as background

const experiences = [
  {
    title: "Luxury Escapes",
    subtitle: "Premium Travel",
    price: "Custom",
    image: luxuryImg,
    features: ["5-Star Accommodations", "Private Chauffeur", "Exclusive Access", "Gourmet Dining"],
    href: "/sri-lanka-tours/honeymoon",
    delay: 0.1,
  },
  {
    title: "Wedding Journeys",
    subtitle: "Romantic Getaways",
    price: "Bespoke",
    image: weddingImg,
    features: ["Beachfront Venues", "Ceremony Planning", "Honeymoon Suites", "Photography Packages"],
    href: "/sri-lanka-tours/honeymoon",
    delay: 0.2,
  },
  {
    title: "Wellness Retreats",
    subtitle: "Health & Healing",
    price: "All-Inclusive",
    image: wellnessImg,
    features: ["Ayurvedic Treatments", "Yoga Sessions", "Organic Cuisine", "Mindfulness Guides"],
    href: "/sri-lanka-tours/ayurvedic",
    delay: 0.3,
  },
  {
    title: "MICE Solutions",
    subtitle: "Corporate Events",
    price: "Professional",
    image: miceImg,
    features: ["Conference Halls", "Team Building", "Gala Dinners", "Logistics Support"],
    href: "/contact",
    delay: 0.4,
  },
];

const ExclusiveExperiences = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <img src={bgImage} alt="Background" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white/90" />
      </div>

      {/* Torn Paper Effect Top (CSS Clip Path or SVG) */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-10">
        {/* Simplified clean curve for now, consistent with site theme */}
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span
            className="text-gold text-3xl md:text-4xl block mb-2"
            style={{ fontFamily: "'Brush Script MT', cursive" }}
          >
            Tailored For You
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6">
            Exclusive Experiences
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Discover specialized journeys designed to exceed your expectations
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          style={{ y }}
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: exp.delay }}
              className="group relative h-[500px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 bg-black border border-white/10"
            >
              {/* Full Background Image */}
              <motion.img
                src={exp.image}
                alt={exp.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
              />

              {/* Gradient Overlay - Stronger at bottom for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent transition-opacity duration-300" />

              {/* Content Container */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-left z-10 transition-all duration-500">

                {/* Title Section - Moves up slightly on hover */}
                <div className="transform transition-transform duration-500 group-hover:-translate-y-2 translate-y-8 group-hover:translate-y-0">
                  <h3 className="text-3xl font-display font-bold text-white mb-2 leading-tight drop-shadow-md">
                    {exp.title}
                  </h3>
                  <div className="flex items-center gap-3 text-white/90 mb-4">
                    <span className="text-gold font-bold text-lg">{exp.price}</span>
                    <span className="text-sm uppercase tracking-wider block opacity-80 border-l border-white/30 pl-3">
                      {exp.subtitle}
                    </span>
                  </div>

                  {/* Features & Button (Hidden by default, reveal on hover) */}
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                    <div className="overflow-hidden">
                      <div className="space-y-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {/* Features */}
                        <ul className="space-y-2">
                          {exp.features.slice(0, 3).map((feature, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm text-white/90">
                              <div className="w-5 h-5 rounded-full bg-gold/90 flex items-center justify-center text-black flex-shrink-0 shadow-sm">
                                <Check className="w-3 h-3 stroke-[3]" />
                              </div>
                              <span className="drop-shadow-sm font-medium">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Button */}
                        <Link
                          to={exp.href}
                          className="inline-flex items-center justify-center w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gold transition-colors duration-300 shadow-lg mt-2"
                        >
                          Explore Now <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ExclusiveExperiences;
