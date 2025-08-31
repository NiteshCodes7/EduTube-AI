import React from "react";
import { Brain, Share, Database } from "lucide-react";
import InterfaceSection from "./InterfaceSection";

const GridSection = () => {
  const features = [
    {
      id: 1,
      title: "AI-Powered Summaries",
      description: "Get concise summaries, mind maps, and key insights in seconds.",
      icon: Brain,
    },
    {
      id: 2,
      title: "Export & Share",
      description: "Download summaries as PDF, or visualise mind map.",
      icon: Share,
    },
    {
      id: 3,
      title: "Secure data encryption",
      description: "With end-to-end encryption, your data is securely stored.",
      icon: Database,
    },
  ];

  return (
    <section
      id="features"
      className="flex flex-col h-auto justify-center items-center py-16 sm:py-20 px-4 sm:px-6"
      style={{
          background: "linear-gradient(to bottom, #000000 0%, #000000 30%, #5D2CA8 100%)"
      }}
    >
      <div className="flex flex-col items-center text-white max-w-2xl text-center mb-12 sm:mb-20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 font-dmSans">
          Everything you need
        </h2>
        <p className="text-base sm:text-lg md:text-xl font-inter">
          Enjoy customizable lists, team work tools, and smart tracking all in
          one place. Set tasks, get reminders, and see your progress simply and
          quickly.
        </p>
      </div>

      <div className="max-w-7xl w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="bg-black bg-opacity-80 rounded-2xl p-6 sm:p-10 text-center backdrop-blur-md border border-white border-opacity-10 transition-all hover:shadow-lg hover:shadow-purple-500"
              >
                {/* Icon */}
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white bg-opacity-10 rounded-xl mx-auto mb-4 sm:mb-6 flex items-center justify-center border border-white">
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
                </div>

                {/* Content */}
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <InterfaceSection />
      </div>
    </section>
  );
};

export default GridSection;
