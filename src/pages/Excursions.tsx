import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import wildlife from "@/assets/wildlife.jpg";
import { fetchExcursionFilters, getAllExcursions, getExcursionHeroes, Excursion, ExcursionHero } from "@/api/excursion.api";
import PageHero from "@/components/common/PageHero";
import SEO from "@/components/common/SEO";


const Excursions = () => {
  const [timeFilter, setTimeFilter] = useState("All");
  const [destinationFilter, setDestinationFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [timeOptions, setTimeOptions] = useState(["All"]);
  const [destinationOptions, setDestinationOptions] = useState(["All"]);
  const [categoryOptions, setCategoryOptions] = useState(["All"]);
  const [excursions, setExcursions] = useState<Excursion[]>([]);
  const [heroContent, setHeroContent] = useState<ExcursionHero | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [filters, excursionList, heroes] = await Promise.all([
          fetchExcursionFilters(),
          getAllExcursions(),
          getExcursionHeroes()
        ]);

        if (filters.time) setTimeOptions(filters.time);
        if (filters.destination) setDestinationOptions(filters.destination);
        if (filters.category) setCategoryOptions(filters.category);

        setExcursions(excursionList);

        if (heroes && heroes.length > 0) {
          setHeroContent(heroes[0]);
        }
      } catch (error) {
        console.error("Failed to load excursion data", error);
      }
    };
    loadData();
  }, []);

  const filteredExcursions = excursions.filter((excursion) => {
    const matchTime = timeFilter === "All" || excursion.time === timeFilter;
    const matchDestination = destinationFilter === "All" || excursion.destination === destinationFilter;
    const matchCategory = categoryFilter === "All" || excursion.category === categoryFilter;
    return matchTime && matchDestination && matchCategory;
  });

  return (
    <Layout>
      <SEO
        title="Excursions & Day Trips | Sri Lanka Travel"
        description="Enhance your Sri Lanka tour with short excursions and exciting day trips: Yala safaris, balloon rides, Galle fort walks, Sigiriya climbs, and more."
        keywords="sri lanka excursions, day trips sri lanka, yala safari, hot air balloon sri lanka, day tours ceylon"
      />
      {/* Hero Section */}
      <PageHero
        backgroundImage={heroContent?.heroImage}
        height="h-[60vh] min-h-[300px]"
        showWave={false}
      />

      {/* Content Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <p className="text-sm text-muted-foreground mb-2">{heroContent?.subtitle || "Explore Sri Lanka with"}</p>
            <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-6">
              {heroContent?.title || "Nature Escape Excursions"}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {heroContent?.description || "Experience thrilling safaris at Yala National Park, scenic hot air balloon rides, the historic charm of Galle, and vibrant Colombo - plus so much more! INQUIRE NOW!"}
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <div className="bg-white border border-gray-100 shadow-sm rounded-xl px-5 py-3 min-w-[180px] hover:shadow-md transition-shadow">
              <label className="block text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wider">Category</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full bg-transparent border-none text-sm text-foreground font-medium focus:outline-none cursor-pointer"
              >
                {categoryOptions.map((option) => (
                  <option key={option} value={option} className="text-foreground bg-background">
                    {option}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="bg-white border border-gray-100 shadow-sm rounded-xl px-5 py-3 min-w-[180px] hover:shadow-md transition-shadow">
              <label className="block text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wider">Destination</label>
              <select
                value={destinationFilter}
                onChange={(e) => setDestinationFilter(e.target.value)}
                className="w-full bg-transparent border-none text-sm text-foreground font-medium focus:outline-none cursor-pointer"
              >
                {destinationOptions.map((option) => (
                  <option key={option} value={option} className="text-foreground bg-background">
                    {option}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="bg-white border border-gray-100 shadow-sm rounded-xl px-5 py-3 min-w-[180px] hover:shadow-md transition-shadow">
              <label className="block text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wider">Time</label>
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="w-full bg-transparent border-none text-sm text-foreground font-medium focus:outline-none cursor-pointer"
              >
                {timeOptions.map((option) => (
                  <option key={option} value={option} className="text-foreground bg-background">
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>

          {/* Excursions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExcursions.map((excursion, index) => (
              <motion.div
                key={excursion._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group block relative aspect-[4/3] overflow-hidden rounded-lg shadow-md"
              >
                <Link to={`/excursion/${excursion.slug}`} className="block w-full h-full">
                  <img
                    src={excursion.image}
                    alt={excursion.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white font-semibold text-lg uppercase tracking-wide">
                      {excursion.title}
                      <span className="block w-12 h-0.5 bg-secondary mt-2 transition-all duration-300 group-hover:w-20" />
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredExcursions.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              No excursions found matching your filters.
            </p>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Excursions;
