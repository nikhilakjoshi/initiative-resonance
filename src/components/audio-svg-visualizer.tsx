"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import AudioSVG from "../../public/audio.svg";

interface AudioSVGVisualizerProps {
  className?: string;
}

export function AudioSVGVisualizer({
  className = "",
}: AudioSVGVisualizerProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Get the SVG element directly
    const svgElement = svgRef.current;

    // Find all the 'g' elements (groups) that represent the audio bars
    const audioGroups = svgElement.querySelectorAll(
      'g[style*="display: block"], g[style*="display: none"]'
    );

    // Create animations for visible groups
    audioGroups.forEach((group) => {
      // Make all groups visible first
      (group as HTMLElement).style.display = "block";

      // Random initial delay for each bar
      const initialDelay = Math.random() * 2;

      // Create continuous random animations
      const animateGroup = () => {
        const duration = 0.3 + Math.random() * 0.7; // Random duration between 0.3s and 1s
        const opacity = 0.2 + Math.random() * 0.8; // Random opacity between 0.2 and 1
        const delay = Math.random() * 1.5; // Random delay up to 1.5s

        gsap.to(group, {
          opacity,
          duration,
          delay,
          ease: "power2.inOut",
          onComplete: animateGroup, // Loop the animation
        });
      };

      // Set initial state and start animation
      gsap.set(group, { opacity: 0.3 });
      gsap.delayedCall(initialDelay, animateGroup);
    });

    // Cleanup function
    return () => {
      gsap.killTweensOf(audioGroups);
    };
  }, []);

  return (
    <div className={className}>
      <AudioSVG ref={svgRef} className={`filter brightness-90`} />
    </div>
  );
}
