import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import wildlife from "@/assets/wildlife.jpg";
import { fetchExcursionFilters, getAllExcursions, getExcursionHeroes, Excursion, ExcursionHero } from "@/api/excursion.api";
import PageHero from "@/components/common/PageHero";

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
      {/* Hero Section */}
      <PageHero
        title={heroContent?.title || "Nature Escape Excursions"}
        subtitle={heroContent?.subtitle || "Explore Sri Lanka with our exclusive excursions"}
        backgroundImage={heroContent?.heroImage || wildlife}
        height="h-[65vh] min-h-[500px]"
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
            className="flex flex-wrap justify-center gap-0 mb-12"
          >
            <div className="bg-primary/90 text-primary-foreground px-4 py-3 min-w-[150px]">
              <label className="block text-xs mb-1">Time</label>
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="w-full bg-transparent border-none text-sm focus:outline-none cursor-pointer"
              >
                {timeOptions.map((option) => (
                  <option key={option} value={option} className="text-foreground bg-background">
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="bg-primary/80 text-primary-foreground px-4 py-3 min-w-[150px]">
              <label className="block text-xs mb-1">Destination</label>
              <select
                value={destinationFilter}
                onChange={(e) => setDestinationFilter(e.target.value)}
                className="w-full bg-transparent border-none text-sm focus:outline-none cursor-pointer"
              >
                {destinationOptions.map((option) => (
                  <option key={option} value={option} className="text-foreground bg-background">
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="bg-primary/70 text-primary-foreground px-4 py-3 min-w-[150px]">
              <label className="block text-xs mb-1">Category</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full bg-transparent border-none text-sm focus:outline-none cursor-pointer"
              >
                {categoryOptions.map((option) => (
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
              >
                <Link to={`/excursion/${excursion.slug}`} className="block group">
                  <div className="relative h-[350px] overflow-hidden rounded-lg">
                    <img
                      src={excursion.image}
                      alt={excursion.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white text-lg font-semibold leading-tight">
                        {excursion.title}
                        <span className="inline-block ml-2 w-8 h-[2px] bg-primary align-middle" />
                      </h3>
                    </div>
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
