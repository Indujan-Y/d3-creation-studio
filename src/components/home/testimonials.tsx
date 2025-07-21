"use client";

import Image from 'next/image';
import { testimonials } from '@/lib/data';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Quote } from 'lucide-react';
import React from 'react';
import Autoplay from "embla-carousel-autoplay";
import { motion } from 'framer-motion';

export function Testimonials() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: true })
  )

  return (
    <motion.section 
      className="py-16 lg:py-24"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold font-headline text-primary">What Our Clients Say</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Stories of success and satisfaction from the people we've worked with.
          </p>
        </div>
        <Carousel
          plugins={[plugin.current]}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card className="border-2 border-primary/20 shadow-lg overflow-hidden">
                    <div className="relative">
                       <Image 
                         src={testimonial.imageUrl}
                         alt={`Testimonial from ${testimonial.name}`}
                         width={800}
                         height={400}
                         className="w-full h-48 sm:h-64 object-cover"
                         data-ai-hint="testimonial background"
                       />
                       <div className="absolute inset-0 bg-black/60" />
                       <CardContent className="absolute inset-0 flex flex-col items-center text-center justify-center p-6 sm:p-8 md:p-12 text-white">
                        <Quote className="h-8 w-8 sm:h-10 sm:w-10 text-accent mb-4 sm:mb-6" />
                        <p className="text-base sm:text-lg md:text-xl font-body mb-6">
                          "{testimonial.quote}"
                        </p>
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage src={testimonial.avatarUrl} alt={testimonial.name} data-ai-hint={testimonial.aiHint} />
                            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                             <p className="font-bold font-headline text-lg">{testimonial.name}</p>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </motion.section>
  );
}
