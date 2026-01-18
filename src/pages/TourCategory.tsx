import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ArrowRight, Check, X } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { motion, useScroll, useTransform } from "framer-motion";

// Images
import beachSurfImg from "@/assets/beach-surf.jpg";
import beachParadiseImg from "@/assets/beach-paradise.jpg";
import beachMirissaImg from "@/assets/beach-mirissa.jpg";
import beachUnawatunaImg from "@/assets/beach-unawatuna.jpg";
import sigiriyaImg from "@/assets/sigiriya.jpg";
import teaImg from "@/assets/tea-plantations.jpg";
import templeImg from "@/assets/temple.jpg";
import wildlifeImg from "@/assets/wildlife.jpg";
import adventureImg from "@/assets/adventure.jpg";
import honeymoonImg from "@/assets/honeymoon.jpg";
import mapImg from "@/assets/sri-lanka-map.jpg";

import familyImg from "@/assets/family-beach.jpg";
import golfImg from "@/assets/golf.jpg";

// Category data
const categoryData: Record<string, {
  title: string;
  description: string;
  heroImage: string;
  tours: { id: number; slug: string; title: string; duration: string; image: string; recommended: string[] }[];
  features: { name: string; values: boolean[] }[];
  mapText: { heading: string; subheading: string; description: string };
}> = {
  beach: {
    title: "Beach Tours",
    description: "Sri Lanka's coast dazzles with golden beaches, turquoise waters, vibrant coral reefs, and bustling fishing villages, offering relaxation, adventure, rich culture, and breathtaking sunsets along its endless tropical shoreline.",
    heroImage: beachSurfImg,
    tours: [
      { id: 1, slug: "unawatuna-beach-escape", title: "Eastern Blue Bliss", duration: "11 Nights & 12 Days", image: beachUnawatunaImg, recommended: ["Adventure", "Honeymoon"] },
      { id: 2, slug: "mirissa-surf-retreat", title: "Southern Sands Voyage", duration: "09 Nights & 10 Days", image: beachMirissaImg, recommended: ["Adventure", "Honeymoon"] },
      { id: 3, slug: "bentota-paradise", title: "Sunrise Shores Tour", duration: "13 Nights & 14 Days", image: beachParadiseImg, recommended: ["Family"] },
    ],
    features: [
      { name: "Negombo", values: [false, false, false] },

  { name: "Tangalle", values: [false, true, true] },
  { name: "Hummanaya Blow Hole", values: [false, true, true] },
  { name: "Mulgirigala Temple", values: [false, true, true] },
  { name: "Kalametiya Bird Sanctuary", values: [false, true, true] },
  { name: "Scuba Diving", values: [false, true, true] },

  { name: "Habarana", values: [true, false, true] },
  { name: "Sigiriya", values: [true, false, true] },

  { name: "Trincomalee", values: [true, false, false] },
  { name: "Pigeon Island", values: [true, false, false] },
  { name: "Koneshwaram Temple", values: [true, false, true] },

  { name: "Pasikudah", values: [true, false, true] },

  { name: "Arugambay", values: [true, false, true] },
  { name: "Surfing", values: [true, false, true] },

  { name: "Yala", values: [true, false, true] },
  { name: "Yala National Park Safari", values: [true, false, true] },

  { name: "Mirissa", values: [false, true, true] },
  { name: "Surfing (Mirissa)", values: [false, true, true] },
  { name: "Whale and Dolphin Watching", values: [false, true, true] },

  { name: "Unawatuna", values: [false, true, true] },
  { name: "Jungle Beach", values: [false, true, true] },

  { name: "Galle", values: [false, false, true] },
  { name: "Galle Fort Tour", values: [false, false, true] },

  { name: "Hikkaduwa", values: [false, true, true] },
  { name: "Snorkelling", values: [false, true, true] },
  { name: "Kayaking", values: [false, true, true] },

  { name: "Bentota", values: [false, true, true] },
  { name: "Kosgoda Sea Turtle Hatchery", values: [false, false, true] },

  { name: "Kalpitiya", values: [true, true, false] },
  { name: "Kite Surfing", values: [true, true, false] },
  { name: "Dolphin Watching", values: [true, true, false] },
  { name: "Fishing", values: [true, true, false] },
  { name: "Cookery Demonstration", values: [true, true, false] },
  { name: "Wilpattu National Park Safari", values: [true, true, false] },

  { name: "Colombo", values: [true, false, false] },
  { name: "Street Food Tour", values: [true, false, false] },
  { name: "City Tour and Shopping", values: [true, false, false] },

  { name: "Mannar", values: [true, true, false] },
  { name: "Mannar Fort", values: [true, true, false] },

  { name: "Jaffna", values: [true, true, false] },
  { name: "KKS Beach", values: [true, true, false] },
  { name: "Casuarina Beach", values: [true, true, false] },
  { name: "Keerimalai Hot Water Spring", values: [true, true, false] }
    ],
    mapText: {
      heading: "Sun, Sand, and Sea",
      subheading: "Sri Lanka's Beach Paradise Awaits",
      description: "Discover over 1,340 km of stunning coastline with pristine beaches, world-class surf spots, and crystal-clear waters perfect for snorkeling and diving."
    }
  },
  cultural: {
    title: "Cultural Tours",
    description: "Journey through Sri Lanka's ancient heritage with UNESCO World Heritage sites, sacred temples, and historic kingdoms. Discover the Cultural Triangle featuring Sigiriya, Polonnaruwa, and Anuradhapura.",
    heroImage: sigiriyaImg,
    tours: [
      { id: 1, slug: "cultural-triangle-explorer", title: "Cultural Triangle Explorer", duration: "8 Days / 7 Nights", image: sigiriyaImg, recommended: ["Cultural", "History"] },
      { id: 2, slug: "temple-trail-pilgrimage", title: "Temple Trail Pilgrimage", duration: "6 Days / 5 Nights", image: templeImg, recommended: ["Spiritual", "Cultural"] },
      { id: 3, slug: "cultural-triangle-explorer", title: "The Heritage Legacy", duration: "14 Nights / 15 Days", image: sigiriyaImg, recommended: ["Adventure", "Cultural"] },
    ],
    features: [
      { name: "Negombo", values: [true, true, true] },
      { name: "Dambulla Cave Temple", values: [true, true, true] },
      { name: "Sigiriya Rock Fortress", values: [true, true, true] },
      { name: "Polonnaruwa Ancient City", values: [true, true, true] },
      { name: "Anuradhapura", values: [false, true, true] },
      { name: "Mihintale", values: [false, true, true] },
      { name: "Kandy", values: [true, true, true] },
      { name: "Temple of the Tooth", values: [true, true, true] },
      { name: "Cultural Dance Show", values: [true, true, true] },
      { name: "Royal Botanical Gardens", values: [true, true, true] },
      { name: "Nuwara Eliya", values: [false, true, true] },
      { name: "Tea Factory Visit", values: [true, true, true] },
      { name: "Ella", values: [false, true, true] },
      { name: "Nine Arch Bridge", values: [false, true, true] },
      { name: "Yala Safari", values: [false, false, true] },
      { name: "Galle Fort", values: [true, true, true] },
      { name: "Colombo City Tour", values: [true, true, true] },
    ],
    mapText: {
      heading: "Sri Lanka",
      subheading: "Cultural Route Map",
      description: "Explore ancient kingdoms, sacred temples, and UNESCO World Heritage sites across the Cultural Triangle of Sri Lanka."
    }
  },
  honeymoon: {
    title: "Honeymoon Tours",
    description: "Celebrate your love in paradise with romantic honeymoon packages. From mystical beaches and incredible sunsets to the misty highlands, experience unforgettable moments with your loved one.",
    heroImage: honeymoonImg,
    tours: [
      { id: 1, slug: "romantic-honeymoon-escape", title: "Romantic Honeymoon Escape", duration: "10 Days / 9 Nights", image: honeymoonImg, recommended: ["Couples", "Romantic"] },
      { id: 2, slug: "romantic-honeymoon-escape", title: "Romantic Serenity in the Mist", duration: "7 Nights / 8 Days", image: beachMirissaImg, recommended: ["Romantic", "Scenic"] },
      { id: 3, slug: "romantic-honeymoon-escape", title: "Passion's Getaway", duration: "5 Nights / 6 Days", image: beachParadiseImg, recommended: ["Beach", "Romantic"] },
    ],
    features: [
      { name: "Negombo", values: [true, true, true] },
      { name: "Temple of the Tooth", values: [true, false, false] },
      { name: "Pinnawala Elephant Orphanage", values: [true, true, false] },
      { name: "Kandy", values: [true, true, false] },
      { name: "Nuwara Eliya", values: [true, true, false] },
      { name: "Tea Plantation", values: [true, true, false] },
      { name: "Ella", values: [true, false, false] },
      { name: "Nine Arch Bridge", values: [true, false, false] },
      { name: "Yala Safari", values: [true, false, false] },
      { name: "Mirissa", values: [true, true, false] },
      { name: "Whale Watching", values: [true, true, false] },
      { name: "Galle Fort", values: [true, true, true] },
      { name: "Bentota", values: [true, true, true] },
      { name: "Couples Spa", values: [true, true, true] },
      { name: "Private Dinner", values: [true, true, true] },
      { name: "Sunset Cruise", values: [true, true, false] },
    ],
    mapText: {
      heading: "Love, Nature, and Sunset Cruises",
      subheading: "Perfect Sri Lanka Honeymoon Escapes",
      description: "Experience romantic getaways combining luxury resorts, private beach dinners, scenic train rides, and unforgettable sunset moments."
    }
  },
  "hill-country": {
    title: "Hill Country Tours",
    description: "Explore the misty highlands of Sri Lanka with scenic tea plantations, cool climate, and breathtaking mountain views.",
    heroImage: teaImg,
    tours: [
      { id: 1, slug: "cultural-triangle-explorer", title: "Hills and Waterfalls Tour", duration: "6 Nights / 7 Days", image: teaImg, recommended: ["Scenic", "Nature"] },
      { id: 2, slug: "cultural-triangle-explorer", title: "Sri Lanka Cloud Adventure", duration: "10 Nights / 11 Days", image: teaImg, recommended: ["Adventure", "Nature"] },
    ],
    features: [{ name: "Negombo", values: [true, true] }, { name: "Temple of the Tooth", values: [true, true] }, { name: "Ella", values: [true, true] }, { name: "Nine Arch Bridge", values: [true, true] }, { name: "Scenic Train Ride", values: [true, true] }],
    mapText: { heading: "Discover the Highlands", subheading: "Misty, Cool, and Hill Country Pleasures", description: "Experience the scenic beauty of Sri Lanka's hill country." }
  },
  wildlife: {
    title: "Wildlife Tours",
    description: "Discover the wild side of Sri Lanka with thrilling safari adventures.",
    heroImage: wildlifeImg,
    tours: [
      { id: 1, slug: "wildlife-safari-expedition", title: "Wildlife Safari Expedition", duration: "6 Days / 5 Nights", image: wildlifeImg, recommended: ["Adventure", "Family"] },
      { id: 2, slug: "wildlife-safari-expedition", title: "Wildlife Parks Explored", duration: "6 Nights / 7 Days", image: wildlifeImg, recommended: ["Nature", "Photography"] },
      { id: 3, slug: "wildlife-safari-expedition", title: "Wilpattu Wild Escape", duration: "4 Nights / 5 Days", image: wildlifeImg, recommended: ["Adventure"] },
    ],
    features: [{ name: "Yala National Park", values: [true, true, false] }, { name: "Minneriya Safari", values: [true, true, false] }, { name: "Wilpattu National Park", values: [false, false, true] }],
    mapText: { heading: "From Wild Parks to Peaks", subheading: "Sri Lanka's Ultimate Adventure Trail", description: "Experience world-class wildlife safaris." }
  },
  adventure: {
    title: "Adventure Tours",
    description: "Experience hiking, biking, kayaking, and thrilling adventures.",
    heroImage: adventureImg,
    tours: [
      { id: 1, slug: "adventure-adrenaline-rush", title: "Adventure Adrenaline Rush", duration: "7 Days / 6 Nights", image: adventureImg, recommended: ["Thrill", "Active"] },
      { id: 2, slug: "adventure-adrenaline-rush", title: "Sri Lanka Wild Trekking", duration: "8 Nights / 9 Days", image: adventureImg, recommended: ["Hiking", "Nature"] },
      { id: 3, slug: "adventure-adrenaline-rush", title: "Extreme Trek Sri Lanka", duration: "6 Nights / 7 Days", image: beachSurfImg, recommended: ["Extreme", "Adventure"] },
    ],
    features: [{ name: "White Water Rafting", values: [true, true, true] }, { name: "Ella Hiking", values: [true, true, true] }, { name: "Surfing", values: [true, false, true] }],
    mapText: { heading: "Adventure-Filled Sri Lanka", subheading: "From Highlands to Beaches and Beyond", description: "Push your limits with thrilling adventures." }
  },
  ayurvedic: {
    title: "Ayurvedic Tours",
    description: "Rejuvenate your mind and body with Sri Lanka's ancient healing traditions.",
    heroImage: teaImg,
    tours: [
      { id: 1, slug: "romantic-honeymoon-escape", title: "Sri Lanka Ayurveda Stay", duration: "10 Nights / 11 Days", image: honeymoonImg, recommended: ["Wellness", "Relaxation"] },
      { id: 2, slug: "romantic-honeymoon-escape", title: "Forever Glowing", duration: "7 Nights / 8 Days", image: teaImg, recommended: ["Spa", "Healing"] },
    ],
    features: [{ name: "Ayurvedic Spa Resort", values: [true, true] }, { name: "Yoga Sessions", values: [true, true] }, { name: "Meditation", values: [true, true] }],
    mapText: { heading: "Rejuvenate Your Mind and Body", subheading: "With Sri Lanka's Ayurvedic Escapes", description: "Experience ancient healing traditions." }
  },
  family: {
    title: "Family Tours",
    description: "Create unforgettable memories with family-friendly adventures across Sri Lanka.",
    heroImage: familyImg,
    tours: [
      { id: 1, slug: "family-adventure-tour", title: "Family Adventure Tour", duration: "9 Days / 8 Nights", image: familyImg, recommended: ["Kids", "Family"] },
      { id: 2, slug: "family-adventure-tour", title: "Family Escapade in Sri Lanka", duration: "14 Nights / 15 Days", image: wildlifeImg, recommended: ["Adventure", "Family"] },
    ],
    features: [{ name: "Elephant Safari", values: [true, true] }, { name: "Scenic Train Ride", values: [true, true] }, { name: "Beach Activities", values: [true, true] }],
    mapText: { heading: "Unforgettable Family Adventures", subheading: "Sri Lanka's Best Family Destinations", description: "Create lasting memories with family-friendly tours." }
  },
  ramayana: {
    title: "Ramayana Tours",
    description: "Walk in the footsteps of Hindu mythology on this spiritual journey.",
    heroImage: templeImg,
    tours: [
      { id: 1, slug: "temple-trail-pilgrimage", title: "11 Days Ramayana Trail", duration: "10 Nights / 11 Days", image: templeImg, recommended: ["Spiritual", "Cultural"] },
      { id: 2, slug: "temple-trail-pilgrimage", title: "Sri Lanka's Legends", duration: "8 Nights / 9 Days", image: sigiriyaImg, recommended: ["History", "Mythology"] },
      { id: 3, slug: "temple-trail-pilgrimage", title: "Ramayana Mini Trail", duration: "5 Nights / 6 Days", image: templeImg, recommended: ["Short Trip"] },
    ],
    features: [{ name: "Sita Amman Temple", values: [true, true, true] }, { name: "Ravana Cave", values: [true, true, true] }, { name: "Hakgala Gardens", values: [true, true, true] }],
    mapText: { heading: "Ramayana Trail Map", subheading: "Discover Sri Lanka's Legendary Journey", description: "Follow the sacred path of the Ramayana epic." }
  },
  golf: {
    title: "Golf Tours",
    description: "Sri Lanka is home to some of the oldest and finest golf courses in South Asia.",
    heroImage: golfImg,
    tours: [
      { id: 1, slug: "cultural-triangle-explorer", title: "18 Holes of Golfing", duration: "6 Nights / 7 Days", image: golfImg, recommended: ["Golf", "Luxury"] },
      { id: 2, slug: "cultural-triangle-explorer", title: "The Ultimate Golf Escape", duration: "10 Nights / 11 Days", image: golfImg, recommended: ["Golf", "Premium"] },
    ],
    features: [{ name: "Royal Colombo Golf Club", values: [true, true] }, { name: "Victoria Golf Club", values: [true, true] }, { name: "Nuwara Eliya Golf Club", values: [true, true] }],
    mapText: { heading: "Sri Lanka's Golf Paradise", subheading: "World-Class Courses in Tropical Settings", description: "Experience world-class golfing in stunning settings." }
  }
};

const TourCategory = () => {
  const { category } = useParams<{ category: string }>();
  const data = categoryData[category || "beach"] || categoryData.beach;
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <Layout>
      {/* Hero Section with Parallax */}
      <section className="relative h-[50vh] min-h-[350px] overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{ 
            backgroundImage: `url(${data.heroImage})`,
            y: heroY
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/30 via-foreground/10 to-foreground/40" />
        </motion.div>
      </section>

      {/* Title Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm tracking-widest text-muted-foreground uppercase"
          >
            Sri Lanka
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold text-foreground mt-2 mb-6"
          >
            {data.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground max-w-4xl mx-auto leading-relaxed"
          >
            {data.description}
          </motion.p>
        </div>
      </section>

      {/* Featured Tours - Modern Card Design */}
      <section className="py-8 pb-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.tours.map((tour, index) => (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link 
                  to={`/tour/${tour.slug}`}
                  className="group block"
                >
                  <div className="relative overflow-hidden aspect-[4/5] rounded-lg shadow-lg">
                    {/* Background Image */}
                    <img 
                      src={tour.image} 
                      alt={tour.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent" />
                    
                    {/* Recommended Tag - Top */}
                    <div className="absolute top-4 left-4 right-4">
                      <span className="inline-block px-3 py-1.5 bg-secondary/90 backdrop-blur-sm text-secondary-foreground text-[10px] font-semibold tracking-wider uppercase rounded">
                        Recommended for {tour.recommended.join(", ")}
                      </span>
                    </div>
                    
                    {/* Content - Bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      {/* Category Label */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-semibold tracking-widest uppercase text-primary-foreground/80">
                          {data.title}
                        </span>
                        <span className="w-8 h-[1px] bg-primary-foreground/50" />
                      </div>
                      
                      {/* Tour Title */}
                      <h3 className="text-xl font-display font-bold text-primary-foreground mb-2 group-hover:text-secondary transition-colors duration-300">
                        {tour.title.toUpperCase()}
                      </h3>
                      
                      {/* Duration */}
                      <p className="text-sm text-primary-foreground/80">
                        {tour.duration}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-12 bg-sand">
        <div className="container mx-auto px-4">
          <div className="overflow-x-auto">
            <table className="w-full max-w-4xl mx-auto bg-card rounded-xl shadow-lg overflow-hidden">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-display font-semibold text-foreground">
                    Inclusions
                  </th>
                  {data.tours.map((tour) => (
                    <th key={tour.id} className="p-4 text-center">
                      <div className="font-display font-semibold text-foreground text-sm">
                        {tour.title}
                      </div>
                      <div className="text-muted-foreground text-xs mt-1">
                        {tour.duration}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.features.map((feature, idx) => (
                  <tr 
                    key={feature.name} 
                    className={idx % 2 === 0 ? "bg-card" : "bg-muted/30"}
                  >
                    <td className="p-4 text-sm text-foreground">
                      {feature.name}
                    </td>
                    {feature.values.map((value, i) => (
                      <td key={i} className="p-4 text-center">
                        {value ? (
                          <Check className="w-5 h-5 text-forest mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground/40 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-accent">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <img 
                src={mapImg} 
                alt="Map of Sri Lanka"
                className="w-full max-w-sm mx-auto rounded-2xl shadow-xl"
              />
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-display font-bold mt-3 mb-2">
                {data.mapText.heading}
              </h2>
              <h3 className="text-xl md:text-2xl font-display font-medium text-primary mb-6">
                {data.mapText.subheading}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {data.mapText.description}
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-card p-4 rounded-lg">
                  <span className="text-2xl font-display font-bold text-primary">{data.tours.length}</span>
                  <p className="text-muted-foreground text-sm">Tour Packages</p>
                </div>
                <div className="bg-card p-4 rounded-lg">
                  <span className="text-2xl font-display font-bold text-primary">4-14</span>
                  <p className="text-muted-foreground text-sm">Days Duration</p>
                </div>
              </div>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-ocean-light transition-all"
              >
                Get a Custom Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-ocean-dark">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground mb-4">
            Ready to Book Your {data.title.replace(" Tours", "")} Adventure?
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            Contact our travel experts for personalized recommendations and exclusive deals.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:brightness-110 transition-all"
            >
              Request Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/sri-lanka-tours"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary-foreground/10 text-primary-foreground font-medium rounded-lg border border-primary-foreground/30 hover:bg-primary-foreground/20 transition-all"
            >
              View All Tours
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TourCategory;
