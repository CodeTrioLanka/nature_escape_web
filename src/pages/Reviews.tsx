import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Quote, Send, MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";
import { fetchPublicReviews, fetchReviewStats, submitReview as submitReviewAPI, Review, ReviewStats } from "@/api/reviews.api";
import PageHero from "@/components/common/PageHero";

// Fallback static reviews data
const staticReviews = [
  {
    id: 1,
    author: "Sarah Mitchell",
    rating: 5,
    date: "2 weeks ago",
    text: "Absolutely incredible experience! The team at Ceylon Tours made our Sri Lanka trip unforgettable. From the cultural sites to the wildlife safaris, everything was perfectly organized.",
    profilePhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    source: "google" as const
  },
  {
    id: 2,
    author: "James Thompson",
    rating: 5,
    date: "1 month ago",
    text: "Best tour company in Sri Lanka! Our guide was knowledgeable and friendly. The hotels they booked were excellent and the itinerary was well-planned.",
    profilePhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    source: "google" as const
  },
  {
    id: 3,
    author: "Emma Wilson",
    rating: 5,
    date: "1 month ago",
    text: "We had an amazing honeymoon experience. The private tours, romantic dinners, and attention to detail made it truly special. Highly recommend!",
    profilePhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    source: "google" as const
  },
  {
    id: 4,
    author: "Michael Chen",
    rating: 4,
    date: "2 months ago",
    text: "Great service and well-organized tours. The wildlife safari in Yala was a highlight. Would definitely book with them again.",
    profilePhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    source: "google" as const
  },
  {
    id: 5,
    author: "Lisa Anderson",
    rating: 5,
    date: "2 months ago",
    text: "From start to finish, everything was perfect. The team went above and beyond to accommodate our requests. The cultural tour was educational and fun!",
    profilePhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    source: "google" as const
  },
  {
    id: 6,
    author: "David Kumar",
    rating: 5,
    date: "3 months ago",
    text: "Exceptional service! They customized our entire trip based on our interests. The hill country tour with tea plantations was breathtaking.",
    profilePhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    source: "google" as const
  },
];

interface DisplayReview {
  id: number | string;
  author: string;
  rating: number;
  date: string;
  text: string;
  profilePhoto: string;
  source: "google" | "website" | "admin";
}

const Reviews = () => {
  const [reviews, setReviews] = useState<DisplayReview[]>(staticReviews);
  const [stats, setStats] = useState<ReviewStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);
  const { toast } = useToast();

  // Fetch reviews from backend
  useEffect(() => {
    const loadReviews = async () => {
      try {
        const [backendReviews, reviewStats] = await Promise.all([
          fetchPublicReviews(),
          fetchReviewStats()
        ]);

        if (backendReviews && backendReviews.length > 0) {
          // Transform backend reviews to display format
          const formattedReviews: DisplayReview[] = backendReviews.map((r: Review) => ({
            id: r._id,
            author: r.name,
            rating: r.rating,
            date: formatDate(r.reviewDate || r.createdAt),
            text: r.reviewText,
            profilePhoto: r.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(r.name)}&background=random`,
            source: (r.source === 'user' ? 'website' : r.source) as DisplayReview['source']
          }));
          setReviews(formattedReviews);
        }

        if (reviewStats) {
          setStats(reviewStats);
        }
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
        // Keep using static reviews on error
      }
      setLoading(false);
    };

    loadReviews();
  }, []);

  // Format date helper
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  const averageRating = stats?.averageRating || reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !reviewText) {
      toast({
        title: "Please fill in all fields",
        description: "Name and review are required.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      // Submit to backend
      const submittedReview = await submitReviewAPI({
        name: name,
        email: email || undefined,
        rating,
        reviewText: reviewText,
      });

      // Add to local reviews list (it will appear after moderation)
      const newReview: DisplayReview = {
        id: submittedReview._id || Date.now(),
        author: name,
        rating,
        date: "Just now",
        text: reviewText,
        profilePhoto: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
        source: "website"
      };

      setReviews([newReview, ...reviews]);
      setName("");
      setEmail("");
      setRating(5);
      setReviewText("");

      toast({
        title: "Thank you for your review!",
        description: "Your review has been submitted and will be visible after moderation.",
      });
    } catch (error) {
      console.error("Failed to submit review:", error);
      toast({
        title: "Submission failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    }

    setSubmitting(false);
  };

  const renderStars = (count: number, interactive = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${star <= (interactive ? hoveredRating || rating : count)
              ? "fill-gold text-gold"
              : "text-muted-foreground"
              } ${interactive ? "cursor-pointer transition-colors" : ""}`}
            onClick={() => interactive && setRating(star)}
            onMouseEnter={() => interactive && setHoveredRating(star)}
            onMouseLeave={() => interactive && setHoveredRating(0)}
          />
        ))}
      </div>
    );
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        {/* Hero Section */}
        <PageHero
          backgroundImage="https://res.cloudinary.com/dicyqfwrf/video/upload/v1770225883/q_cmkpgg.mp4"
          height="h-[70vh]"
          showWave={false}
        />

        {/* Title Section */}
        <section className="pt-16 pb-8 bg-background">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="section-title mb-4">Customer Reviews</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                See what our travelers say about their experiences
              </p>
            </motion.div>
          </div>
        </section>

        {/* Rating Summary */}
        <section className="py-12 bg-sand">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row items-center justify-center gap-8 text-center"
            >
              <div className="flex items-center gap-4">
                <div className="text-5xl font-bold text-ocean">{averageRating.toFixed(1)}</div>
                <div>
                  {renderStars(Math.round(averageRating))}
                  <p className="text-sm text-muted-foreground mt-1">
                    Based on {stats?.totalReviews || reviews.length} reviews
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-5 h-5" />
                <span>Verified Reviews from Google & Our Travelers</span>
              </div>
              <a
                href="https://www.google.com/maps"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-ocean hover:text-ocean-dark transition-colors"
              >
                <span>Review us on Google</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* Reviews Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-display font-semibold text-center mb-12">
              What Our Travelers Say
            </h2>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <img
                        src={review.profilePhoto}
                        alt={review.author}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{review.author}</h3>
                        <p className="text-sm text-muted-foreground">{review.date}</p>
                        <div className="mt-1">{renderStars(review.rating)}</div>
                      </div>
                      {review.source === "google" && (
                        <img
                          src="https://www.google.com/favicon.ico"
                          alt="Google"
                          className="w-5 h-5"
                        />
                      )}
                    </div>
                    <Quote className="w-8 h-8 text-ocean/20 mb-2" />
                    <p className="text-muted-foreground leading-relaxed">{review.text}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Submit Review Form */}
        <section className="py-16 bg-sand">
          <div className="container mx-auto px-4 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl p-8 shadow-lg"
            >
              <h2 className="text-3xl font-display font-semibold text-center mb-2">
                Share Your Experience
              </h2>
              <p className="text-center text-muted-foreground mb-8">
                We'd love to hear about your journey with us
              </p>

              <form onSubmit={handleSubmitReview} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Name *</label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email (optional)</label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Your Rating *</label>
                  {renderStars(rating, true)}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Your Review *</label>
                  <Textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Tell us about your experience..."
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" className="w-full btn-primary gap-2" disabled={submitting}>
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-current"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Review
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Your review will be displayed on our website. For Google Reviews,{" "}
                  <a
                    href="https://www.google.com/maps"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ocean hover:underline"
                  >
                    click here to leave a review on Google
                  </a>
                  .
                </p>
              </form>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Reviews;
