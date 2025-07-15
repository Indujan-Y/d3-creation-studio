import { HeroSection } from '@/components/shared/hero-section';
import { AltTextGeneratorForm } from './alt-text-generator-form';

export default function AiAltTextGeneratorPage() {
  return (
    <>
      <HeroSection
        title="AI Alt-Text Generator"
        subtitle="Enhance your website's SEO and accessibility with AI-powered alt-text suggestions for your images."
        imageUrl="https://placehold.co/1920x1080.png"
        aiHint="artificial intelligence"
      />
      <div className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AltTextGeneratorForm />
        </div>
      </div>
    </>
  );
}
