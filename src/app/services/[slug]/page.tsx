import { notFound } from 'next/navigation';
import Image from 'next/image';
import { HeroSection } from '@/components/shared/hero-section';
import { getCategoryById, getAllCategories } from '@/services/category-service';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category) => ({
    slug: category.id,
  }));
}

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = await getCategoryById(params.slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <HeroSection
        title={service.title}
        subtitle={service.description}
        imageUrl={service.thumbnail}
        aiHint="service details"
      />

      <div className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold font-headline text-primary mb-6">Our Work</h2>
                 <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                    A glimpse into the moments we've captured for this service.
                </p>
            </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
                {service.photos.map((photo, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                    <Image
                    src={photo.url}
                    alt={`${service.title} image ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint={photo.aiHint}
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                ))}
            </div>

            <div className="text-center">
                 <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
                    <Link href="/contact">
                        Book This Service
                    </Link>
                </Button>
            </div>
        </div>
      </div>
    </>
  );
}
