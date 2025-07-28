
import Image from 'next/image';
import Link from 'next/link';
import { HeroSection } from '@/components/shared/hero-section';
import { Card, CardContent } from '@/components/ui/card';
import { getAllAlbums } from '@/services/album-service';

export default async function AlbumsPage() {
  const albums = await getAllAlbums();

  return (
    <>
      <HeroSection
        title="Our Albums"
        subtitle="Explore our curated collections of visual stories, each capturing a unique moment in time."
        imageUrl="https://placehold.co/1920x1080.png"
        aiHint="photo gallery"
      />

      <div className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold font-headline text-primary">A Gallery of Stories</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Each album is a carefully curated collection of moments, emotions, and memories. We invite you to browse through our work and discover the diverse stories we've had the honor of telling. From intimate portraits to grand celebrations, find inspiration for your own story within these galleries.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {albums.map((album) => (
              <Card key={album.id} className="overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                <Link href={`/albums/${album.id}`}>
                  <CardContent className="p-0">
                    <div className="relative aspect-video">
                      <Image
                        src={album.coverUrl}
                        alt={album.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        data-ai-hint={album.aiHint}
                      />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    </div>
                    <div className="p-6 bg-card">
                      <h3 className="text-xl font-bold font-headline text-primary">{album.title}</h3>
                      <p className="text-sm text-muted-foreground mt-2 font-body">{album.description}</p>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
