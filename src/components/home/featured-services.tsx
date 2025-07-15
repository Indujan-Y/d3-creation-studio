import Link from 'next/link';
import { services } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '../ui/button';
import { ArrowRight, Video, Heart, User, Camera } from 'lucide-react';

const iconMap: { [key: string]: React.ElementType } = {
  Heart,
  User,
  Video,
  Camera
};

export function FeaturedServices() {
  const featured = services.slice(0, 4);

  return (
    <section className="py-16 lg:py-24 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold font-headline text-primary">Our Services</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Crafting visual excellence for every occasion.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <Card key={service.slug} className="text-center group hover:shadow-xl transition-shadow duration-300">
                <Link href={`/services/${service.slug}`} className="flex flex-col h-full">
                  <CardHeader className="items-center">
                     <div className="bg-primary/10 p-4 rounded-full mb-4 group-hover:bg-primary transition-colors duration-300">
                      {Icon && <Icon className="h-8 w-8 text-primary group-hover:text-primary-foreground transition-colors duration-300" />}
                    </div>
                    <CardTitle className="font-headline text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription>{service.description}</CardDescription>
                  </CardContent>
                  <div className="p-6 pt-0">
                    <span className="text-sm font-semibold text-primary group-hover:text-accent transition-colors duration-300">
                      Learn More <ArrowRight className="inline-block h-4 w-4 ml-1" />
                    </span>
                  </div>
                </Link>
              </Card>
            );
          })}
        </div>
         <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link href="/services">
              Explore All Services <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
