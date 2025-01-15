import { Metadata } from "next";
import HeroSection from "@/components/sections/hero-section";
import AboutSection from "@/components/sections/about-section";
import PortfolioSection from "@/components/sections/portfolio-section";
// import SkillsSection from "@/components/sections/skills-section";
import BlogSection from "@/components/sections/blog-section";
import ContactSection from "@/components/sections/contact-section";
// import TestimonialsSection from "@/components/sections/testimonials-section";
// import CertifSection from "@/components/sections/certif-section";

export const metadata: Metadata = {
  title: "Portfolio - Home",
  description: "Welcome to my professional portfolio showcasing my work and skills",
};

export default async function HomePage() {
  return (
    <main className="flex flex-col items-center justify-between pt-16">
      <HeroSection />
      <AboutSection />
      <PortfolioSection />
      {/* <CertifSection/> */}
      {/* <SkillsSection /> */}
      {/* <TestimonialsSection /> */}
      <BlogSection />
      <ContactSection />
    </main>
  );
}
