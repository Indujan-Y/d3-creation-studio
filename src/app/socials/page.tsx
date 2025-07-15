import { HeroSection } from '@/components/shared/hero-section';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import Link from 'next/link';

export default function SocialsPage() {
  const socialLinks = [
    { name: 'Instagram', handle: '@ApertureVisions', url: '#', icon: Instagram, color: 'text-[#E1306C]' },
    { name: 'Facebook', handle: 'fb.com/ApertureVisions', url: '#', icon: Facebook, color: 'text-[#1877F2]' },
    { name: 'Twitter', handle: '@ApertureTweets', url: '#', icon: Twitter, color: 'text-[#1DA1F2]' },
    { name: 'YouTube', handle: 'Aperture Visions Channel', url: '#', icon: Youtube, color: 'text-[#FF0000]' },
  ];

  return (
    <>
      <HeroSection
        title="Connect With Us"
        subtitle="Follow our journey, see our latest work, and get behind-the-scenes glimpses on social media."
        imageUrl="https://placehold.co/1920x1080.png"
        aiHint="social media"
      />

      <div className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold font-headline text-primary">Find Us Online</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              We're active on all major platforms. Join our community!
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <Card key={social.name} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Icon className={`h-10 w-10 ${social.color}`} />
                      <div>
                        <CardTitle className="font-headline text-2xl">{social.name}</CardTitle>
                        <p className="text-muted-foreground">{social.handle}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full bg-accent hover:bg-accent/90">
                      <Link href={social.url} target="_blank" rel="noopener noreferrer">
                        Follow Us
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
