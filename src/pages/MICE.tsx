import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import temple from "@/assets/temple.jpg";

const MICE = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[45vh] min-h-[350px]">
        <div className="absolute inset-0">
          <img
            src={temple}
            alt="MICE"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <p className="text-sm text-muted-foreground mb-2">Walkers Tour Services</p>
            <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-10">
              MICE
            </h1>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                At Walkers Tours, we specialize in delivering world-class MICE (Meetings, Incentives, 
                Conferences, and Exhibitions) services tailored to the unique needs of corporate clients. 
                With decades of experience and a deep understanding of Sri Lanka's hospitality landscape, 
                we create seamless, impactful events that leave lasting impressions.
              </p>
              <p>
                From intimate board meetings to large-scale international conferences, our dedicated MICE 
                team handles every detail with precision and creativity. We offer end-to-end solutions 
                including venue selection, accommodation arrangements, transportation logistics, themed 
                events, team-building activities, and post-event tours.
              </p>
              <p>
                Our extensive network of premium hotels, unique venues, and trusted local partners ensures 
                that every aspect of your corporate event is executed flawlessly. Whether you're looking 
                to motivate your team with an incentive trip, host a product launch, or organize a 
                multi-day conference, we bring your vision to life.
              </p>
              <p>
                Sri Lanka's diverse landscapes — from pristine beaches to misty highlands, ancient ruins 
                to modern cities — provide the perfect backdrop for unforgettable corporate experiences. 
                Let Walkers Tours transform your next business event into an extraordinary journey.
              </p>
            </div>

            {/* CTA Button */}
            <div className="mt-10">
              <Link to="/contact">
                <Button className="rounded-full px-8" size="lg">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  INQUIRE NOW
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default MICE;
