import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { carouselImages } from '@/lib/data';

export function ImageCarousel() {
  return (
    <section className="py-16 lg:py-24 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold font-headline text-primary">Our Gallery</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            A curated collection of our favorite shots.
          </p>
        </div>
        <Carousel className="w-full"
            opts={{
            align: "start",
            loop: true,
          }}>
          <CarouselContent>
            {carouselImages.map((image, index) => (
              <CarouselItem key={index}>
                <div className="aspect-video relative rounded-lg overflow-hidden">
                  <Image src={image.src} alt={image.alt} fill className="object-cover" data-ai-hint={image.aiHint}/>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
        </Carousel>
      </div>
    </section>
  );
}
