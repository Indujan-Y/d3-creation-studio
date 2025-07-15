import { HomeHero } from "@/components/home/home-hero";
import { AboutPreview } from "@/components/home/about-preview";
import { FeaturedAlbums } from "@/components/home/featured-albums";
import { FeaturedServices } from "@/components/home/featured-services";
import { Testimonials } from "@/components/home/testimonials";
import { ImageCarousel } from "@/components/home/image-carousel";

export default function Home() {
  return (
    <>
      <HomeHero />
      <AboutPreview />
      <ImageCarousel />
      <FeaturedServices />
      <FeaturedAlbums />
      <Testimonials />
    </>
  );
}
