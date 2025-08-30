import Navbar from "@/components/common/Navbar";
import HeroSection from "@/pages/HeroSection";
import MessageSection from "@/pages/MessageSection";
import GridSection from "@/pages/GridSection";
import FaqSection from "@/pages/FaqSection";
import GetAccessSection from "@/pages/GetAccessSection";
import Footer from "@/components/common/Footer";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-auto bg-black">
      {/* Navbar */}
      <Navbar />

      {/* HeroSection */}
      <HeroSection />

      {/* MessageSection */}
      <MessageSection />

      {/* GridSection */}
      <GridSection />

      {/* FaqSection */}
      <FaqSection />

      {/* GetAccessSection */}
      <GetAccessSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
