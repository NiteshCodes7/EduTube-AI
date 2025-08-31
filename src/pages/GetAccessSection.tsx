import React from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const GetAccessSection = () => {
  return (
    <section className="relative flex justify-center items-center min-h-[25rem] sm:min-h-[28rem] md:min-h-[30rem] bg-black text-white px-4 sm:px-6">
      <div className="flex flex-col gap-4 sm:gap-6 w-full max-w-2xl text-center z-30">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          Get Beta Access
        </h2>

        <p className="text-gray-400 text-sm sm:text-base max-w-lg mx-auto">
          Already helping 5,000+ users save 1000+ hours of watching time.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 w-full justify-center">
          <Input
            placeholder="name@email.com"
            className="p-2 bg-white/20 text-white/70 w-full sm:w-2/3 border-none outline-none focus:ring-0 focus:outline-none rounded-lg text-sm sm:text-base"
          />
          <Button className="bg-white text-black hover:bg-gray-300 rounded-lg cursor-pointer w-full sm:w-auto">
            Get Access
          </Button>
        </div>
      </div>

      <Image
        src="/assets/emojistar.png"
        alt=""
        width={100}
        height={100}
        className="absolute hidden md:block md:w-40 md:top-[50px] md:left-[40px] lg:w-70 lg:top-[-50px] lg:left-[100px] animate-wiggleScale z-10"
      />
      <Image
        src="/assets/helix.png"
        alt=""
        width={100}
        height={100}
        className="absolute hidden md:block md:w-40 md:top-[200px] md:right-[20px] lg:w-70 lg:top-[100px] lg:right-[90px] animate-spin [animation-duration:5s] z-10"
      />
    </section>
  );
};

export default GetAccessSection;
