import Image from 'next/image';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  aiHint: string;
}

export function HeroSection({ title, subtitle, imageUrl, aiHint }: HeroSectionProps) {
  return (
    <div className="relative h-[50vh] min-h-[350px] flex items-center justify-center text-center text-white">
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover"
        priority
        data-ai-hint={aiHint}
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 p-4">
        <h1 className="text-4xl md:text-6xl font-bold font-headline text-shadow-lg animate-fade-in-down">{title}</h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto font-body text-shadow animate-fade-in-up">{subtitle}</p>
      </div>
    </div>
  );
}
