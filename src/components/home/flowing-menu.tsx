
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { getAllCategories, type Category } from "@/services/category-service";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from 'framer-motion';

interface MenuItemProps {
  link: string;
  text: string;
  image: string;
}

export const FlowingMenu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItemProps[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      const categories = await getAllCategories();
      const mappedItems = categories.slice(0, 4).map(service => ({
        link: `/services/${service.id}`,
        text: service.title,
        image: service.thumbnail
      }));
      setMenuItems(mappedItems);
    }
    fetchCategories();
  }, []);

  const sectionVariants = {
      hidden: { opacity: 0 },
      visible: { 
          opacity: 1,
          transition: { duration: 1, ease: "easeOut", staggerChildren: 0.2 }
      }
  };

  const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.section 
      className="w-full min-h-screen bg-background flex flex-col justify-center overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.div 
        className="text-center pt-16 pb-12"
        variants={itemVariants}
      >
          <h2 className="text-3xl lg:text-4xl font-bold font-headline text-primary">Our Services</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Crafting visual excellence for every occasion.
          </p>
        </motion.div>
      <nav className="flex flex-col h-[calc(100vh-300px)] m-0 p-0">
        {menuItems.map((item, idx) => (
          <MenuItem key={idx} {...item} />
        ))}
      </nav>
      <motion.div 
        className="text-center py-12"
        variants={itemVariants}
      >
          <Button asChild size="lg">
            <Link href="/services">
              View All Services <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
    </motion.section>
  );
};

const MenuItem: React.FC<MenuItemProps> = ({ link, text, image }) => {
  const itemRef = React.useRef<HTMLDivElement>(null);
  const marqueeRef = React.useRef<HTMLDivElement>(null);
  const marqueeInnerRef = React.useRef<HTMLDivElement>(null);

  const animationDefaults = { duration: 0.7, ease: "power4.out" };

  const findClosestEdge = (
    mouseX: number,
    mouseY: number,
    width: number,
    height: number
  ): "top" | "bottom" => {
    const topEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY, 2);
    const bottomEdgeDist =
      Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY - height, 2);
    return topEdgeDist < bottomEdgeDist ? "top" : "bottom";
  };

  const handleMouseEnter = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current)
      return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height
    );

    gsap.timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" })
      .set(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" })
      .to([marqueeRef.current, marqueeInnerRef.current], { y: "0%" });
  };

  const handleMouseLeave = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current)
      return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height
    );

    gsap.timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" })
      .to(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" }, 0);
  };

  const repeatedMarqueeContent = React.useMemo(() => {
    return Array.from({ length: 4 }).map((_, idx) => (
      <React.Fragment key={idx}>
        <span className="text-primary-foreground uppercase font-normal text-[4vh] leading-[1.2] p-[1vh_1vw_0]">
          {text}
        </span>
        <div
          className="w-[200px] h-[7vh] my-[2em] mx-[2vw] p-[1em_0] rounded-[50px] bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />
      </React.Fragment>
    ));
  }, [text, image]);

  return (
    <div
      className="flex-1 relative overflow-hidden text-center shadow-[0_-1px_0_0_hsl(var(--border))]"
      ref={itemRef}
    >
      <Link
        className="flex items-center justify-center h-full relative cursor-pointer uppercase no-underline font-semibold text-muted-foreground text-[4vh] hover:text-accent focus:text-accent focus-visible:text-accent transition-colors duration-300"
        href={link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {text}
      </Link>
      <div
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none bg-accent translate-y-[101%]"
        ref={marqueeRef}
      >
        <div className="h-full w-full flex" ref={marqueeInnerRef}>
          <div className="flex items-center relative h-full w-[200%] will-change-transform animate-marquee">
            {repeatedMarqueeContent}
          </div>
        </div>
      </div>
    </div>
  );
};
