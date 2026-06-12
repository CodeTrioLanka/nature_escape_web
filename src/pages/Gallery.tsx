import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchHomeData } from "@/api/home.api";
import { optimizeImage } from "@/lib/utils";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/common/PageHero";
import SEO from "@/components/common/SEO";


// Static fallback images
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

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const galleryRef = useRef(null);

  // Fetch gallery images from home data
  const { data: homeData, isLoading } = useQuery({
    queryKey: ["homeData"],
    queryFn: fetchHomeData,
    staleTime: 1000 * 60 * 5,
  });

  const galleryImages =
    homeData?.gallery && homeData.gallery.length > 0
      ? homeData.gallery
      : staticImages;

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(
        selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1
      );
    }
  };

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(
        selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1
      );
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (selectedImage === null) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") goToPrevious();
    if (e.key === "ArrowRight") goToNext();
  };

  return (
    <Layout>
      <SEO
        title="Photo Gallery | Beautiful Sri Lanka & Maldives Landscapes"
        description="Browse our photo gallery showing beautiful scenery, wildlife encounters, cultural heritage, and traveler moments in Sri Lanka and the Maldives."
        keywords="sri lanka photo gallery, travel photos, beautiful landscapes, ceylon tour pictures, maldives pictures"
      />
      {/* Hero Section */}
      <PageHero
        title="Our Gallery"
        subtitle="A visual journey through the breathtaking landscapes and unforgettable moments of Sri Lanka"
        height="h-[60vh] min-h-[400px]"
      />

      {/* Gallery Grid Section */}
      <section
        className="py-20 bg-background"
        ref={galleryRef}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
      >
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="text-gold text-3xl md:text-4xl block mb-2"
              style={{ fontFamily: "'Brush Script MT', cursive" }}
            >
              Captured Moments
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
              Explore All Photos
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-4" />
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              {galleryImages.length} moments from our incredible journeys across
              Sri Lanka
            </p>
          </motion.div>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-forest border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            /* Masonry-style Gallery Grid */
            <motion.div
              className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5 space-y-5"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {galleryImages.map((image, index) => (
                <motion.div
                  key={index}
                  className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-2xl"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
                  onClick={() => openLightbox(index)}
                  whileHover={{ y: -5 }}
                >
                  <img
                    src={optimizeImage(image, 600)}
                    alt={`Gallery photo ${index + 1}`}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                    style={{
                      // Vary heights for masonry effect
                      minHeight:
                        index % 3 === 0
                          ? "320px"
                          : index % 3 === 1
                          ? "240px"
                          : "280px",
                    }}
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-between p-5">
                    <span className="text-white text-sm font-medium tracking-wide">
                      Photo {index + 1}
                    </span>
                    <motion.div
                      className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                    >
                      <ZoomIn className="w-5 h-5 text-white" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/95 backdrop-blur-md" />

            {/* Close Button */}
            <motion.button
              className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
              onClick={closeLightbox}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.button>

            {/* Image Counter */}
            <div className="absolute top-6 left-6 z-50 text-white/70 text-sm font-medium bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              {selectedImage + 1} / {galleryImages.length}
            </div>

            {/* Previous Button */}
            <motion.button
              className="absolute left-4 md:left-8 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              whileHover={{ scale: 1.1, x: -3 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </motion.button>

            {/* Next Button */}
            <motion.button
              className="absolute right-4 md:right-8 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              whileHover={{ scale: 1.1, x: 3 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </motion.button>

            {/* Main Image */}
            <motion.div
              className="relative z-40 max-w-[90vw] max-h-[85vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={optimizeImage(galleryImages[selectedImage], 1200)}
                alt={`Gallery photo ${selectedImage + 1}`}
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Gallery;
