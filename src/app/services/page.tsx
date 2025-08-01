import Image from 'next/image';
import Link from 'next/link';
import { HeroSection } from '@/components/shared/hero-section';
import { Card, CardContent } from '@/components/ui/card';
import { getAllCategories } from '@/services/category-service';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default async function ServicesPage() {
  const services = await getAllCategories();

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
           <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold font-headline text-primary">What We Offer</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              At d3 creation studio, we provide a comprehensive range of visual services designed to meet your creative needs. Whether you're celebrating a milestone, building a brand, or telling a story, our team is equipped with the skills and passion to bring your vision to life. Explore our offerings below to find the perfect fit for your project.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {services.map((service) => (
              <Card key={service.id} className="group overflow-hidden flex flex-col">
                <div className="relative w-full h-48">
                  <Image
                    src={service.thumbnail}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint="service offering"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold font-headline text-primary mb-2">{service.title}</h3>
                  <p className="text-muted-foreground font-body flex-grow">{service.description}</p>
                  <div className="mt-6">
                    <Button asChild variant="link" className="p-0 h-auto text-accent">
                      <Link href={`/services/${service.id}`}>
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
