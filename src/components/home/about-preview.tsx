"use client";

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { aboutPreviewBg } from '@/lib/data';

export function AboutPreview() {
    const [dimensions, setDimensions] = useState({ vh: 0, vw: 0 });
    const homeAboutContainerRef = useRef(null);

    useEffect(() => {
        const updateDimensions = () => {
            setDimensions({
                vh: window.innerHeight,
                vw: window.innerWidth,
            });
        };
        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    const { vh } = dimensions;

    const { scrollYProgress } = useScroll({
        target: homeAboutContainerRef,
        offset: ["start end", "end start"]
    });

    const rawY = useTransform(scrollYProgress, [0, 1], [0, vh * -0.4]);
    const ymove = useSpring(rawY, { stiffness: 100, damping: 30, restDelta: 0.001 });

    return (
        <div className="home-about-container" ref={homeAboutContainerRef}>
            <div className="about-img-div">
              <Image
                src={aboutPreviewBg.url}
                alt="Photography session background"
                fill
                className="object-cover"
                data-ai-hint={aboutPreviewBg.aiHint}
              />
            </div>
            <motion.div className="about-content-div" style={{ y: ymove }}>
                <div className="about-left">
                    <Image
                      src="https://placehold.co/400x500.png"
                      alt="Owner Portrait"
                      width={400}
                      height={500}
                      className="object-cover rounded-lg shadow-2xl transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl"
                      data-ai-hint="photographer portrait"
                    />
                </div>
                <div className="about-right">
                    <h1 className="about-title">
                        Our Story
                    </h1>
                    <p className="about-content">
                        With over a decade of experience, we are passionate about delivering
                        exceptional quality and innovative visual solutions. Our journey began with a simple vision:
                        to create meaningful experiences that capture life's fleeting moments. Today, we
                        continue to push boundaries and set new standards of excellence in everything we do.
                    </p>
                     <Button asChild size="lg" className="about-know-more">
                        <Link href="/about">
                            Know More <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </motion.div>
        </div>
    )
}
