import { Star, Quote, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import teaImg from "@/assets/tea-plantations.jpg";
import { fetchPublicReviews, Review } from "@/api/reviews.api";

const staticTestimonials = [
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
  const [reviews, setReviews] = useState<any[]>(staticTestimonials);
  const [loading, setLoading] = useState(true);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const cardsY = useTransform(scrollYProgress, [0, 1], [100, -50]);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await fetchPublicReviews();
        if (data && data.length > 0) {
          // Sort by rating (desc) and take top 3
          const topReviews = data
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 3)
            .map(r => ({
              name: r.name,
              location: r.source === 'google' ? 'Google Review' : 'Verified Traveler',
              rating: r.rating,
              text: r.reviewText,
              tour: new Date(r.reviewDate || r.createdAt).toLocaleDateString(),
              avatar: r.name.charAt(0).toUpperCase() + (r.name.split(' ')[1]?.[0]?.toUpperCase() || '')
            }));
          setReviews(topReviews);
        }
      } catch (error) {
        console.error("Failed to fetch reviews for home page", error);
      } finally {
        setLoading(false);
      }
    };
    loadReviews();
  }, []);

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
        className="absolute top-3 left-0 right-0 text-center pointer-events-none"
        style={{ y: textY }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <span className="text-[80px] md:text-[140px] font-display italic font-bold text-primary-foreground/10 leading-none select-none">
          Real Stories
        </span>
      </motion.div>

      <div className="container mt-10  mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span
            className="text-gold text-3xl md:text-4xl block mb-2"
            style={{ fontFamily: "'Brush Script MT', cursive" }}
          >
            Testimonials
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground mb-6">
            Tour Experiences
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-primary-foreground/70 max-w-2xl mx-auto text-lg leading-relaxed">
            Hear from travelers who've experienced the magic of Sri Lanka with us
          </p>
        </motion.div>

        {/* Auto-scrolling Marquee Container with Gradient Mask */}
        <div
          className="relative w-full overflow-hidden py-10"
          style={{
            y: cardsY,
            maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
          } as any}
        >
          <motion.div
            className="flex gap-6 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 40,
              repeat: Infinity
            }}
          >
            {[...reviews, ...reviews].map((testimonial, index) => (
              <div
                key={index}
                className="w-[380px] md:w-[420px] shrink-0 bg-white p-8 rounded-[2rem] shadow-lg flex flex-col relative overflow-hidden group border border-white/50"
              >
                {/* Header: User Info & Rating */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-4 items-center">
                    <div className="w-14 h-14 rounded-full bg-ocean-dark text-white flex items-center justify-center font-display font-bold text-xl shrink-0 shadow-md">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-foreground text-lg leading-tight">
                          {testimonial.name}
                        </h4>
                        {/* Blue Verified Badge */}
                        <div title="Verified Traveler">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-[#1D9BF0]">
                            <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .495.083.965.238 1.4-1.272.65-2.147 2.02-2.147 3.6 0 1.457.748 2.795 1.84 3.668-.19.537-.305 1.114-.305 1.712 0 2.613 2.094 4.73 4.685 4.73.535 0 1.05-.084 1.532-.236C10.04 22.84 11.236 23.5 12.5 23.5c1.157 0 2.26-.547 2.977-1.4.526.177 1.09.28 1.674.28 2.59 0 4.685-2.117 4.685-4.73 0-.598-.115-1.175-.305-1.712 1.092-.873 1.84-2.21 1.84-3.668zM10.957 17.52l-3.32-3.13 1.487-1.573 1.74 1.64 4.542-4.8 1.573 1.488-5.93 6.265z" />
                          </svg>
                        </div>
                      </div>
                      <p className="text-sm text-gray-400 font-medium mt-0.5">{testimonial.tour}</p>
                    </div>
                  </div>

                  {/* Quote Icon Top Right - Outlined Style */}
                  <Quote className="w-10 h-10 text-gold/30 fill-transparent stroke-[1.5]" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < testimonial.rating ? "fill-[#F59E0B] text-[#F59E0B]" : "fill-gray-200 text-gray-200"}`}
                    />
                  ))}
                </div>

                {/* Review Text */}
                <div className="relative z-10">
                  <p className="text-gray-600 leading-relaxed text-[15px] font-serif tracking-wide italic">
                    "{testimonial.text}"
                  </p>
                </div>

                {/* Decorative Corner Glow */}
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br from-gold/10 to-primary/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <Link
            to="/reviews"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-full backdrop-blur-md overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:scale-105"
          >
            <span className="relative z-10 text-white font-medium tracking-wide">Read All Reviews</span>
            <ArrowRight className="w-5 h-5 text-gold group-hover:translate-x-1 transition-transform" />

            {/* Shimmer Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
