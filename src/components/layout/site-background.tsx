"use client";

import { motion } from 'framer-motion';

export function SiteBackground() {
  return (
    <div className="site-background-container">
      <div className="site-background-grid" />
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
            ease: "easeInOut",
            delay: 5,
          }}
        />
      </div>
    </div>
  );
}
