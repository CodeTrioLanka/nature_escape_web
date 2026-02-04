import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface Props {
    children: React.ReactNode;
    speed?: number; // 1 = normal scroll, 0.5 = half speed (slower), 1.5 = faster
    className?: string;
}

const GSAPParallaxContainer = ({ children, speed = 0.8, className = "" }: Props) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!contentRef.current || !containerRef.current) return;

        // Calculate movement distance
        // If speed is 0.8, we want it to lag behind by 20% of the viewport or section height?
        // A simple generic shift is usually sufficient for visual impact.
        // We'll map the scroll progress (top-bottom to bottom-top) to a y-translation.

        const yOffset = 100 * (1 - speed); // E.g. speed 0.8 -> 20px shift. Speed 0.5 -> 50px shift.

        gsap.fromTo(contentRef.current,
            { y: 0 },
            {
                y: yOffset,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                }
            }
        );

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className={`relative ${className}`}>
            <div ref={contentRef} className="will-change-transform">
                {children}
            </div>
        </div>
    );
};

export default GSAPParallaxContainer;
