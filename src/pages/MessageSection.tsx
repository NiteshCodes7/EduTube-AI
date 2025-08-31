"use client";
import React from "react";
import { motion } from "motion/react";

const MessageSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex justify-center items-center bg-black py-3 sm:py-5"
    >
      <p className="text-lightGray text-center text-xs sm:text-sm md:text-base lg:text-lg">
        Trusted by students, creators, and professionals worldwide
      </p>
    </motion.div>
  );
};

export default MessageSection;
