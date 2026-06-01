import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import TrustStrip from '@/components/landing/TrustStrip';
import ProblemSection from '@/components/landing/ProblemSection';
import ServicesSection from '@/components/landing/ServicesSection';
import PortfolioSection from '@/components/landing/PortfolioSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import AboutSection from '@/components/landing/AboutSection';
import FinalCTASection from '@/components/landing/FinalCTASection';
import ContactSection from '@/components/landing/ContactSection';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <main>
        <HeroSection />
        <TrustStrip />
        <ProblemSection />
        <ServicesSection />
        <PortfolioSection />
        <HowItWorksSection />
        <AboutSection />
        <FinalCTASection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}