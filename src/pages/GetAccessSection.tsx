"use client";

import React from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';

const GetAccessSection = () => {
  return (
    <section className="relative flex justify-center items-center min-h-[25rem] sm:min-h-[28rem] md:min-h-[30rem] bg-black text-white px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex flex-col gap-4 sm:gap-6 w-full max-w-2xl text-center z-30"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold"
        >
          Get Beta Access
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-gray-400 text-sm sm:text-base max-w-lg mx-auto"
        >
          Already helping 5,000+ users save 1000+ hours of watching time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-2 w-full justify-center"
        >
          <Input
            placeholder="name@email.com"
            className="p-2 bg-white/20 text-white/70 w-full sm:w-2/3 border-none outline-none focus:ring-0 focus:outline-none rounded-lg text-sm sm:text-base"
          />
          <Button className="bg-white text-black hover:bg-gray-300 rounded-lg cursor-pointer w-full sm:w-auto">
            Get Access
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ scale: 0.8, rotate: -10, opacity: 0 }}
        whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="absolute hidden md:block md:w-40 md:top-[50px] md:left-[40px] lg:w-70 lg:top-[-50px] lg:left-[100px] z-10 animate-wiggleScale"
      >
        <Image src="/assets/emojistar.png" alt="" width={300} height={300} />
      </motion.div>


      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
        className="absolute hidden md:block md:w-40 md:top-[200px] md:right-[20px] lg:w-70 lg:top-[100px] lg:right-[90px] z-10"
      >
        <Image src="/assets/helix.png" alt="" width={300} height={300} />
      </motion.div>

    </section>
  );
};

export default GetAccessSection;
