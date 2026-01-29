import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import wildlife from "@/assets/wildlife.jpg";
import sigiriya from "@/assets/sigiriya.jpg";
import teaPlantations from "@/assets/tea-plantations.jpg";
import beachMirissa from "@/assets/beach-mirissa.jpg";
import temple from "@/assets/temple.jpg";
import adventure from "@/assets/adventure.jpg";

const excursions = [
  {
    id: 1,
    title: "COLOMBO BY TUK TUK",
    image: temple,
    destination: "Colombo",
    category: "City Tour",
    time: "Half Day",
    slug: "colombo-tuk-tuk"
  },
  {
    id: 2,
    title: "HOT AIR BALLOON RIDE",
    image: sigiriya,
    destination: "Sigiriya",
    category: "Adventure",
    time: "Half Day",
    slug: "hot-air-balloon"
  },
  {
    id: 3,
    title: "YALA NATIONAL PARK – LUXURY JEEP SAFARI",
    image: wildlife,
    destination: "Yala",
    category: "Wildlife",
    time: "Full Day",
    slug: "yala-luxury-safari"
  },
  {
    id: 4,
    title: "GALLE FORT WALKING TOUR",
    image: beachMirissa,
    destination: "Galle",
    category: "Cultural",
    time: "Half Day",
    slug: "galle-fort-tour"
  },
  {
    id: 5,
    title: "TEA PLANTATION EXPERIENCE",
    image: teaPlantations,
    destination: "Nuwara Eliya",
    category: "Cultural",
    time: "Full Day",
    slug: "tea-plantation"
  },
  {
    id: 6,
    title: "WHITE WATER RAFTING",
    image: adventure,
    destination: "Kitulgala",
    category: "Adventure",
    time: "Full Day",
    slug: "white-water-rafting"
  }
];

const timeOptions = ["All", "Half Day", "Full Day"];
const destinationOptions = ["All", "Colombo", "Sigiriya", "Yala", "Galle", "Nuwara Eliya", "Kitulgala"];
const categoryOptions = ["All", "City Tour", "Adventure", "Wildlife", "Cultural"];

const Excursions = () => {
  const [timeFilter, setTimeFilter] = useState("All");
  const [destinationFilter, setDestinationFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filteredExcursions = excursions.filter((excursion) => {
    const matchTime = timeFilter === "All" || excursion.time === timeFilter;
    const matchDestination = destinationFilter === "All" || excursion.destination === destinationFilter;
    const matchCategory = categoryFilter === "All" || excursion.category === categoryFilter;
    return matchTime && matchDestination && matchCategory;
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px]">
        <div className="absolute inset-0">
          <img
            src={wildlife}
            alt="Safari Excursion"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      </section>

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
            <p className="text-sm text-muted-foreground mb-2">Explore Sri Lanka with</p>
            <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-6">
              Nature Escape Excursions
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience thrilling safaris at Yala National Park, scenic hot air balloon rides, 
              the historic charm of Galle, and vibrant Colombo - plus so much more! INQUIRE NOW!
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
                key={excursion.id}
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
