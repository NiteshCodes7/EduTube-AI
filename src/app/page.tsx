import Navbar from "@/components/common/Navbar";
import HeroSection from "@/pages/HeroSection";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-[100vh] overflow-auto">
      {/* Navbar */}
      <Navbar />

      {/* HeroSection */}
      <HeroSection />
    </div>
  );
}
