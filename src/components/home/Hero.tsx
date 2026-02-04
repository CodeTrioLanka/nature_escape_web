import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import logo from "@/assets/nature-escape-logo.png";
import { fetchHomeData, HomeData } from "@/api/home.api";
import { optimizeImage } from "@/lib/utils";

const Hero = () => {
  const [imgLoaded, setImgLoaded] = useState(false);

  // React Query for data fetching
  const { data: homeData, isLoading } = useQuery({
    queryKey: ['homeData'],
    queryFn: fetchHomeData,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 60, // Keep in cache for 1 hour
  });

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Check if homebg contains a video URL
  const isHomebgVideo = homeData?.homebg && (
    homeData.homebg.includes('video/upload') ||
    homeData.homebg.includes('.mp4') ||
    homeData.homebg.includes('.webm') ||
    homeData.homebg.includes('.mov')
  );

  // Prioritize homebgVideo field, then check if homebg is a video, otherwise use as image
  const backgroundVideo = homeData?.homebgVideo || (isHomebgVideo ? homeData?.homebg : null);

  const backgroundImage = (!isHomebgVideo) ? homeData?.homebg : null;
  const isVideo = !!backgroundVideo;

  return (
    <section
      ref={ref}
      className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden -mt-20"
    >
      {/* Background Video/Image with Parallax Effect */}
      {isVideo ? (
        <motion.div
          className="absolute inset-0 overflow-hidden"
          style={{
            y: backgroundY,
            scale: backgroundScale,
          }}
        >
          <video
            key={backgroundVideo}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            src={backgroundVideo}
            onError={(e) => console.error('Video failed to load:', e)}
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      ) : (
        <motion.div
          className="absolute inset-0"
          style={{
            y: backgroundY,
            scale: backgroundScale,
          }}
        >
          {/* Use img tag for faster loading and priority */}
          {/* Use img tag for faster loading and priority */}
          <motion.img
            src={optimizeImage(backgroundImage, 1920)}
            alt="Hero Background"
            className="absolute inset-0 w-full h-full object-cover"
            // @ts-ignore - fetchPriority is standard but React might complain on some versions
            fetchPriority="high"
            loading="eager"
            initial={{ opacity: 0 }}
            animate={{ opacity: imgLoaded ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            onLoad={() => setImgLoaded(true)}
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      )}

      {/* Content - Centered Layout */}
      <motion.div
        className="container mx-auto px-4 relative z-10 text-center"
        style={{ y: textY, opacity }}
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <img
              src={logo}
              alt="Nature Escape"
              className="h-24 md:h-32 w-auto drop-shadow-2xl"
            />
          </motion.div>

          {/* "Discover the" - Script Style */}
          <motion.p
            className="text-2xl md:text-3xl text-primary-foreground/90 mb-4 font-light italic"
            style={{
              fontFamily: "'Brush Script MT', cursive",
              textShadow: "0 2px 10px rgba(0,0,0,0.5)"
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover the
          </motion.p>

          {/* Main Title */}
          <motion.h1
            className="text-5xl md:text-6xl lg:text-8xl font-display font-bold text-primary-foreground leading-tight mb-6"
            style={{ textShadow: "0 4px 20px rgba(0,0,0,0.7)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {homeData?.title || "Adventure Travel"}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mb-10 leading-relaxed"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {homeData?.subtitle}
          </motion.p>

          {/* CTA Button - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col md:flex-row gap-4 justify-center items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/sri-lanka-tours"
                className="inline-flex items-center gap-2 px-10 py-4 bg-primary-foreground text-forest font-bold text-lg rounded-lg hover:bg-primary-foreground/90 shadow-2xl hover:shadow-primary-foreground/30 transition-all duration-300"
              >
                View Adventure
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/excursions"
                className="inline-flex items-center gap-2 px-10 py-4 bg-transparent border-2 border-primary-foreground text-primary-foreground font-bold text-lg rounded-lg hover:bg-primary-foreground/10 shadow-2xl transition-all duration-300 backdrop-blur-sm"
              >
                Excursions
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>



      {/* Scroll Indicator */}
      {/* <motion.div
        className="absolute bottom-32 left-1/2 -translate-x-1/2 cursor-pointer"
        style={{ opacity }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2">
          <motion.span
            className="text-primary-foreground/80 text-sm font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll to explore
          </motion.span>
          <div className="w-8 h-12 border-2 border-primary-foreground/50 rounded-full flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-3 bg-primary-foreground rounded-full"
              animate={{ y: [0, 12, 0], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div> */}
    </section>
  );
};

export default Hero;
