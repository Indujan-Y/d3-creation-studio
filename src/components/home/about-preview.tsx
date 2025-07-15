import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function AboutPreview() {
  return (
    <section className="py-16 lg:py-24 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl lg:text-4xl font-bold font-headline text-primary mb-4">
              We Are Aperture Visions
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              A collective of passionate photographers and videographers dedicated to crafting beautiful, compelling visual narratives. We believe every moment has a story, and we're here to help you tell it.
            </p>
            <p className="text-muted-foreground mb-8">
              From intimate weddings to large-scale commercial projects, our mission is to deliver exceptional quality and a personalized experience, turning your vision into a timeless reality.
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
              <Link href="/about">
                Know More <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          <div className="order-1 md:order-2 rounded-lg overflow-hidden shadow-lg">
             <Image
              src="https://placehold.co/600x600.png"
              alt="Aperture Visions team at work"
              width={600}
              height={600}
              className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
              data-ai-hint="photographer team"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
