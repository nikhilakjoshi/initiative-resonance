import { WavyBackground } from "@/components/ui/wavy-background";

export function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
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
          <h1 className="text-4xl xl:text-7xl sm:text-4xl md:text-5xl lg:text-6xl md:font-bold text-gray-900 leading-tight mb-4 sm:mb-6">
            Building a more equitable, compassionate world through technology
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed mb-6 sm:mb-8 max-w-full sm:max-w-2xl lg:max-w-3xl">
            We envision a world where everyone has the same access to quality
            education, where emotional wellbeing support adapts to cultural
            contexts and technology serves humanity&apos;s most fundamental
            needs
          </p>
        </WavyBackground>
      </div>

      {/* Simple background for mobile - no wavy background */}
      <div className="md:hidden bg-gray-50 h-full flex flex-col">
        {/* Hero content at top */}
        <div className="pt-28 px-6">
          <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-4">
            Building a more equitable, compassionate world through technology
          </h1>
          <p className="text-base text-gray-600 leading-relaxed mb-8">
            We envision a world where everyone has the same access to quality
            education, where emotional wellbeing support adapts to cultural
            contexts and technology serves humanity&apos;s most fundamental
            needs
          </p>
        </div>

        {/* Voice Agent Section - moved up to be within first 100vh */}
        <div className="flex-1 px-6 pb-8 flex flex-col justify-center">
          <div className="text-center">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                {/* Voice Agent Icon Placeholder */}
                <div className="w-10 h-10 bg-primary/20 rounded-full animate-pulse"></div>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Ask About Resonance Initiative
            </h2>
            <p className="text-base text-gray-600 mb-6">
              Have questions about our mission, approach, or how we can help?
              Our voice agent is here to provide instant answers and guidance.
            </p>
            <div
              id="voice-agent-container"
              className="w-full h-24 bg-white rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center"
              data-purpose="chatgpt-style-voice-agent-integration"
            >
              <p className="text-gray-500 text-sm">
                Voice agent integration will be placed here
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
