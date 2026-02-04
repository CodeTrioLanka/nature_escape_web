import { useEffect, useRef } from "react";
import { useInView, motion, animate } from "framer-motion";

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

const AnimatedCounter = ({
  end,
  duration = 2,
  suffix = "",
  prefix = "",
  className = ""
}: AnimatedCounterProps) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, end, {
        duration,
        ease: "easeOut",
        onUpdate: (value) => {
          if (textRef.current) {
            textRef.current.textContent = Math.floor(value).toLocaleString();
          }
        },
      });

      return () => controls.stop();
    }
  }, [isInView, end, duration]);

  return (
    <motion.span
      ref={containerRef}
      className={`inline-flex items-center justify-center ${className}`}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.5, type: "spring" }}
    >
      {prefix}<span ref={textRef}>0</span>{suffix}
    </motion.span>
  );
};

export default AnimatedCounter;