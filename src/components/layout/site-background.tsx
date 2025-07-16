"use client";

import { motion } from 'framer-motion';
import { Camera, Video, Image as ImageIcon, Film } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const icons = [
  { icon: Camera, size: 'h-6 w-6' },
  { icon: Video, size: 'h-8 w-8' },
  { icon: ImageIcon, size: 'h-7 w-7' },
  { icon: Film, size: 'h-6 w-6' },
];

interface Particle {
  id: number;
  style: React.CSSProperties;
}

interface FloatingIcon {
  id: number;
  Icon: React.ElementType;
  style: React.CSSProperties;
}

export function SiteBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [floatingIcons, setFloatingIcons] = useState<FloatingIcon[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: Particle[] = Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        style: {
          left: `${Math.random() * 100}%`,
          width: `${Math.random() * 2 + 1}px`,
          height: `${Math.random() * 2 + 1}px`,
          animationDelay: `${Math.random() * 20}s`,
          animationDuration: `${Math.random() * 15 + 15}s`,
        },
      }));
      setParticles(newParticles);
    };

    const generateIcons = () => {
        const newIcons: FloatingIcon[] = Array.from({ length: 15 }).map((_, i) => {
            const IconData = icons[i % icons.length];
            return {
                id: i,
                Icon: IconData.icon,
                style: {
                    left: `${Math.random() * 100}%`,
                    fontSize: `${Math.random() * 10 + 16}px`,
                    animationDelay: `${Math.random() * 30}s`,
                    animationDuration: `${Math.random() * 20 + 20}s`,
                },
            };
        });
        setFloatingIcons(newIcons);
    };


    generateParticles();
    generateIcons();
  }, []);


  return (
    <div className="site-background-container">
      <div className="site-background-grid" />

      {particles.map(p => (
        <div key={p.id} className="background-particle" style={p.style} />
      ))}
      {floatingIcons.map(i => {
          const IconComponent = i.Icon;
          return <IconComponent key={i.id} className="background-icon" style={i.style} />
      })}

      <div className="site-gradient-orbs">
        <motion.div
          className="site-gradient-orb site-gradient-orb-1"
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
          className="site-gradient-orb site-gradient-orb-2"
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
    </div>
  );
}
