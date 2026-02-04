import { Link } from "react-router-dom";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTourCategories, TourCategory } from "@/api/tours.api";
import { optimizeImage } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import sigiriyaImg from "@/assets/sigiriya.jpg";
import teaImg from "@/assets/tea-plantations.jpg";
import wildlifeImg from "@/assets/wildlife.jpg";
import beachImg from "@/assets/beach-paradise.jpg";
import adventureImg from "@/assets/adventure.jpg";
import honeymoonImg from "@/assets/honeymoon.jpg";
import tourCategoriesBg from "@/assets/tour-categories-bg.jpg";

const staticCategories = [
  {
    title: "Cultural Tours",
    image: sigiriyaImg,
    href: "/sri-lanka-tours/cultural",
    rotate: "-3deg",
  },
  {
    title: "Hill Country",
    image: teaImg,
    href: "/sri-lanka-tours/hill-country",
    rotate: "2deg",
  },
  {
    title: "Wildlife Safari",
    image: wildlifeImg,
    href: "/sri-lanka-tours/wildlife",
    rotate: "-2deg",
  },
  {
    title: "Beach Escapes",
    image: beachImg,
    href: "/sri-lanka-tours/beach",
    rotate: "4deg",
  },
  {
    title: "Adventure Tours",
    image: adventureImg,
    href: "/sri-lanka-tours/adventure",
    rotate: "-4deg",
  },
  {
    title: "Honeymoon",
    image: honeymoonImg,
    href: "/sri-lanka-tours/honeymoon",
    rotate: "3deg",
  },
];

const TourCategories = () => {
  const ref = useRef(null);
  const bgRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });



  // Static fallback images
  const fallbackImages: { [key: string]: string } = {
    cultural: sigiriyaImg,
    "hill-country": teaImg,
    wildlife: wildlifeImg,
    beach: beachImg,
    adventure: adventureImg,
    honeymoon: honeymoonImg,
  };

  // Rotation values for visual effect
  const rotations = ["-3deg", "2deg", "-2deg", "4deg", "-4deg", "3deg"];

  // GSAP Parallax Effect
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (bgRef.current) {
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // React Query for data fetching
  const { data: fetchedCategories, isLoading } = useQuery({
    queryKey: ['tourCategories'],
    queryFn: fetchTourCategories,
    staleTime: 1000 * 60 * 60, // 1 hour (categories rarely change)
  });

  const [categories, setCategories] = useState<any[]>(staticCategories);

  useEffect(() => {
    if (fetchedCategories && fetchedCategories.length > 0) {
      const mappedCategories = fetchedCategories.map((cat, index) => ({
        title: cat.title,
        image: cat.images && cat.images.length > 0 ? cat.images[0] : fallbackImages[cat.slug] || sigiriyaImg,
        href: `/sri-lanka-tours/${cat.slug}`,
        rotate: rotations[index % rotations.length],
      }));
      setCategories(mappedCategories);
    }
  }, [fetchedCategories]);

  return (
    <section className="relative py-28 overflow-hidden" ref={ref}>
      {/* Parallax Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${tourCategoriesBg})`,
        }}
      >
        {/* Gradient overlay to blend with white section above */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#87CEEB]/30 to-transparent" style={{ height: '50%' }} />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
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
            Explore
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-6">
            Tour Categories
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-gray-700 max-w-2xl mx-auto text-lg leading-relaxed">
            Discover the diverse experiences Sri Lanka has to offer
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-10 pb-10">
          {categories.slice(0, 6).map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
              animate={isInView ? { opacity: 1, scale: 1, rotate: category.rotate } : {}}
              transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 100 }}
              className="relative group"
              style={{ zIndex: 1 }}
              whileHover={{
                scale: 1.1,
                rotate: 0,
                zIndex: 10,
                transition: { duration: 0.3 }
              }}
            >
              <Link
                to={category.href}
                className="block p-3 bg-white rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-300 transform"
              >
                <div className="relative w-64 h-64 md:w-72 md:h-72 overflow-hidden rounded-[1.5rem]">
                  <img
                    src={optimizeImage(category.image, 600)}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="absolute bottom-6 left-0 right-0 text-center px-4">
                    <h3 className="font-display font-bold text-white text-xl md:text-2xl tracking-wide drop-shadow-md">
                      {category.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Tours Button */}
        {categories.length > 6 && (
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
          >
            <Link
              to="/sri-lanka-tours"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <span>View All Tours</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default TourCategories;
