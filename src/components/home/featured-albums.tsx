"use client";

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Eye, Camera, Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { albums } from '@/lib/data';

export function FeaturedAlbums() {
    const containerRef = useRef(null);

    const sectionVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.5, staggerChildren: 0.2 }
        }
    };

    const headerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] }
        }
    }

    const gridVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            }
        }
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 50,
            scale: 0.95
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.7,
                ease: [0.25, 1, 0.5, 1]
            }
        }
    };

    return (
        <motion.div
            ref={containerRef}
            className="relative py-16 lg:py-24"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <div
                className="albums-content"
            >
                <motion.div
                    className="albums-header"
                    variants={headerVariants}
                >
                    <h2
                        className="albums-title"
                    >
                        Featured <span className="title-gradient">Albums</span>
                    </h2>

                    <p
                        className="albums-description"
                    >
                        Explore our curated collection of photography albums, each telling a unique story through carefully crafted visuals
                    </p>
                </motion.div>
                <motion.div
                    className="albums-grid"
                    variants={gridVariants}
                >
                    {albums.slice(0, 6).map((album) => (
                        <motion.div
                            key={album.slug}
                            variants={itemVariants}
                            className="album-card"
                            whileHover={{
                                y: -8,
                                transition: { duration: 0.3, ease: "easeOut" }
                            }}
                        >
                          <Link href={`/albums/${album.slug}`}>
                            <div className="album-image-container">
                                <motion.img
                                    src={album.coverUrl}
                                    alt={album.title}
                                    className="album-image"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                    data-ai-hint={album.aiHint}
                                />
                                <motion.div
                                    className={`album-overlay ${album.gradient}`}
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 0.6 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                />
                                <motion.div
                                    className="album-hover-content"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileHover={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                >
                                    <div className="hover-content-inner">
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ duration: 0.2, ease: "easeOut" }}
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
                    className="view-more-container mt-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                >
                    <Link href="/albums">
                        <motion.button
                            className="view-more-btn"
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.2, ease: "easeOut" }
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
            </div>
        </motion.div>
    );
};
