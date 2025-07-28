
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getDatabase, ref, onValue } from 'firebase/database';
import { app } from '@/lib/firebase';

interface CarouselImage {
    id: string;
    url: string;
    order: number;
}

export function ImageCarousel() {
    const [images, setImages] = useState<CarouselImage[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const db = getDatabase(app);
        const carouselRef = ref(db, 'carousel');

        const unsubscribe = onValue(carouselRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const imageList = Object.values(data) as Omit<CarouselImage, 'id'>[];
                const fetchedImages = imageList.map((img, index) => ({
                    ...img,
                    id: Object.keys(data)[index],
                    // Request a higher resolution image from Google Drive
                    url: `${img.url}&sz=w1920` 
                }));
                
                fetchedImages.sort((a, b) => a.order - b.order);
                setImages(fetchedImages);
            }
        });

        return () => unsubscribe();
    }, []);
    
    if (!isMounted || images.length === 0) {
        // You can return a loading skeleton here if you want
        return null;
    }

    // Duplicate images for a seamless loop
    const extendedImages = [...images, ...images];

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
                        <div className="scrolling-carousel-item" key={`top-${image.id}-${i}`}>
                            <Image 
                                src={image.url} 
                                alt={`Carousel image ${image.order + 1}`} 
                                width={500}
                                height={300}
                                className="object-cover"
                                data-ai-hint={'carousel image'} 
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="scrolling-carousel-container">
                <div className="scrolling-carousel-track right-to-left">
                     {extendedImages.map((image, i) => (
                        <div className="scrolling-carousel-item" key={`middle-${image.id}-${i}`}>
                            <Image 
                                src={image.url} 
                                alt={`Carousel image ${image.order + 1}`}
                                width={500}
                                height={300}
                                className="object-cover"
                                data-ai-hint={'carousel image'}
                             />
                        </div>
                    ))}
                </div>
            </div>

            <div className="scrolling-carousel-container">
                <div className="scrolling-carousel-track left-to-right-2">
                     {extendedImages.map((image, i) => (
                        <div className="scrolling-carousel-item" key={`bottom-${image.id}-${i}`}>
                           <Image 
                                src={image.url} 
                                alt={`Carousel image ${image.order + 1}`}
                                width={500}
                                height={300}
                                className="object-cover"
                                data-ai-hint={'carousel image'}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
