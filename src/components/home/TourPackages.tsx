import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { fetchAllPackages } from "@/api/packages.api";
import { optimizeImage } from "@/lib/utils";
import sigiriyaImg from "@/assets/sigiriya.jpg";
import teaImg from "@/assets/tea-plantations.jpg";
import templeImg from "@/assets/temple.jpg";
import wildlifeImg from "@/assets/wildlife.jpg";
import beachImg from "@/assets/beach-unawatuna.jpg";
import familyImg from "@/assets/family-beach.jpg";

const staticPackages = [
  {
    id: 1,
    title: "Cultural Triangle Explorer",
    duration: "7 Days / 6 Nights",
    description: "Explore ancient kingdoms, sacred temples, and UNESCO World Heritage sites in a journey through history.",
    image: sigiriyaImg,
    href: "/tour/cultural-triangle-explorer",
    price: "From $850",
  },
  {
    id: 2,
    title: "Tea Country Retreat",
    duration: "5 Days / 4 Nights",
    description: "Journey through misty mountains and lush tea plantations. Experience the colonial charm of Nuwara Eliya.",
    image: teaImg,
    href: "/tour/tea-country-retreat",
    price: "From $620",
  },
  {
    id: 3,
    title: "Spiritual Pilgrimage",
    duration: "6 Days / 5 Nights",
    description: "Visit sacred Buddhist and Hindu temples across the island, finding inner peace and spiritual connection.",
    image: templeImg,
    href: "/tour/spiritual-pilgrimage",
    price: "From $580",
  },
  {
    id: 4,
    title: "Wildlife Safari Adventure",
    duration: "4 Days / 3 Nights",
    description: "Encounter leopards, elephants, and exotic birds in their natural habitat at Yala and Udawalawe.",
    image: wildlifeImg,
    href: "/tour/wildlife-safari-adventure",
    price: "From $490",
  },
  {
    id: 5,
    title: "Beach Paradise Getaway",
    duration: "6 Days / 5 Nights",
    description: "Relax on pristine beaches and experience coastal charm. The perfect blend of sun, sand, and sea.",
    image: beachImg,
    href: "/tour/beach-paradise-getaway",
    price: "From $750",
  },
  {
    id: 6,
    title: "Family Fun Explorer",
    duration: "8 Days / 7 Nights",
    description: "Perfect family adventure with activities for all ages, from safe beaches to gentle nature walks.",
    image: familyImg,
    href: "/tour/family-fun-explorer",
    price: "From $1200",
  },
];

const TourPackages = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fallback images
  const fallbackImages: { [key: string]: string } = {
    sigiriya: sigiriyaImg,
    tea: teaImg,
    temple: templeImg,
    wildlife: wildlifeImg,
    beach: beachImg,
    family: familyImg,
  };

  useEffect(() => {
    const loadPackages = async () => {
      try {
        const data = await fetchAllPackages();
        if (data && data.length > 0) {
          const mappedPackages = data.map((pkg, index) => ({
            id: pkg._id,
            title: pkg.packageName,
            duration: `${pkg.overview.duration.days} Days / ${pkg.overview.duration.nights} Nights`,
            description: pkg.hero.description,
            category: pkg.category || "WILDLIFE & ADVENTURE TOURS",
            recommendedFor: pkg.recommendedFor || (index % 2 === 0 ? "ADVENTURE" : "WILDLIFE"),
            image: pkg.hero.backgroundImage || Object.values(fallbackImages)[index % 6],
            href: `/tour/${pkg.slug}`,
          }));
          setPackages(mappedPackages);
        } else {
          // Map static packages to include category and recommendedFor for demo
          const mappedStatic = staticPackages.map((pkg, index) => ({
            ...pkg,
            category: "WILDLIFE & ADVENTURE TOURS",
            recommendedFor: index % 2 === 0 ? "ADVENTURE" : "WILDLIFE",
          }));
          setPackages(mappedStatic);
        }
      } catch (error) {
        console.error("Failed to fetch tour packages:", error);
        setPackages(staticPackages.map((pkg, index) => ({
          ...pkg,
          category: "WILDLIFE & ADVENTURE TOURS",
          recommendedFor: index % 2 === 0 ? "ADVENTURE" : "WILDLIFE",
        })));
      } finally {
        setLoading(false);
      }
    };
    loadPackages();
  }, []);

  return (
    <section className="py-24 bg-background relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span
            className="text-gold text-3xl md:text-4xl block mb-2"
            style={{ fontFamily: "'Brush Script MT', cursive" }}
          >
            Curated Experiences
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6">
            Tour Packages
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Embark on a voyage of discovery with our meticulously crafted itineraries
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.slice(0, 6).map((pkg, index) => (
            <TourCard key={pkg.id} pkg={pkg} index={index} />
          ))}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Link
            to="/sri-lanka-tours"
            className="group inline-flex items-center gap-2 px-10 py-4 bg-primary text-primary-foreground font-medium rounded-full hover:bg-ocean-light shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all duration-300"
          >
            view All Tours
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

const TourCard = ({ pkg, index }: { pkg: any, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative aspect-[4/5] overflow-hidden rounded-[20px] cursor-pointer shadow-lg"
    >
      <Link to={pkg.href} className="block w-full h-full">
        {/* Background Image */}
        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
          <img
            src={optimizeImage(pkg.image, 600)}
            alt={pkg.title}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
          {/* Overlays */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
        </div>

        {/* Top Badge */}
        <div className="absolute top-6 left-6">
          <div className="bg-white/95 px-4 py-2 rounded-[2px] shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-wider text-black whitespace-nowrap">
              RECOMMENDED FOR {pkg.recommendedFor}
            </span>
          </div>
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 transform transition-transform duration-500 group-hover:translate-y-[-8px]">
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-white/80 text-[11px] font-bold uppercase tracking-[0.2em]">
                {pkg.category}
              </span>
              <div className="h-[1px] w-8 bg-white/40" />
            </div>

            <h3 className="text-white text-3xl lg:text-4xl font-black uppercase leading-[1] mb-3 tracking-tighter drop-shadow-md">
              {pkg.title}
            </h3>

            <div className="text-white/80 text-sm font-medium tracking-wide">
              {pkg.duration}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default TourPackages;
