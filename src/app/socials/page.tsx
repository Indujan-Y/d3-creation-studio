
"use client";

import { HeroSection } from '@/components/shared/hero-section';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Facebook, Instagram, Youtube, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const WhatsAppIcon = () => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#25D366]">
        <title>WhatsApp</title>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52s-.67-.816-.916-1.123c-.244-.306-.487-.261-.67-.261-.182 0-.381.025-.58.025-.198 0-.52.074-.792.372-.27.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
);


export default function SocialsPage() {
    const socialLinks = [
        { name: 'Instagram', handle: '@d3_creation_studio', url: 'https://www.instagram.com/d3_creation_studio/', icon: Instagram, color: 'text-[#E1306C]' },
        { name: 'Facebook', handle: 'fb.com/d3creationstudio', url: '#', icon: Facebook, color: 'text-[#1877F2]' },
        { name: 'YouTube', handle: 'd3 creation studio Channel', url: 'https://www.youtube.com/@d3creation966', icon: Youtube, color: 'text-[#FF0000]' },
        { name: 'WhatsApp', handle: '+91 7708548764', url: 'https://wa.me/917708548764', icon: WhatsAppIcon, color: 'text-[#25D366]' },
    ];

    const instagramMedia = {
        posts: [
            { id: 1, type: 'post', url: 'https://placehold.co/600x600.png', aiHint: 'wedding photo' },
            { id: 2, type: 'post', url: 'https://placehold.co/600x600.png', aiHint: 'portrait shot' },
            { id: 3, type: 'post', url: 'https://placehold.co/600x600.png', aiHint: 'event photography' },
            { id: 4, type: 'post', url: 'https://placehold.co/600x600.png', aiHint: 'landscape picture' },
        ],
        reels: [
            { id: 1, type: 'reel', url: 'https://placehold.co/400x700.png', aiHint: 'wedding reel' },
            { id: 2, type: 'reel', url: 'https://placehold.co/400x700.png', aiHint: 'behind scenes' },
            { id: 3, type: 'reel', url: 'https://placehold.co/400x700.png', aiHint: 'cinematic video' },
        ]
    };

    const youtubeMedia = {
        videos: [
            { id: 1, type: 'video', url: 'https://placehold.co/800x450.png', aiHint: 'wedding film' },
            { id: 2, type: 'video', url: 'https://placehold.co/800x450.png', aiHint: 'corporate video' },
        ],
        shorts: [
            { id: 1, type: 'short', url: 'https://placehold.co/450x800.png', aiHint: 'quick tip' },
            { id: 2, type: 'short', url: 'https://placehold.co/450x800.png', aiHint: 'bts short' },
            { id: 3, type: 'short', url: 'https://placehold.co/450x800.png', aiHint: 'event highlight' },
        ]
    }

    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.4
            }
        }
    };

    return (
        <>
            <HeroSection
                title="Connect With Us"
                subtitle="Follow our journey, see our latest work, and get behind-the-scenes glimpses on social media."
                imageUrl="https://placehold.co/1920x1080.png"
                aiHint="social media"
            />

            <div className="py-16 lg:py-24 bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold font-headline text-primary">Join Our Community</h2>
                        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                            We're active on several platforms where we share our latest projects, behind-the-scenes content, and photography tips. Follow us to stay updated and become part of the d3 creation studio family.
                        </p>
                    </div>
                    {/* Instagram Section */}
                    <motion.section
                        className="mb-20"
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <div className="flex justify-between items-center mb-8">
                            <div className='flex items-center gap-4'>
                                <Instagram className="h-10 w-10 text-[#E1306C]" />
                                <div>
                                    <h2 className="text-3xl font-bold font-headline text-primary">Instagram</h2>
                                    <p className="text-muted-foreground">@d3_creation_studio</p>
                                </div>
                            </div>
                            <Button asChild>
                                <Link href="https://www.instagram.com/d3_creation_studio/" target="_blank" rel="noopener noreferrer">
                                    Follow Us <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                        <motion.div
                            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
                            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                        >
                            {instagramMedia.posts.map(post => (
                                <motion.div key={post.id} variants={cardVariants} className="aspect-square">
                                    <Card className="h-full w-full overflow-hidden group">
                                        <Image src={post.url} alt="Instagram Post" width={600} height={600} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-ai-hint={post.aiHint} />
                                    </Card>
                                </motion.div>
                            ))}
                        </motion.div>
                        <h3 className="text-2xl font-bold font-headline text-primary mb-4">Reels</h3>
                        <motion.div
                            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
                            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                        >
                            {instagramMedia.reels.map(reel => (
                                <motion.div key={reel.id} variants={cardVariants} className="aspect-[9/16]">
                                    <Card className="h-full w-full overflow-hidden group">
                                        <Image src={reel.url} alt="Instagram Reel" width={400} height={700} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-ai-hint={reel.aiHint} />
                                    </Card>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.section>

                    <div className="my-16 border-b"></div>

                    {/* YouTube Section */}
                    <motion.section
                        className="mb-20"
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <div className="flex justify-between items-center mb-8">
                            <div className='flex items-center gap-4'>
                                <Youtube className="h-10 w-10 text-[#FF0000]" />
                                <div>
                                    <h2 className="text-3xl font-bold font-headline text-primary">YouTube</h2>
                                    <p className="text-muted-foreground">d3 creation studio</p>
                                </div>
                            </div>
                            <Button asChild>
                                <Link href="https://www.youtube.com/@d3creation966" target="_blank" rel="noopener noreferrer">
                                    Subscribe <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                        <h3 className="text-2xl font-bold font-headline text-primary mb-4">Videos</h3>
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
                            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                        >
                            {youtubeMedia.videos.map(video => (
                                <motion.div key={video.id} variants={cardVariants} className="aspect-video">
                                    <Card className="h-full w-full overflow-hidden group">
                                        <Image src={video.url} alt="YouTube Video" width={800} height={450} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-ai-hint={video.aiHint} />
                                    </Card>
                                </motion.div>
                            ))}
                        </motion.div>
                        <h3 className="text-2xl font-bold font-headline text-primary mb-4">Shorts</h3>
                        <motion.div
                            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
                             variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                        >
                            {youtubeMedia.shorts.map(short => (
                                <motion.div key={short.id} variants={cardVariants} className="aspect-[9/16]">
                                    <Card className="h-full w-full overflow-hidden group">
                                        <Image src={short.url} alt="YouTube Short" width={450} height={800} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-ai-hint={short.aiHint} />
                                    </Card>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.section>

                     <div className="my-16 border-b"></div>

                    {/* Other Socials */}
                     <motion.section
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                     >
                        <div className="text-center mb-12">
                            <h2 className="text-3xl lg:text-4xl font-bold font-headline text-primary">More Ways to Connect</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {socialLinks.filter(s => s.name !== 'Instagram' && s.name !== 'YouTube').map((social) => {
                                const Icon = social.icon;
                                return (
                                    <Card key={social.name} className="hover:shadow-lg transition-shadow">
                                        <CardContent className="p-6 flex flex-col items-center text-center">
                                            <Icon />
                                            <h3 className="font-headline text-2xl mt-4">{social.name}</h3>
                                            <p className="text-muted-foreground mb-4">{social.handle}</p>
                                            <Button asChild className="w-full">
                                                <Link href={social.url} target="_blank" rel="noopener noreferrer">
                                                    {social.name === 'WhatsApp' ? 'Message Us' : 'Follow Us'}
                                                </Link>
                                            </Button>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                     </motion.section>
                </div>
            </div>
        </>
    );
}
