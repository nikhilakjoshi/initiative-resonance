import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { VoiceAgentSection } from "@/components/voice-agent-section";
import { FeatureCardsSection } from "@/components/feature-cards-section";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <VoiceAgentSection />
      <FeatureCardsSection />
    </div>
  );
}
