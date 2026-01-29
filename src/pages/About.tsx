import { motion, useScroll, useTransform } from "framer-motion";
import { Users, Award, Heart, Globe, Leaf, Shield, MapPin, Clock, Star, ArrowRight, Milestone } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import TeamGallery from "@/components/about/TeamGallery";
import { fetchAboutUsData, AboutUsData } from "@/api/aboutUs.api";
import teaPlantations from "@/assets/tea-plantations.jpg";
import wildlife from "@/assets/wildlife.jpg";
import sigiriya from "@/assets/sigiriya.jpg";
import temple from "@/assets/temple.jpg";
import beachParadise from "@/assets/beach-paradise.jpg";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const stats = [
  { number: 15, suffix: "+", label: "Years Experience", icon: Clock },
  { number: 10000, suffix: "+", label: "Happy Travelers", icon: Users },
  { number: 500, suffix: "+", label: "Tours Completed", icon: MapPin },
  { number: 50, suffix: "+", label: "Destinations", icon: Globe },
];

// Icon mapping for dynamic values
const iconMap: Record<string, any> = {
  Heart,
  Leaf,
  Users,
  Shield,
  Award,
  Globe,
};

// Fallback Core Values (used if API fails)
const fallbackValues = [
  {
    icon: "Heart",
    title: "Passion for Travel",
    description: "We believe travel transforms lives. Every journey we craft is designed to create meaningful experiences.",
    color: "from-rose-500 to-pink-600",
  },
  {
    icon: "Leaf",
    title: "Sustainability First",
    description: "We're committed to eco-friendly tourism that protects Sri Lanka's natural beauty for future generations.",
    color: "from-emerald-500 to-green-600",
  },
  {
    icon: "Users",
    title: "Local Expertise",
    description: "Our team of local guides brings authentic insights and hidden gems you won't find in guidebooks.",
    color: "from-blue-500 to-cyan-600",
  },
  {
    icon: "Shield",
    title: "Safety & Trust",
    description: "Your safety is our priority. We ensure every aspect of your journey is secure and worry-free.",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: "Award",
    title: "Excellence",
    description: "Award-winning service that consistently exceeds expectations and creates unforgettable memories.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: "Globe",
    title: "Cultural Connection",
    description: "We bridge cultures, helping travelers connect deeply with Sri Lanka's rich heritage and warm people.",
    color: "from-teal-500 to-emerald-600",
  },
];

// Fallback Team Members (used if API fails)
const fallbackTeam = [
  {
    name: "Rajitha Fernando",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
    bio: "20+ years in tourism",
  },
  {
    name: "Priya Mendis",
    role: "Head of Operations",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop",
    bio: "Expert in logistics",
  },
  {
    name: "Ashan Perera",
    role: "Lead Tour Guide",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
    bio: "Certified wildlife expert",
  },
  {
    name: "Nimali Silva",
    role: "Customer Experience",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
    bio: "Multilingual support",
  },
];

// Fallback Milestones (used if API fails)
const fallbackMilestones = [
  { year: 2010, event: "Founded Nature Escape", mstone_description: "Started with a dream to share Sri Lanka" },
  { year: 2014, event: "First 1000 Customers", mstone_description: "Milestone of trust and quality" },
  { year: 2018, event: "Eco-Tourism Award", mstone_description: "Recognized for sustainable practices" },
  { year: 2022, event: "Digital Transformation", mstone_description: "Modern booking experience" },
  { year: 2024, event: "10,000+ Happy Travelers", mstone_description: "Continuing to grow" },
];

const About = () => {
  const heroRef = useRef(null);
  const timelineRef = useRef(null);

  // State for dynamic data
  const [aboutData, setAboutData] = useState<AboutUsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data on component mount
  useEffect(() => {
    const loadAboutData = async () => {
      try {
        setLoading(true);
        const data = await fetchAboutUsData();
        setAboutData(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch About Us data:', err);
        setError('Failed to load data');
        // Will use fallback data
      } finally {
        setLoading(false);
      }
    };

    loadAboutData();
  }, []);

  // Prepare data with fallbacks
  const stats = aboutData?.stats ? [
    { number: aboutData.stats.yearExperience || 15, suffix: "+", label: "Years Experience", icon: Clock },
    { number: aboutData.stats.happyTravelers || 10000, suffix: "+", label: "Happy Travelers", icon: Users },
    { number: aboutData.stats.toursCompleted || 500, suffix: "+", label: "Tours Completed", icon: MapPin },
    { number: aboutData.stats.destination || 50, suffix: "+", label: "Destinations", icon: Globe },
  ] : [
    { number: 15, suffix: "+", label: "Years Experience", icon: Clock },
    { number: 10000, suffix: "+", label: "Happy Travelers", icon: Users },
    { number: 500, suffix: "+", label: "Tours Completed", icon: MapPin },
    { number: 50, suffix: "+", label: "Destinations", icon: Globe },
  ];

  const values = (aboutData?.values && aboutData.values.length > 0)
    ? aboutData.values.map(value => ({
      ...value,
      icon: iconMap[value.icon] || Heart,
    }))
    : fallbackValues.map(value => ({
      ...value,
      icon: iconMap[value.icon] || Heart,
    }));

  const team = (aboutData?.team && aboutData.team.length > 0)
    ? aboutData.team
    : fallbackTeam;

  const milestones = (aboutData?.milestones && aboutData.milestones.length > 0)
    ? aboutData.milestones
    : fallbackMilestones;

  // Hero section data with fallbacks
  const heroBackground = aboutData?.hero?.heroBackground || sigiriya;
  const heroTitle = aboutData?.hero?.heroTitle || "We Create Memories";
  const heroDescription = aboutData?.hero?.heroDescription || "Your trusted partner in discovering Sri Lanka's natural wonders since 2010";

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"]
  });

  const heroY = useTransform(heroProgress, [0, 1], ["0%", "50%"]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.3]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);
  const heroTextY = useTransform(heroProgress, [0, 1], ["0%", "100%"]);

  const timelineLineHeight = useTransform(timelineProgress, [0, 1], ["0%", "100%"]);

  return (
    <Layout>
      {/* Hero Section - Immersive Full Screen */}
      <section ref={heroRef} className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden">
        {/* Animated Background Images */}
        <motion.div
          className="absolute inset-0"
          style={{ y: heroY, scale: heroScale }}
        >
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroBackground})` }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-gold/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-forest/20 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        {/* Hero Content */}
        <motion.div
          className="container mx-auto px-4 relative z-10"
          style={{ opacity: heroOpacity, y: heroTextY }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >

            </motion.div>

            <motion.h1
              className="text-5xl md:text-6xl lg:text-8xl font-display font-bold text-primary-foreground mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {heroTitle.split(' ').map((word, index) => (
                <motion.span
                  key={index}
                  className={index === heroTitle.split(' ').length - 1 ? "text-gold inline-block" : "inline-block"}
                  initial={{ opacity: 0, x: index === 0 ? -100 : 0, scale: index === heroTitle.split(' ').length - 1 ? 0 : 1, rotate: index === 0 ? -10 : 0 }}
                  animate={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 + (index * 0.2), type: "spring" }}
                >
                  {word}{index < heroTitle.split(' ').length - 1 && ' '}
                  {index === heroTitle.split(' ').length - 2 && <br />}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-primary-foreground/80 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {heroDescription}
            </motion.p>

            {/* Scroll Indicator */}
            {/* <motion.div
              className="absolute bottom-10 left-1/2 -translate-x-1/2"
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-8 h-14 border-2 border-primary-foreground/50 rounded-full flex justify-center pt-2">
                <motion.div 
                  className="w-2 h-3 bg-gold rounded-full"
                  animate={{ y: [0, 16, 0], opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
            </motion.div> */}
          </div>
        </motion.div>
      </section>

      {/* Stats Section - Floating Cards */}
      <section className="py-8 relative z-20 -mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-card/95 backdrop-blur-lg p-6 md:p-8 rounded-2xl shadow-2xl border border-border/50 text-center group"
              >
                <motion.div
                  className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-forest to-forest/70 flex items-center justify-center"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <stat.icon className="w-7 h-7 text-primary-foreground" />
                </motion.div>
                <div className="text-3xl md:text-4xl font-display font-bold text-forest mb-1">
                  <AnimatedCounter end={stat.number} suffix={stat.suffix} duration={2.5} />
                </div>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story - Cinematic Split */}
      <section className="py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Grid */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  className="space-y-4"
                  initial={{ y: 50 }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.img
                    src={teaPlantations}
                    alt="Tea Plantations"
                    className="rounded-2xl shadow-lg w-full h-48 object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.img
                    src={wildlife}
                    alt="Wildlife"
                    className="rounded-2xl shadow-lg w-full h-64 object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
                <motion.div
                  className="space-y-4 pt-8"
                  initial={{ y: -50 }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <motion.img
                    src={temple}
                    alt="Temple"
                    className="rounded-2xl shadow-lg w-full h-64 object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.img
                    src={beachParadise}
                    alt="Beach"
                    className="rounded-2xl shadow-lg w-full h-48 object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </div>

              {/* Floating Badge */}
              <motion.div
                className="absolute -bottom-6 -right-6 bg-gradient-to-br from-gold to-gold-light p-6 rounded-2xl shadow-2xl hidden lg:block"
                initial={{ opacity: 0, scale: 0, rotate: -20 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, type: "spring" }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <div className="flex items-center gap-3">
                  <Award className="w-10 h-10 text-foreground" />
                  <div>
                    <p className="font-bold text-foreground text-lg">Award</p>
                    <p className="text-sm text-foreground/80">Winning</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.span
                className="inline-block px-4 py-1.5 bg-forest/10 text-forest font-medium rounded-full text-sm mb-4"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                Our Story
              </motion.span>

              <motion.h2
                className="text-4xl md:text-5xl font-display font-bold mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Born from a{" "}
                <span className="text-forest">Love</span> for Sri Lanka
              </motion.h2>

              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                {[
                  "Nature Escape was founded in 2010 with a simple mission: to share the incredible beauty of Sri Lanka with the world while preserving its natural treasures.",
                  "What started as a small team of passionate local guides has grown into one of Sri Lanka's most trusted travel companies.",
                  "Every trip with Nature Escape is an opportunity to connect with nature, experience authentic culture, and create memories that last a lifetime."
                ].map((text, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    {text}
                  </motion.p>
                ))}
              </div>

              <motion.div
                className="flex flex-wrap gap-4 mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-forest text-primary-foreground font-semibold rounded-xl hover:bg-forest/90 transition-all shadow-lg shadow-forest/30"
                  >
                    Start Your Journey
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section ref={timelineRef} className="py-24 bg-sand relative overflow-hidden">
        {/* Background Text */}
        <motion.div
          className="absolute top-10 left-0 right-0 text-center pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="text-[100px] md:text-[180px] font-display italic font-bold text-muted-foreground/5 leading-none select-none">
            journey
          </span>
        </motion.div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 bg-forest/10 text-forest font-medium rounded-full text-sm mb-4">
              Our Journey
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold">
              Milestones Along the Way
            </h2>
          </motion.div>

          {/* Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Animated Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-border -translate-x-1/2 hidden md:block">
              <motion.div
                className="w-full bg-gradient-to-b from-forest to-gold"
                style={{ height: timelineLineHeight }}
              />
            </div>

            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                {/* Content */}
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <motion.div
                    className="bg-card p-6 rounded-2xl shadow-lg border border-border/50"
                    whileHover={{ scale: 1.03, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-3xl font-display font-bold text-forest">{milestone.year}</span>
                    <h3 className="text-xl font-semibold mt-2">{milestone.event}</h3>
                    <p className="text-muted-foreground mt-1">{milestone.mstone_description}</p>
                  </motion.div>
                </div>

                {/* Dot */}
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-forest rounded-full border-4 border-background shadow-lg hidden md:block"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + 0.3, type: "spring" }}
                  whileHover={{ scale: 1.5 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section - Modern Cards */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 bg-forest/10 text-forest font-medium rounded-full text-sm mb-4">
              What We Stand For
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold">
              Our Core Values
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 60, rotateX: 20 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring" }}
                whileHover={{ y: -15, scale: 1.02 }}
                className="group relative bg-card p-8 rounded-3xl shadow-lg border border-border/50 overflow-hidden"
              >
                {/* Gradient Background on Hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />

                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-6 shadow-lg`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <value.icon className="w-8 h-8 text-white" />
                </motion.div>

                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>

                {/* Decorative Corner */}
                <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br ${value.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-sand overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 bg-forest/10 text-forest font-medium rounded-full text-sm mb-4">
              The People Behind Nature Escape
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold">
              Meet Our Team
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, type: "spring" }}
                whileHover={{ y: -15 }}
                className="group text-center"
              >
                <motion.div
                  className="relative mb-6 overflow-hidden rounded-3xl shadow-xl"
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className="w-full aspect-square object-cover"
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.6 }}
                  />

                  {/* Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-forest via-forest/50 to-transparent opacity-0 group-hover:opacity-90 transition-all duration-500 flex items-end justify-center pb-6"
                  >
                    <div className="text-primary-foreground text-center">
                      <p className="font-semibold">{member.bio}</p>
                      <div className="flex justify-center gap-2 mt-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                <motion.h3
                  className="text-xl font-bold mb-1"
                  whileHover={{ scale: 1.05 }}
                >
                  {member.name}
                </motion.h3>
                <p className="text-forest font-medium">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Photo Gallery */}
      <TeamGallery />

      {/* CTA Section - Immersive */}
      <section className="py-32 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${sigiriya})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest/95 to-forest/80" />

        {/* Floating Elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gold/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], x: [0, 50, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Ready to Start Your{" "}
              <span className="text-gold">Adventure?</span>
            </motion.h2>

            <motion.p
              className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Let us help you discover the wonders of Sri Lanka. Contact our team today
              to start planning your perfect nature escape.
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-10 py-5 bg-gold text-foreground font-bold rounded-xl shadow-2xl shadow-gold/30 hover:bg-gold-light transition-all"
                >
                  Contact Us Today
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/sri-lanka-tours"
                  className="inline-flex items-center gap-2 px-10 py-5 bg-primary-foreground/10 text-primary-foreground font-bold rounded-xl backdrop-blur-md border-2 border-primary-foreground/30 hover:bg-primary-foreground/20 transition-all"
                >
                  Explore Tours
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;