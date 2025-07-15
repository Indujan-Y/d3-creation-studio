"use client";

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function HomeHero() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = window.innerHeight * 0.1;
      setIsScrolled(window.scrollY > scrollThreshold);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -450]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const y5 = useTransform(scrollYProgress, [0, 1], [0, -380]);
  const y6 = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const y7 = useTransform(scrollYProgress, [0, 1], [0, -350]);
  const y8 = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const logoY = useTransform(scrollYProgress, [0, 1], [0, 500]);
  const logoScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

  const springSettings = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const springY1 = useSpring(y1, springSettings);
  const springY2 = useSpring(y2, springSettings);
  const springY3 = useSpring(y3, springSettings);
  const springY4 = useSpring(y4, springSettings);
  const springY5 = useSpring(y5, springSettings);
  const springY6 = useSpring(y6, springSettings);
  const springY7 = useSpring(y7, springSettings);
  const springY8 = useSpring(y8, springSettings);
  const springLogoY = useSpring(logoY, { ...springSettings, stiffness: 150, damping: 50 });

  const images = [
    { style: { y: springY1 }, className: "floating-1", src: "https://placehold.co/200x280.png", alt: "Photography 1", aiHint: "camera lens" },
    { style: { y: springY2 }, className: "floating-2", src: "https://placehold.co/180x240.png", alt: "Videography 1", aiHint: "video camera" },
    { style: { y: springY3 }, className: "floating-3", src: "https://placehold.co/160x200.png", alt: "Camera Equipment", aiHint: "camera equipment" },
    { style: { y: springY4 }, className: "floating-4", src: "https://placehold.co/220x260.png", alt: "Studio Setup", aiHint: "photo studio" },
    { style: { y: springY5 }, className: "floating-5", src: "https://placehold.co/190x240.png", alt: "Photography Session", aiHint: "portrait session" },
    { style: { y: springY6 }, className: "floating-6", src: "https://placehold.co/200x250.png", alt: "Video Production", aiHint: "video production" },
    { style: { y: springY7 }, className: "floating-7", src: "https://placehold.co/140x180.png", alt: "Lighting Equipment", aiHint: "studio lighting" },
    { style: { y: springY8 }, className: "floating-8", src: "https://placehold.co/210x260.png", alt: "Creative Portrait", aiHint: "creative portrait" },
  ];

  return (
    <div ref={containerRef} className="home-hero-section">
      {images.map((img, index) => (
        <motion.div
          key={index}
          className={`floating-image ${img.className}`}
          style={img.style}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 * (index + 1) }}
        >
          <motion.div style={img.style}>
            <Image
              src={img.src}
              alt={img.alt}
              width={parseInt(img.src.split('/')[3].split('x')[0])}
              height={parseInt(img.src.split('/')[3].split('x')[1].split('.')[0])}
              data-ai-hint={img.aiHint}
            />
          </motion.div>
        </motion.div>
      ))}

      <motion.div
        className="hero-content"
        style={{ scale: logoScale, y: springLogoY }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <div className="logo-container">
          <div className="logo-placeholder">
            <h1 className="font-headline">d3 creation studio</h1>
          </div>
        </div>

        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <h2 className="font-headline">Crafting Timeless Visual Stories</h2>
          <p className="font-body">Professional Photography & Videography</p>
        </motion.div>
      </motion.div>

      <motion.div
        className={cn("scroll-indicator", isScrolled && "opacity-0 pointer-events-none")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <div className="scroll-arrow"></div>
      </motion.div>
    </div>
  );
}
