import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Statistics } from "@/components/landing/statistics";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Testimonials } from "@/components/landing/testimonials";
import { FAQ } from "@/components/landing/faq";
import { CTA } from "@/components/landing/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <Statistics />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
