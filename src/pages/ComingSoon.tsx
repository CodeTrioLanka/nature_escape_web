import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, Sparkles } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/common/SEO";

const ComingSoon = () => {
  return (
    <Layout>
      <SEO
        title="Social Media | Coming Soon | SL Nature Escape"
        description="Our official social media channels are coming soon. Stay tuned for exciting travel updates and nature tours."
      />
      <div className="min-h-[75vh] flex items-center justify-center bg-background py-20 px-4 relative overflow-hidden">
        {/* Background Decorative Vignette */}
        <div className="absolute inset-0 bg-radial-vignette opacity-40 pointer-events-none" />
        
        <div className="container max-w-2xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-20 h-20 bg-primary/10 text-primary rounded-3xl flex items-center justify-center mx-auto mb-8 border border-primary/20 backdrop-blur-sm"
          >
            <Clock className="w-10 h-10 animate-pulse text-primary" />
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-semibold tracking-wide uppercase mb-4 border border-secondary/20"
          >
            <Sparkles className="w-4 h-4" /> Stay Tuned
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6"
          >
            Coming Soon!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-lg mx-auto"
          >
            We are currently setting up our social media channels to bring you inspiring travel stories, stunning Sri Lankan landscapes, and exclusive tour updates.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-ocean-light hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default ComingSoon;
