import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { Clock, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import wildlife from "@/assets/wildlife.jpg";
import sigiriya from "@/assets/sigiriya.jpg";
import teaPlantations from "@/assets/tea-plantations.jpg";
import beachMirissa from "@/assets/beach-mirissa.jpg";
import temple from "@/assets/temple.jpg";
import adventure from "@/assets/adventure.jpg";
import beachUnawatuna from "@/assets/beach-unawatuna.jpg";

interface Landmark {
  name: string;
  image: string;
}

interface ExcursionData {
  title: string;
  category: string;
  categoryTag: string;
  heroImage: string;
  description: string;
  tagline: string;
  pickUpTime: string;
  dropOffTime: string;
  location: string;
  landmarks: Landmark[];
  inclusions: string[];
  exclusions: string[];
  faqs: { question: string; answer: string }[];
  faqImage: string;
}

const excursionsData: Record<string, ExcursionData> = {
  "colombo-tuk-tuk": {
    title: "Colombo By Tuk Tuk",
    category: "Walkers Tours Excursions",
    categoryTag: "ADVENTURE | CITY | COLOMBO | HALF DAY",
    heroImage: temple,
    description: `Hop into a colorful tuk tuk and dive into the vibrant heart of Colombo on an unforgettable urban adventure! Feel the buzz of the city as you zip through bustling streets, colonial landmarks, lively markets, and hidden alleyways only the locals know.

With the wind in your hair and a friendly local guide behind the wheel, explore iconic sights like the Gangaramaya Temple, Independence Square, and Galle Face Green, all from the comfort of this three-wheeled ride. Stop to sip fresh king coconut, sample sizzling street food, or browse through spice shops and handicraft stalls brimming with color and culture.

Whether it's your first visit or a return trip, Colombo by Tuk Tuk offers a fun, authentic, and immersive way to experience the city charm, history, and street life. It's not just a tour it's a pulse-racing ride through the soul of Sri Lanka's capital!`,
    tagline: "Discover Colombo Like a Local – By Tuk Tuk!",
    pickUpTime: "2:00 PM",
    dropOffTime: "6:00 PM",
    location: "Pick up Location",
    landmarks: [
      { name: "GANGARAMAYA TEMPLE", image: temple },
      { name: "INDEPENDENCE SQUARE", image: sigiriya },
      { name: "GALLE FACE GREEN", image: beachMirissa }
    ],
    inclusions: [
      "Pick up & Drop off (Colombo)",
      "Entrance Fees to the mentioned locations",
      "English Speaking Tuk Rider",
      "Transportation",
      "Government Taxes"
    ],
    exclusions: [
      "Accommodation & Meals",
      "Entrance fees unless mentioned in the 'inclusions' list",
      "Alcoholic Beverages",
      "Tips & Expenses of personal nature",
      "Travel Insurance, Visa & Air Fare"
    ],
    faqs: [
      {
        question: "What are the best times to explore Colombo by Tuk Tuk?",
        answer: "The best times are early morning (7-9 AM) to avoid traffic and experience the city waking up, or late afternoon (4-6 PM) for beautiful sunset views at Galle Face Green."
      },
      {
        question: "What are the sites covered by the ride?",
        answer: "The tour covers Gangaramaya Temple, Independence Square, Galle Face Green, Pettah Market, Dutch Hospital, and several colonial-era buildings."
      }
    ],
    faqImage: beachUnawatuna
  },
  "hot-air-balloon": {
    title: "Hot Air Balloon Ride",
    category: "Walkers Tours Excursions",
    categoryTag: "ADVENTURE | SIGIRIYA | HALF DAY",
    heroImage: sigiriya,
    description: `Experience the magic of Sri Lanka from the skies on a breathtaking hot air balloon ride over the Cultural Triangle. As dawn breaks and the first rays of sunlight paint the horizon, gently rise above the misty plains for panoramic views of ancient ruins, lush jungles, and iconic landmarks.

Drift peacefully over the magnificent Sigiriya Rock Fortress and the ancient city of Polonnaruwa, witnessing the stunning landscape from a perspective few ever see. Watch elephants roam below, spot exotic birds, and take in the serene beauty of Sri Lanka's heartland.

This once-in-a-lifetime adventure combines tranquility with thrill, offering an unforgettable way to appreciate the country's rich heritage and natural splendor.`,
    tagline: "Soar Above the Ancient Wonders!",
    pickUpTime: "4:30 AM",
    dropOffTime: "8:00 AM",
    location: "Sigiriya/Dambulla Hotels",
    landmarks: [
      { name: "SIGIRIYA ROCK FORTRESS", image: sigiriya },
      { name: "CULTURAL TRIANGLE", image: temple },
      { name: "WILDLIFE SPOTTING", image: wildlife }
    ],
    inclusions: [
      "Hotel Pick up & Drop off",
      "Hot Air Balloon Flight (approx. 45 mins)",
      "Champagne Toast upon landing",
      "Flight Certificate",
      "Government Taxes"
    ],
    exclusions: [
      "Accommodation & Meals",
      "Personal Expenses",
      "Travel Insurance",
      "Tips for crew",
      "Visa & Air Fare"
    ],
    faqs: [
      {
        question: "What time does the balloon ride start?",
        answer: "Balloon rides start at dawn, typically around 5:30 AM, to take advantage of calm winds and beautiful sunrise views."
      },
      {
        question: "Is it safe for all ages?",
        answer: "Yes, it's safe for most ages. However, children under 5 and pregnant women are not recommended. The basket can accommodate 8-12 passengers."
      }
    ],
    faqImage: sigiriya
  },
  "yala-luxury-safari": {
    title: "Yala National Park – Luxury Jeep Safari",
    category: "Walkers Tours Excursions",
    categoryTag: "WILDLIFE | YALA | FULL DAY",
    heroImage: wildlife,
    description: `Embark on an extraordinary wildlife adventure in Yala National Park, home to one of the highest leopard densities in the world. Our luxury jeep safari offers an exclusive, comfortable experience as you traverse the rugged terrain in search of Sri Lanka's magnificent wildlife.

Spot majestic elephants, elusive leopards, sloth bears, crocodiles, and over 200 species of birds in their natural habitat. Our expert naturalist guides know the park intimately and will ensure you have the best chances of unforgettable wildlife encounters.

Travel in style in our premium 4x4 vehicles equipped with comfortable seating, refreshments, and all the amenities for a first-class safari experience.`,
    tagline: "Experience Wildlife in Ultimate Luxury!",
    pickUpTime: "5:00 AM",
    dropOffTime: "12:00 PM",
    location: "Yala Area Hotels",
    landmarks: [
      { name: "LEOPARD TERRITORY", image: wildlife },
      { name: "ELEPHANT GATHERING", image: wildlife },
      { name: "BIRD SANCTUARY", image: teaPlantations }
    ],
    inclusions: [
      "Luxury Jeep with AC",
      "Expert Naturalist Guide",
      "Park Entrance Fees",
      "Refreshments & Snacks",
      "Government Taxes"
    ],
    exclusions: [
      "Accommodation & Meals",
      "Personal Expenses",
      "Alcoholic Beverages",
      "Tips for guide",
      "Travel Insurance"
    ],
    faqs: [
      {
        question: "What is the best time to visit Yala?",
        answer: "The best time is from February to July when water sources are limited, concentrating wildlife around waterholes. The park is closed in September for maintenance."
      },
      {
        question: "Will we definitely see leopards?",
        answer: "While Yala has a high leopard density, sightings cannot be guaranteed as they are wild animals. Our experienced guides maximize your chances."
      }
    ],
    faqImage: wildlife
  },
  "galle-fort-tour": {
    title: "Galle Fort Walking Tour",
    category: "Walkers Tours Excursions",
    categoryTag: "CULTURAL | GALLE | HALF DAY",
    heroImage: beachMirissa,
    description: `Step back in time as you explore the UNESCO World Heritage Galle Fort, a living monument to 400 years of colonial history. Wander through cobblestone streets lined with Dutch colonial buildings, boutique shops, art galleries, and charming cafes.

Our expert guide will bring history to life as you discover the ancient ramparts, the iconic lighthouse, Dutch Reformed Church, and hidden gems that most tourists miss. Learn about the Portuguese, Dutch, and British influences that shaped this remarkable fortified city.

Experience the perfect blend of history, culture, and coastal beauty in one unforgettable walking tour.`,
    tagline: "Walk Through Centuries of History!",
    pickUpTime: "9:00 AM",
    dropOffTime: "1:00 PM",
    location: "Galle Fort Entrance",
    landmarks: [
      { name: "GALLE LIGHTHOUSE", image: beachMirissa },
      { name: "DUTCH REFORMED CHURCH", image: temple },
      { name: "ANCIENT RAMPARTS", image: beachUnawatuna }
    ],
    inclusions: [
      "Expert Local Guide",
      "Entrance Fees",
      "Refreshments",
      "Walking Tour Map",
      "Government Taxes"
    ],
    exclusions: [
      "Transportation to Galle",
      "Meals",
      "Personal Shopping",
      "Tips for guide",
      "Travel Insurance"
    ],
    faqs: [
      {
        question: "How long is the walking tour?",
        answer: "The tour is approximately 3-4 hours, covering about 2-3 kilometers within the fort. Comfortable walking shoes are recommended."
      },
      {
        question: "Is the tour suitable for elderly?",
        answer: "Yes, the pace is leisurely with several rest stops. However, some cobblestone streets may be uneven."
      }
    ],
    faqImage: beachMirissa
  },
  "tea-plantation": {
    title: "Tea Plantation Experience",
    category: "Walkers Tours Excursions",
    categoryTag: "CULTURAL | NUWARA ELIYA | FULL DAY",
    heroImage: teaPlantations,
    description: `Immerse yourself in the world of Ceylon Tea with an authentic plantation experience in the misty hills of Nuwara Eliya. Visit a working tea estate and discover the journey from leaf to cup that has made Sri Lankan tea famous worldwide.

Walk through emerald-green tea fields with stunning mountain backdrops, meet the skilled tea pluckers, and tour the factory to witness the traditional processing methods. Learn the art of tea tasting from expert sommeliers and sample some of the finest Ceylon teas.

Take home not just memories, but a deeper appreciation for the craft and culture behind every perfect cup.`,
    tagline: "Discover the Art of Ceylon Tea!",
    pickUpTime: "7:00 AM",
    dropOffTime: "5:00 PM",
    location: "Nuwara Eliya Hotels",
    landmarks: [
      { name: "TEA FIELDS", image: teaPlantations },
      { name: "TEA FACTORY", image: teaPlantations },
      { name: "TASTING ROOM", image: temple }
    ],
    inclusions: [
      "Hotel Pick up & Drop off",
      "Factory Tour & Tasting",
      "Traditional Lunch",
      "Tea Gift Pack",
      "Government Taxes"
    ],
    exclusions: [
      "Accommodation",
      "Additional Tea Purchases",
      "Personal Expenses",
      "Tips",
      "Travel Insurance"
    ],
    faqs: [
      {
        question: "What should I wear?",
        answer: "Bring warm layers as the hill country can be cool. Comfortable walking shoes and rain protection are recommended."
      },
      {
        question: "Can I buy tea to take home?",
        answer: "Yes! The estate has a shop with a wide selection of premium teas available for purchase at factory prices."
      }
    ],
    faqImage: teaPlantations
  },
  "white-water-rafting": {
    title: "White Water Rafting",
    category: "Walkers Tours Excursions",
    categoryTag: "ADVENTURE | KITULGALA | FULL DAY",
    heroImage: adventure,
    description: `Get your adrenaline pumping with an exhilarating white water rafting adventure on the Kelani River in Kitulgala! Navigate through thrilling rapids, surrounded by pristine rainforest and stunning scenery.

Our experienced guides ensure your safety while maximizing the fun as you tackle Grade 2-3 rapids perfect for beginners and thrill-seekers alike. Between the exciting rapids, enjoy calmer stretches to take in the lush tropical surroundings.

This is the same river where the Academy Award-winning film "Bridge on the River Kwai" was filmed, adding a touch of cinema history to your adventure.`,
    tagline: "Ride the Rapids of Adventure!",
    pickUpTime: "6:00 AM",
    dropOffTime: "4:00 PM",
    location: "Colombo Hotels",
    landmarks: [
      { name: "KELANI RIVER", image: adventure },
      { name: "RAINFOREST VIEWS", image: teaPlantations },
      { name: "MOVIE LOCATION", image: sigiriya }
    ],
    inclusions: [
      "Hotel Pick up & Drop off",
      "All Rafting Equipment",
      "Safety Briefing & Training",
      "Lunch",
      "Government Taxes"
    ],
    exclusions: [
      "Accommodation",
      "Waterproof Camera Rental",
      "Personal Expenses",
      "Tips for guides",
      "Travel Insurance"
    ],
    faqs: [
      {
        question: "Do I need prior experience?",
        answer: "No experience necessary! Our guides provide full training before you hit the water. Basic swimming ability is recommended."
      },
      {
        question: "What should I bring?",
        answer: "Bring swimwear, change of clothes, towel, sunscreen, and secure footwear. Leave valuables at the hotel."
      }
    ],
    faqImage: adventure
  }
};

const ExcursionDetail = () => {
  const { excursionSlug } = useParams();
  const excursion = excursionsData[excursionSlug || ""];

  if (!excursion) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-serif mb-4">Excursion not found</h1>
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
      <section className="relative h-[45vh] min-h-[350px]">
        <div className="absolute inset-0">
          <img
            src={excursion.heroImage}
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
              {excursion.categoryTag}
            </span>
            <p className="text-sm text-muted-foreground mb-2">{excursion.category}</p>
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

      {/* Tagline & Details Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-serif text-foreground">
              {excursion.tagline}
            </h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-12">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-primary" />
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Pick Up</p>
                <p className="font-semibold">{excursion.pickUpTime}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-primary" />
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Drop Off</p>
                <p className="font-semibold">{excursion.dropOffTime}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-primary" />
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Commencing and ending at</p>
                <p className="font-semibold">{excursion.location}</p>
              </div>
            </div>
          </div>

          {/* Landmarks */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold tracking-wider mb-6">
              LANDMARKS ON THE ROUTE <span className="inline-block w-12 h-[2px] bg-primary align-middle ml-2" />
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {excursion.landmarks.map((landmark, index) => (
                <motion.div
                  key={landmark.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative h-[250px] overflow-hidden rounded-lg group"
                >
                  <img
                    src={landmark.image}
                    alt={landmark.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h4 className="text-white font-semibold">
                      {landmark.name}
                      <span className="inline-block ml-2 w-8 h-[2px] bg-primary align-middle" />
                    </h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Inclusions & Exclusions */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-sm font-semibold tracking-wider mb-6">
                INCLUSIONS <span className="inline-block w-12 h-[2px] bg-primary align-middle ml-2" />
              </h3>
              <ul className="space-y-3">
                {excursion.inclusions.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-primary mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-sm font-semibold tracking-wider mb-6">
                EXCLUSIONS <span className="inline-block w-12 h-[2px] bg-primary align-middle ml-2" />
              </h3>
              <ul className="space-y-3">
                {excursion.exclusions.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-primary mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[400px] rounded-lg overflow-hidden"
            >
              <img
                src={excursion.faqImage}
                alt="FAQ"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-primary font-medium mb-2">Everything</p>
              <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-8">
                You Need to Know
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {excursion.faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ExcursionDetail;
