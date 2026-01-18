import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Camera, Users, PartyPopper, Heart, X } from "lucide-react";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop",
    alt: "Team collaboration session",
    category: "Team Work",
    description: "Brainstorming new tour experiences",
  },
  {
    src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop",
    alt: "Team outdoor adventure",
    category: "Adventure",
    description: "Exploring new destinations together",
  },
  {
    src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&h=400&fit=crop",
    alt: "Annual company celebration",
    category: "Celebration",
    description: "Our annual team celebration",
  },
  {
    src: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&h=400&fit=crop",
    alt: "Team dinner event",
    category: "Events",
    description: "Team bonding over local cuisine",
  },
  {
    src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=400&fit=crop",
    alt: "Office teamwork",
    category: "Team Work",
    description: "Planning memorable journeys",
  },
  {
    src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop",
    alt: "Community volunteering",
    category: "Community",
    description: "Giving back to local communities",
  },
  {
    src: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&h=400&fit=crop",
    alt: "Team training session",
    category: "Learning",
    description: "Continuous improvement training",
  },
  {
    src: "https://images.unsplash.com/photo-1606857521015-7f9fcf423571?w=600&h=400&fit=crop",
    alt: "Field trip exploration",
    category: "Adventure",
    description: "Scouting new wildlife trails",
  },
];

const categories = [
  { name: "All", icon: Camera },
  { name: "Team Work", icon: Users },
  { name: "Celebration", icon: PartyPopper },
  { name: "Community", icon: Heart },
];

const TeamGallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const filteredImages =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <section ref={containerRef} className="py-24 bg-background relative overflow-hidden">
      {/* Animated Background Pattern */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,var(--forest)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,var(--gold)_0%,transparent_50%)]" />
      </motion.div>

      {/* Floating Decorative Elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-gold/10 rounded-full blur-2xl"
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-32 h-32 bg-forest/10 rounded-full blur-2xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-1.5 bg-forest/10 text-forest font-medium rounded-full text-sm mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Camera className="w-4 h-4 inline-block mr-2" />
            Behind the Scenes
          </motion.span>

          <motion.h2
            className="text-4xl md:text-5xl font-display font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Our <span className="text-forest">Team</span> in Action
          </motion.h2>

          <motion.p
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Glimpses of our passionate team creating unforgettable experiences
          </motion.p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.name
                  ? "bg-forest text-primary-foreground shadow-lg shadow-forest/30"
                  : "bg-muted text-muted-foreground hover:bg-forest/10 hover:text-forest"
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <category.icon className="w-4 h-4" />
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Masonry Gallery Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]"
          layout
        >
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.alt}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group ${
                index % 5 === 0 ? "sm:col-span-2 sm:row-span-2" : ""
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              layout
              onClick={() => setSelectedImage(image)}
              whileHover={{ scale: 1.02 }}
            >
              {/* Image */}
              <motion.img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
                initial={{ scale: 1.2 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
              />

              {/* Overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />

              {/* Content Overlay */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
              >
                <span className="inline-block px-3 py-1 bg-gold/90 text-foreground text-xs font-medium rounded-full mb-2">
                  {image.category}
                </span>
                <h3 className="text-primary-foreground font-semibold text-lg">
                  {image.description}
                </h3>
              </motion.div>

              {/* Corner Accent */}
              <motion.div
                className="absolute top-4 right-4 w-10 h-10 bg-primary-foreground/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                whileHover={{ scale: 1.2, rotate: 90 }}
              >
                <Camera className="w-5 h-5 text-primary-foreground" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Floating Stats */}
        <motion.div
          className="flex flex-wrap justify-center gap-8 mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          {[
            { value: "50+", label: "Team Events" },
            { value: "200+", label: "Photos Captured" },
            { value: "15+", label: "Years of Memories" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.1 }}
            >
              <p className="text-4xl font-display font-bold text-forest">{stat.value}</p>
              <p className="text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            className="relative max-w-5xl w-full"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button
              className="absolute -top-12 right-0 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              onClick={() => setSelectedImage(null)}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-8 h-8" />
            </motion.button>

            <motion.img
              src={selectedImage.src.replace("w=600&h=400", "w=1200&h=800")}
              alt={selectedImage.alt}
              className="w-full h-auto rounded-2xl shadow-2xl"
              layoutId={selectedImage.alt}
            />

            <motion.div
              className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="inline-block px-3 py-1 bg-gold text-foreground text-sm font-medium rounded-full mb-2">
                {selectedImage.category}
              </span>
              <h3 className="text-primary-foreground font-display font-bold text-2xl">
                {selectedImage.description}
              </h3>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default TeamGallery;
