import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { fetchHomeData } from "@/api/home.api";
import sigiriyaImg from "@/assets/sigiriya.jpg";
import teaImg from "@/assets/tea-plantations.jpg";
import wildlifeImg from "@/assets/wildlife.jpg";
import beachImg from "@/assets/beach-paradise.jpg";
import adventureImg from "@/assets/adventure.jpg";
import honeymoonImg from "@/assets/honeymoon.jpg";
import templeImg from "@/assets/temple.jpg";
import familyImg from "@/assets/family-beach.jpg";

const staticImages = [
  sigiriyaImg,
  teaImg,
  wildlifeImg,
  beachImg,
  adventureImg,
  honeymoonImg,
  templeImg,
  familyImg,
];

const VisualStories = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [galleryImages, setGalleryImages] = useState<string[]>(staticImages);
  const [loading, setLoading] = useState(true);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  useEffect(() => {
    const loadGallery = async () => {
      try {
        const data = await fetchHomeData();
        if (data && data.gallery && data.gallery.length > 0) {
          setGalleryImages(data.gallery);
        }
      } catch (error) {
        console.error("Failed to fetch gallery images:", error);
        // Keep static images as fallback
      } finally {
        setLoading(false);
      }
    };
    loadGallery();
  }, []);

  return (
    <section className="py-24 bg-sand relative overflow-hidden" ref={ref}>
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

      <div className="container mx-auto px-4 relative z-20 pt-12">
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

        {/* Bento Grid Gallery */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 h-auto lg:h-[600px]"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Column 1 */}
          <div className="flex flex-col gap-6 lg:h-full">
            <motion.div variants={itemVariants} className="flex-1 relative overflow-hidden rounded-[2rem] group">
              <img src={galleryImages[0]} alt="Gallery 1" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </motion.div>
            <motion.div variants={itemVariants} className="h-[180px] lg:h-[30%] relative overflow-hidden rounded-[2rem] group">
              <img src={galleryImages[4]} alt="Gallery 5" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </motion.div>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-6 lg:h-full">
            <motion.div variants={itemVariants} className="flex-1 relative overflow-hidden rounded-[2rem] group h-[400px] lg:h-full">
              <img src={galleryImages[6]} alt="Gallery 7" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </motion.div>
          </div>

          {/* Column 3 - Center */}
          <div className="flex flex-col gap-6 lg:h-full justify-center">
            <motion.div variants={itemVariants} className="aspect-square relative overflow-hidden rounded-[2rem] group">
              <img src={galleryImages[1]} alt="Gallery 2" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
            </motion.div>

            {/* Explore Button */}
            <motion.div variants={itemVariants}>
              <Link
                to="/gallery"
                className="w-full bg-black text-white rounded-full py-4 px-6 flex items-center justify-between group hover:bg-gold transition-colors duration-300"
              >
                <span className="font-medium">Explore Gallery</span>
                <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Column 4 */}
          <div className="flex flex-col gap-6 lg:h-full">
            <motion.div
              variants={itemVariants}
              className="flex-1 relative overflow-hidden rounded-[2rem] group h-[400px] lg:h-full"
              style={{ borderTopRightRadius: "4rem" }} // Decorative corner
            >
              <img src={galleryImages[2]} alt="Gallery 3" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </motion.div>
          </div>

          {/* Column 5 */}
          <div className="flex flex-col gap-6 lg:h-full">
            <motion.div variants={itemVariants} className="h-[200px] lg:h-[40%] relative overflow-hidden rounded-[2rem] group">
              <img src={galleryImages[3]} alt="Gallery 4" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </motion.div>
            <motion.div variants={itemVariants} className="flex-1 relative overflow-hidden rounded-[2rem] group">
              <img src={galleryImages[5]} alt="Gallery 6" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default VisualStories;
