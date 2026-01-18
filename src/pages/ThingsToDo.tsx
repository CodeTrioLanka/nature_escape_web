import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import adventureImage from "@/assets/adventure.jpg";
import wildlifeImage from "@/assets/wildlife.jpg";
import templeImage from "@/assets/temple.jpg";
import teaImage from "@/assets/tea-plantations.jpg";
import beachImage from "@/assets/beach-mirissa.jpg";
import sigiriyaImage from "@/assets/sigiriya.jpg";

const activities = [
  {
    title: "Whale & Dolphin Watching",
    image: beachImage,
    slug: "whale-dolphin-watching"
  },
  {
    title: "Night-Time Pilgrimage Hike",
    image: adventureImage,
    slug: "night-pilgrimage-hike"
  },
  {
    title: "Minneriya Elephant Gatherings, Jeep Safari",
    image: wildlifeImage,
    slug: "elephant-safari"
  },
  {
    title: "Bird-Watching Safari",
    image: wildlifeImage,
    slug: "bird-watching"
  },
  {
    title: "Temple Rituals Tour",
    image: templeImage,
    slug: "temple-rituals"
  },
  {
    title: "Half-Day Tour with Gentle Giants",
    image: wildlifeImage,
    slug: "gentle-giants"
  },
  {
    title: "Pettigala Mountain, Half-Day Hike",
    image: adventureImage,
    slug: "pettigala-hike"
  },
  {
    title: "Guided Garden Ramble",
    image: teaImage,
    slug: "garden-ramble"
  },
  {
    title: "Estate Walk & Tea Manufacturing Process",
    image: teaImage,
    slug: "tea-estate-walk"
  },
  {
    title: "Trek to World's End Escarpment",
    image: adventureImage,
    slug: "worlds-end-trek"
  },
  {
    title: "Snorkeling / Diving",
    image: beachImage,
    slug: "snorkeling-diving"
  },
  {
    title: "Cycling / Paddle-Boating",
    image: sigiriyaImage,
    slug: "cycling-paddle-boating"
  },
];

const ThingsToDo = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${adventureImage})` }}
        >
          <div className="absolute inset-0 bg-black/30" />
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-muted-foreground mb-4"
            >
              Unforgettable Sri Lankan Adventures
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6"
            >
              Crafted for Every Traveller
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground leading-relaxed"
            >
              Sri Lanka is a land where every moment can be turned into an adventure. Whether it's climbing misty peaks at sunrise, cycling through 
              ancient cities, or drifting high above the landscape on a hot air balloon, experiences here are as diverse as the island itself. Safari across 
              national parks to see elephants and leopards, trek cloud forests with naturalists, or wander into temples rich with history and rituals. From 
              tea estate walks and cultural dance shows to whale watching, rafting, and snorkelling, there's always something extraordinary waiting to be 
              discovered.
            </motion.p>
          </div>

          {/* Activities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={`/things-to-do/${activity.slug}`}
                  className="group block relative aspect-[4/3] overflow-hidden rounded-lg"
                >
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white font-semibold text-lg uppercase tracking-wide">
                      {activity.title}
                      <span className="block w-12 h-0.5 bg-secondary mt-2 transition-all duration-300 group-hover:w-20" />
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ThingsToDo;
