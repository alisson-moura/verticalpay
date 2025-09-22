import { Benefits } from "../components/landpage/benefits";
import { Faq } from "../components/landpage/faq";
import { Footer } from "../components/landpage/footer";
import { FooterCTA } from "../components/landpage/footer-cta";
import { Header } from "../components/landpage/header";
import { Hero } from "../components/landpage/hero";
import { MachinePricing } from "../components/landpage/machine-pricing";
import { PwFeature } from "../components/landpage/pw-feature";
import Testimonial from "../components/landpage/testimonial";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Benefits />
      <PwFeature />
      <MachinePricing />
      <Faq />
      <FooterCTA />
      <Footer />
    </div>
  );
}
