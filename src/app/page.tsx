import { HeroSection } from "@/components/shared/hero-section";
import { AboutPreview } from "@/components/home/about-preview";
import { FeaturedAlbums } from "@/components/home/featured-albums";
import { FeaturedServices } from "@/components/home/featured-services";
import { Testimonials } from "@/components/home/testimonials";
import { ImageCarousel } from "@/components/home/image-carousel";

export default function Home() {
  return (
    <>
      <HeroSection
        title="Aperture Visions"
        subtitle="Crafting Timeless Visual Stories Through Photography and Videography"
        imageUrl="https://placehold.co/1920x1080.png"
        aiHint="camera lens"
      />
      <AboutPreview />
      <FeaturedServices />
      <FeaturedAlbums />
      <Testimonials />
      <ImageCarousel />
    </>
  );
}
