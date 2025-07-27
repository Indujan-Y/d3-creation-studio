
"use client";

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { getDatabase, ref, onValue } from 'firebase/database';
import { app } from '@/lib/firebase';

interface HeroImage {
    id: string;
    url: string;
}

export function HomeHero() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);

  useEffect(() => {
    const db = getDatabase(app);
    const heroRef = ref(db, 'hero');
    
    const unsubscribe = onValue(heroRef, (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            const imageList = Object.keys(data).map(key => ({
                id: key,
                url: data[key].url
            }));
            setHeroImages(imageList);
        }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleScroll = () => {
      const scrollThreshold = window.innerHeight * 0.1;
      setIsScrolled(window.scrollY > scrollThreshold);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
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
  const y9 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y10 = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const y11 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y12 = useTransform(scrollYProgress, [0, 1], [0, 320]);
  const y13 = useTransform(scrollYProgress, [0, 1], [0, -280]);
  const y14 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y15 = useTransform(scrollYProgress, [0, 1], [0, -300]);

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
  const springY9 = useSpring(y9, springSettings);
  const springY10 = useSpring(y10, springSettings);
  const springY11 = useSpring(y11, springSettings);
  const springY12 = useSpring(y12, springSettings);
  const springY13 = useSpring(y13, springSettings);
  const springY14 = useSpring(y14, springSettings);
  const springY15 = useSpring(y15, springSettings);
  const springLogoY = useSpring(logoY, { ...springSettings, stiffness: 100, damping: 30 });

  const images = [
    { style: { y: springY1 }, className: "floating-1", width: 200, height: 280, alt: "Photography 1", aiHint: "camera lens" },
    { style: { y: springY2 }, className: "floating-2", width: 180, height: 240, alt: "Videography 1", aiHint: "video camera" },
    { style: { y: springY3 }, className: "floating-3", width: 160, height: 200, alt: "Camera Equipment", aiHint: "camera equipment" },
    { style: { y: springY4 }, className: "floating-4", width: 220, height: 260, alt: "Studio Setup", aiHint: "photo studio" },
    { style: { y: springY5 }, className: "floating-5", width: 190, height: 240, alt: "Photography Session", aiHint: "portrait session" },
    { style: { y: springY6 }, className: "floating-6", width: 200, height: 250, alt: "Video Production", aiHint: "video production" },
    { style: { y: springY7 }, className: "floating-7", width: 140, height: 180, alt: "Lighting Equipment", aiHint: "studio lighting" },
    { style: { y: springY8 }, className: "floating-8", width: 210, height: 260, alt: "Creative Portrait", aiHint: "creative portrait" },
    { style: { y: springY9 }, className: "floating-9", width: 170, height: 220, alt: "Drone Shot", aiHint: "drone aerial" },
    { style: { y: springY10 }, className: "floating-10", width: 230, height: 270, alt: "Fashion Shoot", aiHint: "fashion model" },
    { style: { y: springY11 }, className: "floating-11", width: 150, height: 190, alt: "Product Photography", aiHint: "product shot" },
    { style: { y: springY12 }, className: "floating-12", width: 200, height: 240, alt: "Event Photography", aiHint: "event concert" },
    { style: { y: springY13 }, className: "floating-13", width: 180, height: 230, alt: "Nature Photography", aiHint: "nature forest" },
    { style: { y: springY14 }, className: "floating-14", width: 210, height: 250, alt: "Architectural Photo", aiHint: "modern architecture" },
    { style: { y: springY15 }, className: "floating-15", width: 160, height: 210, alt: "Food Photography", aiHint: "gourmet food" },
  ];

  const imageElements = images.map((img, index) => {
    const heroImage = heroImages[index % heroImages.length]; // Use modulo to safely repeat images if not enough
    if (!heroImage) return null;

    return (
        <motion.div
            key={index}
            className={`floating-image ${img.className}`}
            style={img.style}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.1 * (index + 1), ease: "easeOut" }}
        >
            <motion.div style={img.style}>
                <Image
                    src={heroImage.url}
                    alt={img.alt}
                    width={img.width}
                    height={img.height}
                    data-ai-hint={img.aiHint}
                />
            </motion.div>
        </motion.div>
    )
  });


  return (
    <div ref={containerRef} className="home-hero-section overflow-hidden">
      {!isMobile && imageElements}
      <motion.div
        className="hero-content"
        style={{ scale: logoScale, y: springLogoY }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 1, 0.5, 1] }}
      >
        <div className="logo-container">
          <div className="logo-placeholder">
            <h1 className="font-headline text-2xl sm:text-3xl md:text-4xl">d3 creation studio</h1>
          </div>
        </div>

        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
        >
          <h2 className="font-headline text-lg sm:text-xl md:text-2xl">Crafting Timeless Visual Stories</h2>
          <p className="font-body text-base sm:text-lg">Professional Photography & Videography</p>
        </motion.div>
      </motion.div>

      <motion.div
        className={cn("scroll-indicator", isScrolled && "opacity-0 pointer-events-none")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <div className="scroll-arrow"></div>
      </motion.div>
    </div>
  );
}
