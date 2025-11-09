import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Templates from "@/components/Templates";
import Pricing from "@/components/Pricing";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import InteractiveLighting from "@/components/InteractiveLighting";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <InteractiveLighting />
      <Navigation />
      <div className="relative z-10">
        <Hero />
        <Features />
        <Templates />
        <Pricing />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
