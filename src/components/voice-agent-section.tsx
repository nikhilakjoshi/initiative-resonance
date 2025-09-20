"use client";
import { AudioSVGVisualizer } from "./audio-svg-visualizer";
import { Headset, PhoneOff } from "lucide-react";
import { useConversation } from "@elevenlabs/react";
import { useState, useEffect } from "react";

export function VoiceAgentSection() {
  const [isConversationActive, setIsConversationActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect if user is on mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 && "ontouchstart" in window);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const conversation = useConversation({
    onConnect: () => {
      console.log("Connected to voice agent");
      setIsConversationActive(true);
    },
    onDisconnect: () => {
      console.log("Disconnected from voice agent");
      setIsConversationActive(false);
    },
    onError: (error) => {
      console.error("Voice agent error:", error);
      setIsConversationActive(false);

      // Show user-friendly error message on mobile
      if (isMobile) {
        alert(
          "Unable to connect to voice agent. Please ensure microphone permissions are enabled and try again."
        );
      }
    },
  });

  const handleToggleConversation = async () => {
    try {
      if (isConversationActive) {
        // End the conversation
        await conversation.endSession();
      } else {
        // On mobile, check for microphone permission before starting
        if (
          isMobile &&
          navigator.mediaDevices &&
          navigator.mediaDevices.getUserMedia
        ) {
          try {
            // Request microphone access first
            const stream = await navigator.mediaDevices.getUserMedia({
              audio: true,
            });
            // Stop the test stream immediately
            stream.getTracks().forEach((track) => track.stop());
          } catch {
            alert(
              "Microphone access is required for voice chat. Please enable microphone permissions in your browser settings and try again."
            );
            return;
          }
        }

        // Start the conversation
        await conversation.startSession({
          agentId:
            process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID ||
            "agent_9301k5588t12fe8t1ta5p5nhtxee", // You'll need to set this
          connectionType: "websocket",
        });
      }
    } catch (error) {
      console.error("Error toggling conversation:", error);
      if (isMobile) {
        alert(
          "Failed to start voice chat. Please check your internet connection and microphone permissions."
        );
      }
    }
  };

  return (
    <section className="w-full bg-gray-50" style={{ minHeight: "40vh" }}>
      <div className="h-full flex flex-col items-center justify-center py-8 md:py-0">
        {/* Full-width Audio Visualizer with navbar-matching padding */}
        <div className="w-full px-6 lg:px-8 mb-6">
          <div className="relative">
            <AudioSVGVisualizer className="h-40 md:h-60" />
            {/* Voice Agent Button - Absolutely positioned in center */}
            <button
              onClick={handleToggleConversation}
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                ${
                  isConversationActive
                    ? "bg-red-500 hover:bg-red-600 border-red-600 hover:border-red-700"
                    : "bg-white/90 hover:bg-white border-gray-300 hover:border-gray-400"
                } 
                rounded-full p-3 md:p-4 transition-all duration-200 hover:scale-105 touch-manipulation`}
              aria-label={
                isConversationActive
                  ? "End voice conversation"
                  : "Start voice conversation"
              }
            >
              {isConversationActive ? (
                <PhoneOff className="w-5 h-5 md:w-6 md:h-6 text-white" />
              ) : (
                <Headset className="w-5 h-5 md:w-6 md:h-6 text-gray-700 ml-0.5" />
              )}
            </button>
          </div>
        </div>

        {/* Centered text content */}
        <div className="text-center max-w-4xl px-6 lg:px-8">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 mb-3 md:mb-4">
            {isConversationActive
              ? "Voice Agent Active"
              : "Ask About Resonance Initiative"}
          </h2>
          <p className="text-base md:text-lg text-gray-600 mb-4 md:mb-6 max-w-2xl mx-auto">
            {isConversationActive
              ? "You're now connected to our voice agent. Speak naturally to ask questions about our mission, approach, or how we can help."
              : "Have questions about our mission, approach, or how we can help? Tap the headset to start a conversation with our voice agent."}
          </p>
          {!isConversationActive && (
            <p className="text-sm text-gray-500 max-w-xl mx-auto">
              Note: This feature requires microphone access. Please allow
              microphone permissions when prompted.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
