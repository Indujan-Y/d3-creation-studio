import { notFound } from 'next/navigation';
import Image from 'next/image';
import { HeroSection } from '@/components/shared/hero-section';
import { services } from '@/lib/data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Check } from 'lucide-react';

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  const features = [
    "High-resolution digital files",
    "Professional editing and color grading",
    "Online gallery for viewing and sharing",
    "Consultation to plan your session",
  ]

  return (
    <>
      <HeroSection
        title={service.title}
        subtitle={service.description}
        imageUrl={service.imageUrl}
        aiHint={service.aiHint}
      />

      <div className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <div>
                     <h2 className="text-3xl lg:text-4xl font-bold font-headline text-primary mb-6">Service Details</h2>
                    <p className="text-lg text-foreground mb-4">
                        {service.details}
                    </p>
                    <p className="text-muted-foreground mb-8">
                        Our approach is collaborative. We work closely with you to understand your vision and goals, ensuring the final product not only meets but exceeds your expectations. Every detail is meticulously planned and executed with creative flair.
                    </p>
                    <h3 className="text-2xl font-bold font-headline text-primary mb-4">What's Included</h3>
                    <ul className="space-y-3 mb-8">
                        {features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-3">
                                <Check className="h-6 w-6 text-accent flex-shrink-0" />
                                <span className="text-foreground">{feature}</span>
                            </li>
                        ))}
                    </ul>
                    <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
                        <Link href="/contact">
                            Book This Service
                        </Link>
                    </Button>
                </div>
                <div className="rounded-lg overflow-hidden shadow-xl">
                    <Image
                        src={service.imageUrl}
                        alt={service.title}
                        width={600}
                        height={700}
                        className="w-full h-auto object-cover"
                        data-ai-hint={service.aiHint}
                    />
                </div>
            </div>
        </div>
      </div>
    </>
  );
}
