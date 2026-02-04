import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface PageHeroProps {
    title?: string;
    subtitle?: string;
    backgroundImage?: string;
    height?: string;
    children?: ReactNode;
    showWave?: boolean;
}

const PageHero = ({
    title,
    subtitle,
    backgroundImage,
    height = "h-[70vh] min-h-[500px]",
    children,
    showWave = true
}: PageHeroProps) => {
    const isVideo = backgroundImage.match(/\.(mp4|webm|ogg|mov)$|^https?:\/\/.*video.*$/i);
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const isVideo = backgroundImage ? backgroundImage.match(/\.(mp4|webm|ogg|mov)$|^https:\/\/res\.cloudinary\.com\/.*\/video\/upload\//i) : null;

    return (
        <section
            ref={ref}
            className={`relative ${height} flex items-center justify-center overflow-hidden -mt-20`}
        >
            {/* Background Image/Video with Parallax Effect */}
            <motion.div
                className="absolute inset-0 overflow-hidden"
                style={{
                    y: backgroundY,
                    scale: backgroundScale,
                }}
            >
                {isVideo ? (
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                    >
                        <source
                            src={backgroundImage}
                            type={backgroundImage.toLowerCase().endsWith('.mov') ? 'video/quicktime' : `video/${backgroundImage.split('.').pop()}`}
                        />
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
                            backgroundColor: !backgroundImage ? '#1a1a1a' : undefined // Fallback color
                        }}
                    />
                )}
                <div className="absolute inset-0 bg-black/20" />
            </motion.div>

            {/* Content - Centered Layout */}
            <motion.div
                className="container mx-auto px-4 relative z-10 text-center"
                style={{ y: textY, opacity }}
            >
                <div className="max-w-4xl mx-auto flex flex-col items-center">
                    {/* Title */}
                    {title && (
                        <motion.h1
                            className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-primary-foreground leading-tight mb-6"
                            style={{ textShadow: "0 4px 20px rgba(0,0,0,0.7)" }}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            {title}
                        </motion.h1>
                    )}

                    {/* Subtitle */}
                    {subtitle && (
                        <motion.p
                            className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mb-10 leading-relaxed"
                            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            {subtitle}
                        </motion.p>
                    )}

                    {/* Custom Children Content */}
                    {children && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            {children}
                        </motion.div>
                    )}
                </div>
            </motion.div>

            {/* Wavy Bottom Edge - SVG */}
            {showWave && (
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
                    <svg
                        className="relative block w-full h-[60px] md:h-[100px]"
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z"
                            fill="white"
                            className="drop-shadow-lg"
                        />
                    </svg>
                </div>
            )}
        </section>
    );
};

export default PageHero;
