import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/common/PageHero";
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
      {/* Hero Section with PageHero Component */}
      {/* Hero Section with PageHero Component */}
      <PageHero
        title={hero.title}
        subtitle={hero.description}
        backgroundImage={hero.heroImage}
        height="h-[90vh] min-h-[500px]"
      />

      {/* Services Grid Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const slug = service._id;
              return (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group block relative aspect-[4/3] overflow-hidden rounded-lg shadow-md"
                >
                  <Link
                    to={slug === "excursions" ? "/excursions" : slug === "mice" ? "/mice" : `/service/${slug}`}
                    className="block w-full h-full"
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white font-semibold text-lg uppercase tracking-wide">
                        {service.title}
                        <span className="block w-12 h-0.5 bg-secondary mt-2 transition-all duration-300 group-hover:w-20" />
                      </h3>
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
