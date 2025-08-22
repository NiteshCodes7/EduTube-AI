"use client";

import Image from 'next/image'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'

const Navbar = () => {
  const openDialog = () => {

  }

  return (
    <section className='bg-gradient-to-b from-black/90 via-black/70 to-transparent fixed w-full h-[150px] z-50 p-2'>
      <div className='flex justify-between items-center px-4'>
        {/* Logo Section */}
        <div className="flex items-center">
          {/* Desktop Logo */}
          <Image
            src="/assets/EdutubeLogoDekstop.png"
            alt="EduTube Desktop Logo"
            width={120}
            height={120}
            className="hidden md:block"
          />

          {/* Mobile Logo */}
          <div className="relative w-10 h-10 md:hidden">
            <Image
              src="/assets/EdutubeLogoMobile.png"
              alt="EduTube Mobile Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Button Section */}
        <div>
          <Button
            size="sm"
            variant="outline"
            className="hidden md:block cursor-pointer"
          >
            Try for Free
          </Button>
        </div>

        <div className='md:hidden'>
          <Menu className='text-white' onClick={openDialog}/>
        </div>
      </div>
    </section>
  )
}

export default Navbar
