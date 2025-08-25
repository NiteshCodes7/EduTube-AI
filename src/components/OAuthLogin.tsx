"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const OauthLoginButton = () => {
  const router = useRouter();

  const handleGoogleLogin = () => {
    router.push("/api/google");
  };

  const handleGithubLogin = () => {
    router.push("/api/github");
  }

  return (
    <div className="flex justify-center items-center gap-5">
      <Button
        onClick={handleGoogleLogin}
        className="bg-gradient-to-br from-customPurple to-black hover:from-black hover:to-customPurple hover:scale-105 shadow-lg text-white px-4 py-2 rounded-full min-w-[40%] cursor-pointer"
      >
        <Image src={"/assets/google.png"} alt="Google" width={25} height={25}/>
      </Button>
      <span className="text-gray-700">|</span>
      <Button
        onClick={handleGithubLogin}
        className="bg-gradient-to-br from-customPurple to-black hover:from-black hover:to-customPurple hover:scale-105 shadow-lg text-white px-4 py-2 rounded-full min-w-[40%] cursor-pointer"
      >
        <Image src={"/assets/github.png"} alt="Github" width={30} height={30}/>
      </Button>
    </div>
  );
};
