import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { sendMessage, fetchContactDetails, ContactDetails } from "@/api/contact.api";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/common/PageHero";

const Contact = () => {
  const [subject, setSubject] = useState("General Inquiry");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [customSubject, setCustomSubject] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactDetails, setContactDetails] = useState<ContactDetails | null>(null);

  useEffect(() => {
    const loadContactDetails = async () => {
      try {
        const data = await fetchContactDetails();
        if (data) {
          setContactDetails(data);
        }
      } catch (error) {
        console.error("Failed to load contact details", error);
      }
    };
    loadContactDetails();
  }, []);

  const displayContactInfo = [
    {
      icon: MapPin,
      title: "Our Office",
      lines: Array.isArray(contactDetails?.address) && contactDetails.address.length > 0
        ? contactDetails.address
        : ["130 Galle Road, Colombo 03", "Sri Lanka"],
    },
    {
      icon: Phone,
      title: "Phone",
      lines: Array.isArray(contactDetails?.phone) && contactDetails.phone.length > 0
        ? contactDetails.phone
        : ["+94 11 234 5678", "+94 77 123 4567"],
    },
    {
      icon: Mail,
      title: "Email",
      lines: Array.isArray(contactDetails?.email) && contactDetails.email.length > 0
        ? contactDetails.email
        : ["info@ceylontours.com", "bookings@ceylontours.com"],
    },
    {
      icon: Clock,
      title: "Business Hours",
      lines: Array.isArray(contactDetails?.bussinessHours) && contactDetails.bussinessHours.length > 0
        ? contactDetails.bussinessHours
        : ["Monday - Friday: 9:00 AM - 6:00 PM", "Saturday: 9:00 AM - 1:00 PM"],
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const finalSubject = subject === "Other" ? customSubject : subject;

      await sendMessage({
        firstName,
        lastName,
        email,
        subject: finalSubject,
        message
      });

      toast.success("Message sent successfully!");

      // Reset form
      setFirstName("");
      setLastName("");
      setEmail("");
      setMessage("");
      setSubject("General Inquiry");
      setCustomSubject("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <Layout>
      {/* Hero Section */}
      <PageHero
        backgroundImage="https://res.cloudinary.com/dicyqfwrf/video/upload/v1770219053/Whisk_etzyetmzqwz1qgmi1cmiddotewz5qtlzatz10sn_zjjrrk.mp4"
        height="h-[60vh] min-h-[300px]"
        showWave={false}
      />

      <section className="py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-medium tracking-wider uppercase text-sm">
              Get In Touch
            </span>
            <h1 className="section-title mt-3 mb-4">Contact Us</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Have questions about our tours? We're here to help plan your perfect Sri Lanka adventure.
            </p>
          </motion.div>

          {/* Social Media Links */}
          {contactDetails?.socials && (
            <motion.div
              className="flex justify-center gap-6 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {contactDetails.socials.facebook && (
                <a href={contactDetails.socials.facebook} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-accent hover:bg-primary hover:text-white transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                </a>
              )}
              {contactDetails.socials.instagram && (
                <a href={contactDetails.socials.instagram} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-accent hover:bg-primary hover:text-white transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                </a>
              )}
              {contactDetails.socials.twitter && (
                <a href={contactDetails.socials.twitter} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-accent hover:bg-primary hover:text-white transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
                </a>
              )}
            </motion.div>
          )}

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {displayContactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  className="flex gap-5 p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <motion.div
                    className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-300"
                    whileHover={{ rotate: 10 }}
                  >
                    <info.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      {info.title}
                    </h3>
                    {info.lines.map((line, i) => (
                      <p key={i} className="text-muted-foreground">
                        {line}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="bg-card rounded-3xl border border-border p-8 shadow-xl"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="font-display font-semibold text-2xl mb-8">Send us a Message</h3>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  >
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                      placeholder="John"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.45 }}
                  >
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                      placeholder="Doe"
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                    placeholder="john@example.com"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.55 }}
                >
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                  >
                    <option>General Inquiry</option>
                    <option>Tour Booking</option>
                    <option>Custom Package</option>
                    <option>Partnership</option>
                    <option>Other</option>
                  </select>
                  {subject === "Other" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                      className="overflow-hidden"
                    >
                      <label className="block text-sm font-medium mb-2">Custom Subject</label>
                      <input
                        type="text"
                        required={subject === "Other"}
                        value={customSubject}
                        onChange={(e) => setCustomSubject(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                        placeholder="Please specify your subject"
                      />
                    </motion.div>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                >
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 resize-none"
                    placeholder="Tell us about your travel plans..."
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-ocean-light hover:shadow-lg hover:shadow-primary/30 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.65 }}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  {!isSubmitting && <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Google Map Section */}
      {contactDetails?.googleMap && (
        <section className="h-[400px] w-full bg-accent/30 relative">
          <iframe
            src={contactDetails.googleMap}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-500"
          ></iframe>
        </section>
      )}
    </Layout>
  );
};

export default Contact;
