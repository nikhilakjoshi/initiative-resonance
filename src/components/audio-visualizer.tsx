"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface AudioVisualizerProps {
  className?: string;
}

export function AudioVisualizer({ className = "" }: AudioVisualizerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const bars = containerRef.current.querySelectorAll(".audio-bar");

    // Create timeline for each bar with random animations
    bars.forEach((bar) => {
      // Random initial delay for each bar
      const initialDelay = Math.random() * 2;

      // Create a series of random opacity changes
      const createRandomAnimation = () => {
        const duration = 0.3 + Math.random() * 0.7; // Random duration between 0.3s and 1s
        const opacity = 0.2 + Math.random() * 0.8; // Random opacity between 0.2 and 1
        const delay = Math.random() * 1.5; // Random delay up to 1.5s

        return { opacity, duration, delay };
      };

      // Set initial state
      gsap.set(bar, { opacity: 0.3 });

      // Create continuous random animations
      const animateBar = () => {
        const { opacity, duration, delay } = createRandomAnimation();

        gsap.to(bar, {
          opacity,
          duration,
          delay,
          ease: "power2.inOut",
          onComplete: animateBar, // Loop the animation
        });
      };

      // Start animation with initial delay
      gsap.delayedCall(initialDelay, animateBar);
    });

    // Cleanup function
    return () => {
      gsap.killTweensOf(bars);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`flex items-end justify-center space-x-1 ${className}`}
    >
      {/* Create 12 bars with different heights */}
      {[...Array(12)].map((_, index) => {
        const heights = [8, 12, 6, 16, 10, 14, 8, 18, 12, 10, 6, 14];
        const colors = [
          "bg-blue-400",
          "bg-purple-400",
          "bg-green-400",
          "bg-yellow-400",
          "bg-pink-400",
          "bg-indigo-400",
          "bg-teal-400",
          "bg-orange-400",
        ];

        return (
          <div
            key={index}
            className={`audio-bar w-1.5 rounded-sm ${
              colors[index % colors.length]
            } opacity-30`}
            style={{ height: `${heights[index]}px` }}
          />
        );
      })}
    </div>
  );
}
