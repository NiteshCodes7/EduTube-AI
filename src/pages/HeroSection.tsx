"use client";

import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      className="relative w-full h-screen bg-white z-40"
      style={{
        backgroundImage: "url('/assets/Hero.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      <div className="relative container mx-auto flex flex-col items-center text-center px-4 py-20 h-full justify-center">
        {/* Headline */}
        <motion.div className="w-full text-center z-50">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white tracking-tight leading-tight"
          >
            <div>Summarize YouTube Videos</div>

            {/* Make "in Seconds" the relative container */}
            <div className="relative inline-block">
              in Seconds

              {/* Floating Images */}
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute hidden sm:block sm:w-[90px] sm:top-[2px] sm:left-[-110px] w-[80px] md:w-[120px] md:top-[-60px] md:left-[-145px] lg:w-[160px] lg:top-[-10px] lg:left-[-170px] z-50"
              >
                <Image
                  src="/assets/cursor2.png"
                  alt="Cursor"
                  width={200}
                  height={200}
                  className="object-contain"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 1 }}
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute hidden sm:block sm:w-[90px] sm:top-[4px] sm:left-[-100px] w-[80px] md:w-[120px] md:top-[-65px] md:left-[-135px] lg:w-[160px] lg:top-[5px] lg:left-[-155px] z-40"
              >
                <Image
                  src="/assets/cursor1.png"
                  alt="Cursor"
                  width={200}
                  height={200}
                  className="object-contain"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 1 }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute hidden sm:block w-[100px] sm:w-[90px] sm:top-[2px] sm:right-[-120px] md:w-[120px] md:top-[-60px] md:right-[-145px] lg:w-[160px] lg:top-[-10px] lg:right-[-185px] z-50"
              >
                <Image
                  src="/assets/message1.png"
                  alt="Message"
                  width={200}
                  height={200}
                  className="object-contain"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 1 }}
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute hidden sm:block w-[100px] sm:w-[90px] sm:top-[4px] sm:right-[-110px] md:w-[120px] md:top-[-65px] md:right-[-130px] lg:w-[160px] lg:top-[-5px] lg:right-[-170px] z-40"
              >
                <Image
                  src="/assets/message2.png"
                  alt="Message"
                  width={200}
                  height={200}
                  className="object-contain"
                />
              </motion.div>
            </div>
          </motion.h1>
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mt-8 text-base sm:text-lg md:text-xl text-white max-w-2xl"
        >
          Paste a YouTube link and let EduTube turn hours of content into
          minutes of insights with summaries, transcripts, and exports.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-6 flex flex-col sm:flex-row gap-4"
        >
          <Button
            size="lg"
            variant="outline"
            className="rounded-sm px-6 cursor-pointer"
          >
            Try Free Now
          </Button>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-b from-[#b48cde]/0 to-black"></div>
    </section>
  );
}
