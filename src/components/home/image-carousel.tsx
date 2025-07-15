"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { carouselImages } from '@/lib/data';
import { cn } from '@/lib/utils';

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

    return (
        <div className="scrolling-carousels-wrapper">
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
        </div>
    );
}
