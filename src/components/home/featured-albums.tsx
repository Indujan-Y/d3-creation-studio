import Link from 'next/link';
import Image from 'next/image';
import { albums } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function FeaturedAlbums() {
  const featured = albums.slice(0, 3);

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold font-headline text-primary">Featured Albums</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            A glimpse into the stories we've had the honor of telling.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {featured.map((album) => (
            <Card key={album.slug} className="overflow-hidden group">
              <CardContent className="p-0">
                <Link href={`/albums/${album.slug}`}>
                  <div className="relative h-64">
                    <Image
                      src={album.coverUrl}
                      alt={album.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      data-ai-hint={album.aiHint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 p-6 text-white">
                      <h3 className="text-xl font-bold font-headline">{album.title}</h3>
                      <p className="text-sm opacity-90 mt-1">{album.description}</p>
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link href="/albums">
              View All Albums <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
