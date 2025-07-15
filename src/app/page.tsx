import { HomeHero } from "@/components/home/home-hero";
import { AboutPreview } from "@/components/home/about-preview";
import { FeaturedAlbums } from "@/components/home/featured-albums";
import { FlowingMenu } from "@/components/home/flowing-menu";
import { Testimonials } from "@/components/home/testimonials";
import { ImageCarousel } from "@/components/home/image-carousel";

export default function Home() {
  return (
    <>
      <HomeHero />
      <AboutPreview />
      <ImageCarousel />
      <FlowingMenu />
      <FeaturedAlbums />
      <Testimonials />
    </>
  );
}
