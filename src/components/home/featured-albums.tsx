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
    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
    const particlesY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
    const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
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
                mouseX.set(x * 50);
                mouseY.set(y * 50);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    // Particle system
    const particles = React.useMemo(() => Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.5 + 0.3,
        delay: Math.random() * 5
    })), []);

    const floatingIcons = [
        { icon: Camera, x: 10, y: 20, size: 24 },
        { icon: Aperture, x: 85, y: 15, size: 20 },
        { icon: Focus, x: 15, y: 75, size: 18 },
        { icon: ImageIcon, x: 90, y: 80, size: 22 }
    ];

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
            className="albums-container"
        >
            <motion.div
                style={{ y: backgroundY }}
                className="background-grid"
            />
            <motion.div style={{ y: particlesY }} className="particles-container">
                {particles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        className="particle"
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            opacity: particle.opacity
                        }}
                        animate={{
                            y: [0, -100, 0],
                            opacity: [particle.opacity, particle.opacity * 0.3, particle.opacity],
                            scale: [1, 1.5, 1]
                        }}
                        transition={{
                            duration: 8 + particle.speed * 4,
                            repeat: Infinity,
                            delay: particle.delay,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </motion.div>
            <div className="floating-icons-container">
                {floatingIcons.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <motion.div
                            key={index}
                            className="floating-icon"
                            style={{
                                left: `${item.x}%`,
                                top: `${item.y}%`,
                                x: mouseX,
                                y: mouseY
                            }}
                            animate={{
                                y: [0, -20, 0],
                                rotate: [0, 5, 0],
                                opacity: [0.3, 0.6, 0.3]
                            }}
                            transition={{
                                duration: 4 + index,
                                repeat: Infinity,
                                delay: index * 0.5,
                                ease: "easeInOut"
                            }}
                        >
                            <Icon size={item.size} />
                        </motion.div>
                    );
                })}
            </div>
            <motion.div
                style={{ y: contentY }}
                className="gradient-orbs"
            >
                <motion.div
                    className="gradient-orb gradient-orb-1"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="gradient-orb gradient-orb-2"
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.4, 0.6, 0.4]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                />
            </motion.div>
            <motion.div
                style={{ opacity }}
                className="albums-content"
            >
                <motion.div
                    className="albums-header"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        className="albums-badge"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <Camera className="badge-icon" />
                        <span className="badge-text">Our Portfolio</span>
                    </motion.div>

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
