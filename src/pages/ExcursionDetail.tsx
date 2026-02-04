import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { Clock, MapPin, ArrowRight, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { getExcursionBySlug, Excursion } from "@/api/excursion.api";

const ExcursionDetail = () => {
  const { excursionSlug } = useParams();
  const [excursion, setExcursion] = useState<Excursion | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadExcursion = async () => {
      if (!excursionSlug) {
        setError("No excursion slug provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getExcursionBySlug(excursionSlug);
        setExcursion(data);
        setError(null);
      } catch (err) {
        console.error("Failed to load excursion:", err);
        setError("Failed to load excursion details");
      } finally {
        setLoading(false);
      }
    };

    loadExcursion();
  }, [excursionSlug]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-serif mb-4">Loading...</h1>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !excursion) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-serif mb-4">
              {error || "Excursion not found"}
            </h1>
            <Link to="/excursions" className="text-primary hover:underline">
              Back to Excursions
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[45vh] min-h-[350px] -mt-20">
        <div className="absolute inset-0">
          <img
            src={excursion.image}
            alt={excursion.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      </section>

      {/* Title Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-primary text-primary-foreground text-xs px-4 py-2 rounded-sm mb-4 tracking-wider">
              {excursion.category.toUpperCase()} | {excursion.destination.toUpperCase()} | {excursion.time.toUpperCase()}
            </span>
            <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-6">
              {excursion.title}
            </h1>
            <p className="text-muted-foreground max-w-3xl mx-auto whitespace-pre-line leading-relaxed">
              {excursion.description}
            </p>
            <Link to="/contact">
              <Button className="mt-8 rounded-full px-8" size="lg">
                <ArrowRight className="w-4 h-4 mr-2" />
                INQUIRE NOW
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 bg-background p-6 rounded-lg"
              >
                <Tag className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className="font-semibold">{excursion.category}</p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-center gap-3 bg-background p-6 rounded-lg"
              >
                <Clock className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-semibold">{excursion.time}</p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center gap-3 bg-background p-6 rounded-lg"
              >
                <MapPin className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Destination</p>
                  <p className="font-semibold">{excursion.destination}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ExcursionDetail;
