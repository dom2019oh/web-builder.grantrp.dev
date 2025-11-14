import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Templates from "@/components/Templates";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import InteractiveLighting from "@/components/InteractiveLighting";
import FloatingUIElements from "@/components/FloatingUIElements";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <InteractiveLighting />
      <FloatingUIElements />
      <Navigation />
      <div className="relative z-10">
        <Hero />
        <Features />
        <Templates />
        <Pricing />
        <FAQ />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
