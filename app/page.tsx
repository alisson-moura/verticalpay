import { Benefits } from "../components/landpage/benefits";
import { Faq } from "../components/landpage/faq";
import { Footer } from "../components/landpage/footer";
import { FooterCTA } from "../components/landpage/footer-cta";
import { Header } from "../components/landpage/header";
import { Hero } from "../components/landpage/hero";
import { MachinePricing } from "../components/landpage/machine-pricing";
import { PwFeature } from "../components/landpage/pw-feature";
import { getPricingData } from "./actions/pricing";

export default async function Home() {
  const pricingData = await getPricingData();
  const taxData = pricingData?.taxes || [];
  const machines = pricingData?.machines || [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "VerticalPay",
    url: "https://verticalpay.com.br",
    logo: "https://verticalpay.com.br/logo.png",
    description:
      "Soluções em pagamentos e máquinas de cartão com as melhores taxas do mercado.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+55-11-99999-9999", // Replace with actual number if available
      contactType: "customer service",
      areaServed: "BR",
      availableLanguage: "Portuguese",
    },
    sameAs: [
      "https://www.instagram.com/verticalpay", // Replace with actual social links
      "https://www.facebook.com/verticalpay",
      "https://www.linkedin.com/company/verticalpay",
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <Hero taxData={taxData} />
      <Benefits />
      <PwFeature />
      <MachinePricing machines={machines} />
      <Faq />
      <FooterCTA />
      <Footer />
    </div>
  );
}
