import { Play, Star, Zap } from "lucide-react";
import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-300/30 animate-in fade-in slide-in-from-bottom-6">

      {/* Left Side: Gradient branding */}
      <div className="hidden md:flex md:flex-col md:w-1/2 bg-gradient-to-br from-customPurple to-black text-white p-10 justify-center space-y-6 relative transition-all duration-300 rounded-r-4xl h-screen">
        <div className="flex flex-col items-center text-center space-y-2">
          <Image
            src={"/assets/EdutubeLogoDekstop.png"}
            alt="EduTube Logo"
            width={120}
            height={120}
            className="mb-10 w-[220px] h-[100px] shake-hover"
          />
          <h1 className="text-3xl lg:text-4xl font-bold leading-tight">Create Youtube Video Summaries just in one click</h1>
          <p className="text-base text-white/90 max-w-sm">Get mind-maps of vidoes in seconds.</p>
        </div>

        <div className="space-y-6 mt-10">
          <FeatureItem icon={<Zap className="text-black" />} title="Instant Conversion" desc="Upload any Youtube video and get summaries in seconds." />
          <FeatureItem icon={<Play className="text-black" />} title="Reel Format" desc="Get mind-maps helps easier" />
          <FeatureItem icon={<Star className="text-black" />} title="Smart Insights" desc="Import the summary" />
        </div>
      </div>

      {/* Right Side: Auth Form */}
      <div className="flex flex-col w-full md:w-1/2 justify-center items-center p-6 sm:p-8 md:h-screen" style={{
          background: "linear-gradient(to bottom, #000000 0%, #000000 30%, #5D2CA8 100%)"
      }}>
        <Image src={"/assets/EdutubeLogoMobile.png"} alt="Edutube logo" width={100} height={100} className="block md:hidden m-5 w-[100px] h-[100px]"/>
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex space-x-4 items-start">
      <div className="bg-gray-50 bg-opacity-20 p-2 rounded-md">
        {icon}
      </div>
      <div>
        <p className="font-semibold text-lg">{title}</p>
        <p className="text-sm text-white/90">{desc}</p>
      </div>
    </div>
  );
}
