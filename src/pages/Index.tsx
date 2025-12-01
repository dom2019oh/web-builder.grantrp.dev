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
    <div className="min-h-screen relative overflow-x-hidden w-full">
      <Navigation />
      <div className="relative z-10">
        <Hero />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <Features />
          <Templates />
          <Pricing />
          <FAQ />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
