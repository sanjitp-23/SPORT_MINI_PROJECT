import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SportsGrid } from "@/components/SportsGrid";
import { NewsSection } from "@/components/NewsSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <SportsGrid />
      <NewsSection />
      <CTASection />
      <Footer />
    </main>
  );
};

export default Index;