"use client";

import { WavyBackground } from "@/components/ui/wavy-background";
import { AudioSVGVisualizer } from "@/components/audio-svg-visualizer";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface AnimatedTextProps {
  children: string;
  className?: string;
}

function AnimatedText({ children, className = "" }: AnimatedTextProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const words = children.split(" ");
    textRef.current.innerHTML = "";

    // Create word containers with overflow hidden
    words.forEach((word, wordIndex) => {
      const wordContainer = document.createElement("div");
      wordContainer.style.cssText =
        "display: inline-block; overflow: hidden; margin-right: 0.25em;";

      // Create character spans for each word
      word.split("").forEach((char, charIndex) => {
        const charSpan = document.createElement("span");
        charSpan.textContent = char;
        charSpan.style.cssText =
          "display: inline-block; transform: translateY(100%);";
        charSpan.className = `char-${wordIndex}-${charIndex}`;
        wordContainer.appendChild(charSpan);
      });

      if (textRef.current) {
        textRef.current.appendChild(wordContainer);
      }
    });

    // GSAP stagger animation
    const chars = textRef.current.querySelectorAll("[class*='char-']");

    gsap.fromTo(
      chars,
      {
        y: "100%",
      },
      {
        y: "0%",
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.05,
        delay: 0.5,
      }
    );
  }, [children]);

  return <div ref={textRef} className={className} />;
}

export function HeroSection() {
  return (
    <section className="relative md:h-screen w-full overflow-hidden">
      {/* Wavy background - only visible on tablet and larger screens */}
      <div className="hidden md:block">
        <WavyBackground
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left"
          colors={[
            "#f1f5f9", // slate-100 - very light gray
            "#e2e8f0", // slate-200 - light gray
            "#cbd5e1", // slate-300 - medium light gray
            "#94a3b8", // slate-400 - medium gray
            "#64748b", // slate-500 - balanced gray
          ]}
          waveWidth={30}
          backgroundFill="rgb(249, 250, 251)"
          blur={10}
          speed="slow"
          waveOpacity={0.4}
        >
          <AnimatedText className="text-4xl xl:text-7xl sm:text-4xl md:text-5xl lg:text-6xl md:font-bold text-gray-900 leading-20 mb-4 sm:mb-6">
            Building a more equitable, compassionate world through technology
          </AnimatedText>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed mb-6 sm:mb-8 max-w-full sm:max-w-2xl lg:max-w-3xl">
            We envision a world where everyone has the same access to quality
            education, where emotional wellbeing support adapts to cultural
            contexts and technology serves humanity&apos;s most fundamental
            needs
          </p>

          {/* Audio Visualization - Full Width */}
        </WavyBackground>
      </div>

      {/* Simple background for mobile - no wavy background */}
      <div className="md:hidden bg-gray-50 h-full flex flex-col">
        {/* Hero content at top */}
        <div className="pt-28 px-6">
          <AnimatedText className="text-3xl font-bold text-gray-900 leading-tight mb-4">
            Building a more equitable, compassionate world through technology
          </AnimatedText>
          <p className="text-base text-gray-600 leading-relaxed mb-8">
            We envision a world where everyone has the same access to quality
            education, where emotional wellbeing support adapts to cultural
            contexts and technology serves humanity&apos;s most fundamental
            needs
          </p>
        </div>

        {/* Voice Agent Section - moved up to be within first 100vh */}
        {/* Mobile Audio Visualizer - Full width with no padding */}
        {/* <div className="flex-1 pb-8 flex flex-col justify-center">
          <div className="w-full mb-6">
            <div className="relative">
              <AudioSVGVisualizer className="w-full h-24" />
              <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-2 border-gray-300 hover:border-gray-400 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-105">
                <svg
                  className="w-5 h-5 text-gray-700 ml-0.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="text-center px-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Ask About Resonance Initiative
            </h2>
            <p className="text-base text-gray-600 mb-6">
              Have questions about our mission, approach, or how we can help?
              Our voice agent is here to provide instant answers and guidance.
            </p>
          </div>
        </div> */}
      </div>
    </section>
  );
}
