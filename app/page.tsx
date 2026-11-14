import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { Principles } from "@/components/sections/Principles";
import { ServiceCarousel } from "@/components/sections/ServiceCarousel";
import { Steps } from "@/components/sections/Steps";
import { VisionMission } from "@/components/sections/VisionMission";
import { WhyUs } from "@/components/sections/WhyUs";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Principles />
      <Intro />
      <ServiceCarousel />
      <WhyUs />
      <Steps />
      <VisionMission />
      <Faq />
      <FinalCta />
    </>
  );
}
