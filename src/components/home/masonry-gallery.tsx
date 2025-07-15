"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { masonryGalleryImages } from '@/lib/data';

export function MasonryGallery() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <motion.section 
        className="masonry-gallery-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
            className="masonry-gallery-header"
            variants={itemVariants}
        >
          <h2 className="masonry-gallery-title">From Our Gallery</h2>
          <p className="masonry-gallery-description">
            A glimpse into the diverse moments and stories we've had the pleasure of capturing.
          </p>
        </motion.div>
        
        <div className="masonry-grid">
          {masonryGalleryImages.map((image, index) => (
            <motion.div 
                key={index} 
                className="masonry-item"
                variants={itemVariants}
            >
              <Image
                src={image.src}
                alt={`Gallery image ${index + 1}`}
                width={500}
                height={parseInt(image.src.split('x')[1])}
                data-ai-hint={image.aiHint}
              />
              <div className="masonry-item-overlay"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
