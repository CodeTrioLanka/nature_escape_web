import { Star, Quote } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import teaImg from "@/assets/tea-plantations.jpg";

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "United Kingdom",
    rating: 5,
    text: "An absolutely incredible experience! The attention to detail and personal touches made our honeymoon unforgettable. The team went above and beyond.",
    tour: "Romantic Honeymoon Tour",
    avatar: "SJ",
  },
  {
    name: "Michael Chen",
    location: "Singapore",
    rating: 5,
    text: "Professional service from start to finish. Our guide was knowledgeable and passionate about Sri Lanka's history. Highly recommend!",
    tour: "Cultural Triangle Explorer",
    avatar: "MC",
  },
  {
    name: "Emma Williams",
    location: "Australia",
    rating: 5,
    text: "The wildlife safari exceeded all expectations. We saw leopards, elephants, and so many birds. The lodges were luxurious too!",
    tour: "Wildlife Safari Adventure",
    avatar: "EW",
  },
];

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const cardsY = useTransform(scrollYProgress, [0, 1], [100, -50]);

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background with Parallax */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${teaImg})`, y: bgY, scale: 1.1 }}
      />
      <div className="absolute inset-0 bg-foreground/90 backdrop-blur-sm" />

      {/* Background Text with Parallax */}
      <motion.div 
        className="absolute top-0 left-0 right-0 text-center pointer-events-none"
        style={{ y: textY }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <span className="text-[80px] md:text-[140px] font-display italic font-bold text-primary-foreground/5 leading-none select-none">
          real stories
        </span>
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-secondary font-medium tracking-wider uppercase text-sm">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-primary-foreground mt-3 mb-4">
            Tour Experiences
          </h2>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto">
            Hear from travelers who've experienced the magic of Sri Lanka with us
          </p>
        </motion.div>

        <motion.div className="grid md:grid-cols-3 gap-8" style={{ y: cardsY }}>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-card/95 backdrop-blur-md p-8 rounded-3xl shadow-2xl"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
            >
              <motion.div
                initial={{ rotate: 0 }}
                whileHover={{ rotate: 12, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <Quote className="w-12 h-12 text-secondary/30 mb-4" />
              </motion.div>
              
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                  >
                    <Star className="w-5 h-5 fill-secondary text-secondary" />
                  </motion.div>
                ))}
              </div>
              
              <p className="text-foreground mb-6 leading-relaxed italic">
                "{testimonial.text}"
              </p>
              
              <div className="border-t border-border pt-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-display font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  <p className="text-sm text-primary mt-0.5">{testimonial.tour}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
