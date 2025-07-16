"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Eye, Camera, Calendar, ArrowRight, Aperture, Focus, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { albums } from '@/lib/data';

export function FeaturedAlbums() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Parallax transforms
    const contentY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

    // Smooth spring animations for mouse tracking
    const springConfig = { damping: 30, stiffness: 100 };
    const mouseX = useSpring(0, springConfig);
    const mouseY = useSpring(0, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = (containerRef.current as HTMLElement).getBoundingClientRect();
            if (rect) {
                const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
                const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
                mouseX.set(x * 30);
                mouseY.set(y * 30);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 60,
            scale: 0.8,
            rotateX: -15
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        }
    };

    return (
        <div
            ref={containerRef}
            className="relative py-16 lg:py-24"
        >
            <motion.div
                style={{ y: contentY, opacity }}
                className="albums-content"
            >
                <motion.div
                    className="albums-header"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.h2
                        className="albums-title"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        Featured <span className="title-gradient">Albums</span>
                    </motion.h2>

                    <motion.p
                        className="albums-description"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        Explore our curated collection of photography albums, each telling a unique story through carefully crafted visuals
                    </motion.p>
                </motion.div>
                <motion.div
                    className="albums-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {albums.slice(0, 6).map((album) => (
                        <motion.div
                            key={album.slug}
                            variants={itemVariants}
                            className="album-card"
                            whileHover={{
                                y: -10,
                                scale: 1.02,
                                transition: { duration: 0.3 }
                            }}
                        >
                          <Link href={`/albums/${album.slug}`}>
                            <div className="album-image-container">
                                <motion.img
                                    src={album.coverUrl}
                                    alt={album.title}
                                    className="album-image"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.7 }}
                                    data-ai-hint={album.aiHint}
                                />
                                <motion.div
                                    className={`album-overlay ${album.gradient}`}
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 0.6 }}
                                    transition={{ duration: 0.3 }}
                                />
                                <motion.div
                                    className="album-hover-content"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileHover={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="hover-content-inner">
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Eye className="hover-icon" />
                                            <p className="hover-text">View Album</p>
                                        </motion.div>
                                    </div>
                                </motion.div>

                                <div className="category-badge">
                                    <span className="category-text">{album.category}</span>
                                </div>
                            </div>
                           </Link>
                            <div className="album-content">
                                <h3 className="album-title">{album.title}</h3>
                                <p className="album-description">{album.description}</p>
                                <div className="album-meta">
                                    <div className="meta-item">
                                        <Camera className="meta-icon" />
                                        <span>{album.images.length * 5}+ Photos</span>
                                    </div>
                                    <div className="meta-item">
                                        <Calendar className="meta-icon" />
                                        <span>2024</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    className="view-more-container"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                >
                    <Link href="/albums">
                        <motion.button
                            className="view-more-btn"
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.2 }
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span>View All Albums</span>
                            <motion.div
                                className="btn-icon"
                                whileHover={{ x: 5 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ArrowRight className="arrow-icon" />
                            </motion.div>
                        </motion.button>
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
};
