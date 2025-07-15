import Image from 'next/image';
import { HeroSection } from '@/components/shared/hero-section';
import { Card } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export default function AboutPage() {
  const teamMembers = [
    { name: 'Jane Doe', role: 'Lead Photographer', imageUrl: 'https://placehold.co/400x400.png', aiHint: 'woman portrait' },
    { name: 'John Smith', role: 'Lead Videographer', imageUrl: 'https://placehold.co/400x400.png', aiHint: 'man portrait' },
    { name: 'Alex Johnson', role: 'Editor & Colorist', imageUrl: 'https://placehold.co/400x400.png', aiHint: 'person portrait' },
  ];

  const values = [
    'Creativity & Passion',
    'Uncompromising Quality',
    'Client-Centric Approach',
    'Storytelling at Heart',
    'Professionalism & Reliability'
  ];

  return (
    <>
      <HeroSection
        title="About d3 creation studio"
        subtitle="Discover the passion, creativity, and dedication behind our lens."
        imageUrl="https://placehold.co/1920x1080.png"
        aiHint="photography studio"
      />

      <div className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold font-headline text-primary mb-6">Our Story</h2>
              <p className="text-lg text-foreground mb-4">
                Founded on a shared love for visual storytelling, d3 creation studio began as a dream between a few friends. We saw a world full of fleeting moments and felt a compelling need to capture their beauty and emotion for eternity.
              </p>
              <p className="text-muted-foreground">
                Today, we are a full-fledged creative agency, but our core philosophy remains the same: to approach every project with the heart of an artist and the precision of a professional. We are more than just photographers and videographers; we are curators of memory, dedicated to preserving your most cherished moments in the most beautiful way possible.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <Image
                src="https://placehold.co/600x700.png"
                alt="d3 creation studio team"
                width={600}
                height={700}
                className="w-full h-auto object-cover"
                data-ai-hint="creative team"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold font-headline text-primary">Our Values</h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                    The principles that guide every shot we take and every story we tell.
                </p>
            </div>
            <div className="max-w-4xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {values.map((value, index) => (
                    <div key={index} className="flex items-center gap-4">
                        <CheckCircle className="h-8 w-8 text-accent flex-shrink-0" />
                        <span className="text-lg font-semibold">{value}</span>
                    </div>
                ))}
            </div>
        </div>
      </div>

      <div className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold font-headline text-primary">Meet the Team</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              The creative minds dedicated to bringing your vision to life.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.name} className="text-center overflow-hidden group">
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  width={400}
                  height={400}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  data-ai-hint={member.aiHint}
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold font-headline">{member.name}</h3>
                  <p className="text-accent font-semibold">{member.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
