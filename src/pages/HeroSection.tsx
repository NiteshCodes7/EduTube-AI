"use client";

import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full h-full bg-white overflow-auto"
              style={{
                backgroundImage: "url('/assets/Hero.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}>

      <div className="relative container mx-auto flex flex-col items-center text-center px-4 py-20">

        {/* Headline */}
        <motion.div className="w-full text-center z-50">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relatiive text-[55px] md:text-[75px] lg:text-[117px] font-bold text-white tracking-tighter leading-tight "
          >
            <div>Summarize YouTube Videos</div> 
            <div>in Seconds</div>
          </motion.h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute hidden md:block md:top-47 md:left-20 md:w-28 md:h-28 lg:top-50 lg:left-73 lg:w-48 lg:h-48 z-50"
        >
          <Image src="/assets/cursor2.png" alt="" fill className="object-contain" />
        </motion.div>


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute hidden md:block md:top-49 md:left-22 md:w-28 md:h-28 lg:top-54 lg:left-75 lg:w-48 lg:h-48 z-0"
        >
          <Image src="/assets/cursor1.png" alt="" fill className="object-contain" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute hidden md:block md:top-50 md:right-20 md:w-28 md:h-28 lg:top-50 lg:left-258 lg:w-48 lg:h-48 z-50"
        >
          <Image src="/assets/message1.png" alt="" width={200} height={200} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute hidden md:block md:top-52 md:right-22 md:w-28 md:h-28 lg:top-52 lg:left-253 lg:w-48 lg:h-48 z-0"
        >
          <Image src="/assets/message2.png" alt="" width={200} height={200} />
        </motion.div>


        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mt-12 md:mt-9 text-lg text-white max-w-2xl"
        >
          Paste a YouTube link and let EduTube AI turn hours of content into minutes of insights with summaries, transcripts, and exports.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-8 flex flex-col sm:flex-row gap-4"
        >
          <Button size="lg" variant={"outline"} className="rounded-sm px-6 cursor-pointer">
            Try Free Now
          </Button>
        </motion.div>

      </div>
    </section>
  );
}
