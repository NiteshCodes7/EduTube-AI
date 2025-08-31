"use client";

import { faqList } from "@/lib/faq";
import { Minus, Plus } from "lucide-react";
import React, { useState } from "react";

const FaqSection = () => {
  const [id, setId] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="flex justify-center items-center h-auto py-12 sm:py-16 px-4 sm:px-6 text-white"
      style={{
        background:
          "linear-gradient(to bottom, #5D2CA8 0%, #5D2CA8 10%, #000000 100%)",
      }}
    >
      <div className="w-full max-w-5xl mx-auto">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 sm:mb-16">
          Frequently Asked Questions
        </h2>

        {/* FAQ List */}
        <div className="space-y-4 sm:space-y-6 md:mb-5 lg:mb-30">
          {faqList.map((faq, idx) => {
            const check = id === idx;
            return (
              <div
                key={idx}
                onClick={() => (id === idx ? setId(null) : setId(idx))}
                className="border-b border-gray-500 pb-3 sm:pb-4 cursor-pointer"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold">
                    {faq.question}
                  </h3>
                  <span className="flex-shrink-0 ml-2">
                    {check ? (
                      <Minus className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                    ) : (
                      <Plus className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                    )}
                  </span>
                </div>

                {check && (
                  <p className="text-gray-400 text-sm sm:text-base py-2 mt-2 leading-relaxed">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
