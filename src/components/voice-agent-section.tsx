"use client";
import { AudioSVGVisualizer } from "./audio-svg-visualizer";
import { Headset, PhoneOff } from "lucide-react";
import { useConversation } from "@elevenlabs/react";
import { useState } from "react";

export function VoiceAgentSection() {
  const [isConversationActive, setIsConversationActive] = useState(false);

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
    },
  });

  const handleToggleConversation = async () => {
    if (isConversationActive) {
      // End the conversation
      await conversation.endSession();
    } else {
      // Start the conversation
      await conversation.startSession({
        agentId:
          process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID ||
          "agent_9301k5588t12fe8t1ta5p5nhtxee", // You'll need to set this
        connectionType: "websocket",
      });
    }
  };

  return (
    <section
      className="w-full bg-gray-50 hidden md:block"
      style={{ height: "50vh" }}
    >
      <div className="h-full flex flex-col items-center justify-center">
        {/* Full-width Audio Visualizer with navbar-matching padding */}
        <div className="w-full px-6 lg:px-8 mb-6">
          <div className="relative">
            <AudioSVGVisualizer className="h-60" />
            {/* Voice Agent Button - Absolutely positioned in center */}
            <button
              onClick={handleToggleConversation}
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                ${
                  isConversationActive
                    ? "bg-red-500 hover:bg-red-600 border-red-600 hover:border-red-700"
                    : "bg-white/90 hover:bg-white border-gray-300 hover:border-gray-400"
                } 
                rounded-full p-4 transition-all duration-200 hover:scale-105`}
            >
              {isConversationActive ? (
                <PhoneOff className="w-6 h-6 text-white" />
              ) : (
                <Headset className="w-6 h-6 text-gray-700 ml-0.5" />
              )}
            </button>
          </div>
        </div>

        {/* Centered text content */}
        <div className="text-center max-w-4xl px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
            {isConversationActive
              ? "Voice Agent Active"
              : "Ask About Resonance Initiative"}
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            {isConversationActive
              ? "You're now connected to our voice agent. Speak naturally to ask questions about our mission, approach, or how we can help."
              : "Have questions about our mission, approach, or how we can help? Click the headset to start a conversation with our voice agent."}
          </p>
        </div>
      </div>
    </section>
  );
}
