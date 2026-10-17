"use client";

import { FaqSection } from "@/components/home/faq-section";
import { GallerySection } from "@/components/home/gallery-section";
import { HeroSection } from "@/components/home/hero-section";
import { LinkedInSection } from "@/components/home/linkedin-section";
import { ServicesSection } from "@/components/home/services-section";
import { TrustedMarquee } from "@/components/home/trusted-marquee";

export function HomePage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-page)", transition: "background 0.3s ease" }}>
      <HeroSection />
      <TrustedMarquee />
      <ServicesSection />
      <GallerySection />
      <LinkedInSection />
      <FaqSection />
    </div>
  );
}
