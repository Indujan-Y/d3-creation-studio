"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  aiHint: string;
}

export function HeroSection({ title, subtitle, imageUrl, aiHint }: HeroSectionProps) {
  return (
    <div className="relative h-[50vh] min-h-[350px] flex items-center justify-center text-center text-white overflow-hidden">
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover"
        priority
        data-ai-hint={aiHint}
      />
      <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
       <div className="site-gradient-orbs absolute inset-0">
        <motion.div
          className="site-gradient-orb site-gradient-orb-1 opacity-50"
          animate={{
            scale: [1, 1.2, 1, 1.1, 1],
            rotate: [0, 45, 90, 135, 0],
            x: ["0%", "20%", "0%", "-20%", "0%"],
            y: ["0%", "10%", "-10%", "5%", "0%"],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="site-gradient-orb site-gradient-orb-2 opacity-50"
          animate={{
            scale: [1, 1.1, 1, 1.3, 1],
            rotate: [0, -30, -60, -90, 0],
            x: ["0%", "-15%", "0%", "15%", "0%"],
            y: ["0%", "-5%", "10%", "-5%", "0%"],
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            delay: 5,
          }}
        />
      </div>
      <div className="relative z-10 p-4">
        <h1 className="text-4xl md:text-6xl font-bold font-headline text-shadow-lg animate-fade-in-down">{title}</h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto font-body text-shadow animate-fade-in-up">{subtitle}</p>
      </div>
    </div>
  );
}
