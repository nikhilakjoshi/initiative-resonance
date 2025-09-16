export function VoiceAgentSection() {
  return (
    <section
      className="w-full bg-gray-50 hidden md:block"
      style={{ height: "50vh" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-center justify-center">
        <div className="text-center">
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
              {/* Voice Agent Icon Placeholder */}
              <div className="w-12 h-12 bg-primary/20 rounded-full animate-pulse"></div>
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
            Ask About Resonance Initiative
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Have questions about our mission, approach, or how we can help? Our
            voice agent is here to provide instant answers and guidance.
          </p>
          <div
            id="voice-agent-container"
            className="w-full h-32 bg-white rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center"
            data-purpose="chatgpt-style-voice-agent-integration"
          >
            <p className="text-gray-500 text-sm">
              Voice agent integration will be placed here
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
