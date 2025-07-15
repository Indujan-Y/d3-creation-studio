import { notFound } from 'next/navigation';
import Image from 'next/image';
import { HeroSection } from '@/components/shared/hero-section';
import { albums } from '@/lib/data';

export async function generateStaticParams() {
  return albums.map((album) => ({
    slug: album.slug,
  }));
}

export default function AlbumDetailPage({ params }: { params: { slug: string } }) {
  const album = albums.find((a) => a.slug === params.slug);

  if (!album) {
    notFound();
  }

  return (
    <>
      <HeroSection
        title={album.title}
        subtitle={album.description}
        imageUrl={album.coverUrl}
        aiHint={album.aiHint}
      />

      <div className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {album.images.map((image, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                <Image
                  src={image.url}
                  alt={`${album.title} image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  data-ai-hint={image.aiHint}
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
