"use client";
import React from "react";
import Image from "next/image";
import { motion } from "motion/react";

const InterfaceSection = () => {
  return (
    <div className="w-full flex flex-col items-center text-white text-center mt-30">
      {/* Headline */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 font-dmSans px-4"
      >
        Intuitive Interface
      </motion.h2>

      {/* Paragraph */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
        className="max-w-lg text-base sm:text-sm md:text-lg font-inter mb-8 px-4"
      >
        Celebrate the joy of accomplishment with an app designed to track your
        progress, motivate your efforts, and celebrate your successes, one task
        at a time.
      </motion.p>

      {/* Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.4 }}
        viewport={{ once: true }}
        className="w-[80%] md:w-[900px] h-auto rounded-lg shadow-none drop-shadow-[0_0_10px_rgba(0,0,0,0.6)]"
      >
        <Image
          src="/assets/AppSS.png"
          alt="preview"
          width={1000}
          height={600}
          priority
          quality={100}
          className="rounded-lg"
        />
      </motion.div>
    </div>
  );
};

export default InterfaceSection;
