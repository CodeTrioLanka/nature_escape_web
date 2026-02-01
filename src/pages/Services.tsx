import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { fetchServicePageData, Service, ServiceHero } from "@/api/services.api";
const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [hero, setHero] = useState<ServiceHero | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchServicePageData();
        if (data.hero) setHero(data.hero);
        if (data.services) setServices(data.services);
      } catch (error) {
        console.error("Failed to fetch service page data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!hero) return null;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[45vh] min-h-[350px]">
        <div className="absolute inset-0">
          <img
            src={hero.heroImage}
            alt={hero.title}
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
            className="text-center mb-12"
          >
            <p className="text-sm text-muted-foreground mb-2">{hero.subtitle}</p>
            <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-8">
              {hero.title}
            </h1>
            <div className="max-w-4xl mx-auto space-y-4 text-muted-foreground leading-relaxed">
              {hero.description?.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {services.map((service, index) => {
              const slug = service._id;
              return (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    to={slug === "excursions" ? "/excursions" : slug === "mice" ? "/mice" : `/service/${slug}`}
                    className="block group"
                  >
                    <div className="relative h-[280px] overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-white text-lg font-semibold tracking-wide">
                          {service.title}
                          <span className="inline-block ml-3 w-10 h-[2px] bg-primary align-middle" />
                        </h3>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
