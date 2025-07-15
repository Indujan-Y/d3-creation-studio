import Image from 'next/image';
import Link from 'next/link';
import { HeroSection } from '@/components/shared/hero-section';
import { Card, CardContent } from '@/components/ui/card';
import { services } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function ServicesPage() {
  return (
    <>
      <HeroSection
        title="Our Services"
        subtitle="Professional photography and videography services tailored to your needs."
        imageUrl="https://placehold.co/1920x1080.png"
        aiHint="camera equipment"
      />

      <div className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <Card key={service.slug} className="group overflow-hidden flex flex-col md:flex-row">
                <div className="md:w-1/3 relative">
                  <Image
                    src={service.imageUrl}
                    alt={service.title}
                    width={400}
                    height={400}
                    className="object-cover w-full h-48 md:h-full transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint={service.aiHint}
                  />
                </div>
                <div className="md:w-2/3 p-6 flex flex-col">
                  <h3 className="text-2xl font-bold font-headline text-primary mb-2">{service.title}</h3>
                  <p className="text-muted-foreground font-body flex-grow">{service.details}</p>
                  <div className="mt-6">
                    <Button asChild variant="link" className="p-0 h-auto text-accent">
                      <Link href={`/services/${service.slug}`}>
                        Find Out More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
