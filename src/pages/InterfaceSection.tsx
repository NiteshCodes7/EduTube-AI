import React from 'react';
import Image from 'next/image';

const InterfaceSection = () => {
  return (
    <div className="w-full flex flex-col items-center text-white text-center mt-30">
      {/* Headline */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 font-dmSans px-4">
        Intuitive Interface
      </h2>

      {/* Paragraph */}
      <p className="max-w-lg text-base sm:text-sm md:text-lg font-inter mb-8 px-4">
        Celebrate the joy of accomplishment with an app designed to track your progress, 
        motivate your efforts, and celebrate your successes, one task at a time.
      </p>

      {/* Image */}
        <Image
          src="/assets/AppSS.png"
          alt="preview"
          width={1000}
          height={600}
          priority
          quality={100}
          className="w-[80%] md:w-[900px] h-auto rounded-lg shadow-none drop-shadow-[0_0_10px_rgba(0,0,0,0.6)]"
        />

    </div>
  );
};

export default InterfaceSection;
