import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import DomeGallery from "../ui/dome-gallery";
import { fetchHomeData } from "@/api/home.api";

const VisualStories = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isMobile, setIsMobile] = useState(false);
  const [images, setImages] = useState<any[]>([]);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const data = await fetchHomeData();
        if (data && data.gallery) {
          const formattedImages = data.gallery.map((url: string) => ({
            src: url,
            alt: "Nature Escape Gallery"
          }));
          setImages(formattedImages);
        }
      } catch (error) {
        console.error("Failed to load gallery images", error);
      }
    };
    loadImages();

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="py-24 bg-sand relative overflow-hidden min-h-screen" ref={ref}>
      {/* Background Text */}
      <motion.div
        className="absolute top-0 left-0 right-0 text-center pointer-events-none z-0"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <span className="text-[80px] md:text-[140px] font-display italic font-bold text-muted-foreground/10 leading-none select-none">
          Visual Stories
        </span>
      </motion.div>

      <div className="container mx-auto px-4 relative z-20 pointer-events-none pt-12">
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
            Gallery
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6">
            Captured Moments
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Glimpses of the unforgettable memories created with Nature Escape
          </p>
        </motion.div>
      </div>

      <div className="w-full relative z-10 h-[600px] md:h-[800px] mt-8">
        <DomeGallery
          images={images}
          fit={0.7}
          minRadius={isMobile ? 150 : 200}
          maxVerticalRotationDeg={20}
          segments={isMobile ? 24 : 34}
          dragDampening={0.8}
          grayscale={false}
          openedImageWidth={isMobile ? "300px" : "600px"}
          openedImageHeight={isMobile ? "400px" : "600px"}
          overlayBlurColor="hsl(35, 30%, 95%)"
        />
      </div>
    </section>
  );
};

export default VisualStories;
