import { Link } from "react-router-dom";
import { Clock, ArrowRight, Plane } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { fetchAllPackages, Package } from "@/api/packages.api";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  const bgTextRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const bgTextY = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  // Fallback images
  const fallbackImages: { [key: string]: string } = {
    sigiriya: sigiriyaImg,
    tea: teaImg,
    temple: templeImg,
    wildlife: wildlifeImg,
    beach: beachImg,
    family: familyImg,
  };

  // GSAP Parallax Effect for background text
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (bgTextRef.current) {
      gsap.to(bgTextRef.current, {
        yPercent: 50,
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
            image: pkg.hero.backgroundImage || Object.values(fallbackImages)[index % 6],
            href: `/tour/${pkg.slug}`,
            price: "", // Add price if available in backend
          }));
          setPackages(mappedPackages);
        } else {
          setPackages(staticPackages);
        }
      } catch (error) {
        console.error("Failed to fetch tour packages:", error);
        setPackages(staticPackages);
      } finally {
        setLoading(false);
      }
    };
    loadPackages();
  }, []);

  return (
    <section className="py-24 bg-background relative overflow-hidden" ref={ref}>
      {/* Background Text */}
      <div
        ref={bgTextRef}
        className="absolute top-0 left-0 right-0 text-center pointer-events-none opacity-[0.03]"
      >
        <span className="text-[120px] md:text-[200px] font-display font-bold leading-none select-none">
          Journeys
        </span>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-24 max-w-3xl mx-auto"
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

        <div className="relative">
          {/* Dashed Path Connection (Desktop Only) */}
          <div className="absolute top-20 bottom-20 left-[50%] -translate-x-1/2 w-full max-w-[800px] hidden md:block -z-10 pointer-events-none">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 600">
              {/* 
                  Approximation of a zigzag path for 6 items.
                  Starts near y=50 (1st item), weaves L/R.
                */}
              <path
                d="M 50,50 C 90,50 90,150 50,150 C 10,150 10,250 50,250 C 90,250 90,350 50,350 C 10,350 10,450 50,450 C 90,450 90,550 50,550"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                strokeDasharray="4 4"
                className="text-foreground"
                vectorEffect="non-scaling-stroke"
              />
              {/* Decorative dots or crosses could be added here if needed */}
            </svg>
          </div>

          <div className="space-y-32">
            {packages.slice(0, 6).map((pkg, index) => (
              <TourCard key={pkg.id} pkg={pkg} index={index} />
            ))}
          </div>
        </div>

        <motion.div
          className="text-center mt-24"
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
  const isEven = index % 2 === 0;

  // Custom clip paths to simulate slightly different rough edges
  const clipPaths = [
    "polygon(2% 0%, 98% 1%, 100% 98%, 1% 99%)",
    "polygon(0% 2%, 99% 0%, 98% 99%, 2% 100%)",
    "polygon(1% 1%, 97% 2%, 99% 97%, 3% 98%)",
  ];
  const clipPath = clipPaths[index % 3];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      className={`flex flex-col md:flex-row items-center gap-8 md:gap-0 ${isEven ? "" : "md:flex-row-reverse"}`}
    >
      {/* Image Side */}
      <div className={`w-full md:w-1/2 flex relative ${isEven ? "justify-end md:pr-12" : "justify-start md:pl-12"}`}>
        <div className="relative w-full max-w-[500px] aspect-[4/3] group">
          {/* Decorative Backdrops */}
          <div
            className={`absolute inset-0 bg-secondary/80 -rotate-2 scale-105 transition-transform duration-500 group-hover:rotate-0 rounded-sm`}
          />

          <motion.div
            className="relative w-full h-full overflow-hidden shadow-xl bg-white p-1"
            style={{ clipPath }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
          >
            <img
              src={pkg.image}
              alt={pkg.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60" />

            {/* Plane Icon Decoration */}
            <div className="absolute top-4 right-4 text-white opacity-80">
              <Plane className="w-6 h-6 rotate-45" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content Side */}
      <div className={`w-full md:w-1/2 flex ${isEven ? "justify-start md:-ml-16" : "justify-end md:-mr-16"} relative z-10`}>
        <div
          className="bg-card p-8 md:p-10 shadow-xl max-w-md relative hover:-translate-y-1 transition-transform duration-300"
        >
          {/* Tape Effect top/bottom */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-yellow-100/50 rotate-[-2deg] opacity-60 backdrop-blur-sm shadow-sm" />

          <div className="flex items-center gap-2 text-primary font-medium text-xs tracking-wider mb-4 uppercase">
            <Clock className="w-3.5 h-3.5" />
            {pkg.duration}
          </div>

          <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4 leading-tight">
            {pkg.title}
          </h3>

          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            {pkg.description}
          </p>

          <div className="flex items-center justify-between mt-auto pt-6 border-t border-dashed border-border/60">
            <Link
              to={pkg.href}
              className="bg-gold hover:bg-gold-light text-white font-medium px-6 py-2.5 rounded-sm shadow-md hover:shadow-lg transition-all text-sm flex items-center gap-2 group-hover:gap-3"
            >
              Details
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TourPackages;
