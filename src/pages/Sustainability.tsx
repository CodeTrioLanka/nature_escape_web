import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Leaf, Globe, Heart, Users, TreePine, Recycle, HandHeart, Award } from "lucide-react";
import teaPlantations from "@/assets/tea-plantations.jpg";
import wildlife from "@/assets/wildlife.jpg";
import beachMirissa from "@/assets/beach-mirissa.jpg";
import temple from "@/assets/temple.jpg";

const initiatives = [
  {
    icon: Leaf,
    title: "Eco-Friendly Practices",
    description: "We minimize our carbon footprint through sustainable transportation options and eco-conscious accommodations."
  },
  {
    icon: Globe,
    title: "Carbon Offset Programs",
    description: "We partner with certified organizations to offset the environmental impact of our tours and travels."
  },
  {
    icon: Heart,
    title: "Community Support",
    description: "A portion of every booking goes directly to local communities and conservation projects."
  },
  {
    icon: Users,
    title: "Local Employment",
    description: "We prioritize hiring local guides, drivers, and staff to support the local economy."
  },
  {
    icon: TreePine,
    title: "Reforestation Projects",
    description: "We actively participate in tree planting initiatives across Sri Lanka's deforested regions."
  },
  {
    icon: Recycle,
    title: "Plastic-Free Tours",
    description: "Our tours are committed to eliminating single-use plastics and promoting reusable alternatives."
  }
];

const impacts = [
  { number: "50,000+", label: "Trees Planted" },
  { number: "100+", label: "Local Jobs Created" },
  { number: "30+", label: "Community Projects" },
  { number: "Zero", label: "Single-Use Plastics" }
];

const Sustainability = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px]">
        <div className="absolute inset-0">
          <img
            src={teaPlantations}
            alt="Sustainability"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <p className="text-sm tracking-widest mb-4">TRAVEL RESPONSIBLY</p>
            <h1 className="text-4xl md:text-6xl font-serif mb-4">Sustainability</h1>
            <p className="text-lg max-w-2xl mx-auto px-4">
              Committed to preserving Sri Lanka's natural beauty for future generations
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <HandHeart className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">
              Our Commitment to the Planet
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              At Walkers Tours, sustainability isn't just a buzzword – it's at the heart of everything we do. 
              We believe that travel should enrich both the traveler and the destinations they visit. 
              Our sustainable tourism practices ensure that Sri Lanka's pristine beaches, lush forests, 
              and vibrant wildlife remain protected for generations to come.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Initiatives Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-sm text-primary tracking-widest mb-2">WHAT WE DO</p>
            <h2 className="text-3xl md:text-4xl font-serif text-foreground">
              Our Green Initiatives
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {initiatives.map((initiative, index) => (
              <motion.div
                key={initiative.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-background p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <initiative.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {initiative.title}
                </h3>
                <p className="text-muted-foreground">
                  {initiative.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif">Our Impact</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impacts.map((impact, index) => (
              <motion.div
                key={impact.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl md:text-5xl font-bold mb-2">{impact.number}</p>
                <p className="text-sm opacity-80">{impact.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Grid Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Award className="w-10 h-10 text-primary mb-4" />
              <h2 className="text-3xl font-serif text-foreground mb-4">
                Certified Sustainable Tourism
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                We are proud holders of multiple sustainability certifications, 
                recognizing our commitment to responsible tourism practices. 
                Our partnerships with international conservation organizations 
                ensure that every tour contributes positively to the environment 
                and local communities.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-muted-foreground">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  Green Globe Certified
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  Travelife Partner
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  Sri Lanka Tourism Development Authority Partner
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              <img
                src={wildlife}
                alt="Wildlife Conservation"
                className="w-full h-48 object-cover rounded-lg"
              />
              <img
                src={beachMirissa}
                alt="Beach Conservation"
                className="w-full h-48 object-cover rounded-lg mt-8"
              />
              <img
                src={temple}
                alt="Cultural Preservation"
                className="w-full h-48 object-cover rounded-lg"
              />
              <img
                src={teaPlantations}
                alt="Sustainable Farming"
                className="w-full h-48 object-cover rounded-lg mt-8"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">
              Travel with Purpose
            </h2>
            <p className="text-muted-foreground mb-8">
              Join us in making travel a force for good. Every journey with Walkers Tours 
              contributes to conservation, community development, and cultural preservation.
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Sustainability;
