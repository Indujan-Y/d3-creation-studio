"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { carouselImages } from '@/lib/data';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function ImageCarousel() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    // Duplicate images for a seamless loop
    const extendedImages = [...carouselImages, ...carouselImages];

    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <motion.div 
            className="scrolling-carousels-wrapper"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
        >
            <div className="scrolling-carousel-container">
                <div className="scrolling-carousel-track left-to-right-1">
                    {extendedImages.map((image, i) => (
                        <div className="scrolling-carousel-item" key={`top-${i}`}>
                            <Image 
                                src={image.src} 
                                alt={image.alt} 
                                width={500}
                                height={300}
                                className="object-cover"
                                data-ai-hint={image.aiHint} 
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="scrolling-carousel-container">
                <div className="scrolling-carousel-track right-to-left">
                     {extendedImages.map((image, i) => (
                        <div className="scrolling-carousel-item" key={`middle-${i}`}>
                            <Image 
                                src={image.src} 
                                alt={image.alt}
                                width={500}
                                height={300}
                                className="object-cover"
                                data-ai-hint={image.aiHint}
                             />
                        </div>
                    ))}
                </div>
            </div>

            <div className="scrolling-carousel-container">
                <div className="scrolling-carousel-track left-to-right-2">
                     {extendedImages.map((image, i) => (
                        <div className="scrolling-carousel-item" key={`bottom-${i}`}>
                           <Image 
                                src={image.src} 
                                alt={image.alt}
                                width={500}
                                height={300}
                                className="object-cover"
                                data-ai-hint={image.aiHint}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
