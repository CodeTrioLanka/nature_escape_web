import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import adventureImage from "@/assets/adventure.jpg";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { fetchThingsToDo, ThingsToDoItem } from "@/api/thingsToDo.api";
import { Skeleton } from "@/components/ui/skeleton";

const ThingsToDo = () => {
  const [activities, setActivities] = useState<ThingsToDoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedActivity, setSelectedActivity] = useState<ThingsToDoItem | null>(null);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const data = await fetchThingsToDo();
        setActivities(data);
      } catch (error) {
        console.error("Failed to load activities", error);
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] -mt-20">
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
            {loading
              ? Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="aspect-[4/3] rounded-lg overflow-hidden">
                  <Skeleton className="w-full h-full" />
                </div>
              ))
              : activities.map((activity, index) => (
                <motion.div
                  key={activity._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedActivity(activity)}
                  className="cursor-pointer group block relative aspect-[4/3] overflow-hidden rounded-lg"
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
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* Detail Dialog */}
      <Dialog open={!!selectedActivity} onOpenChange={(open) => !open && setSelectedActivity(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl md:text-3xl font-bold mb-4">
              {selectedActivity?.title}
            </DialogTitle>
          </DialogHeader>

          {selectedActivity && (
            <div className="space-y-6">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <img
                  src={selectedActivity.image}
                  alt={selectedActivity.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <DialogDescription className="text-base leading-relaxed whitespace-pre-wrap">
                {selectedActivity.description}
              </DialogDescription>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default ThingsToDo;
