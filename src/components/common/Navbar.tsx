"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, DownloadCloud, LogOut, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuArrow } from "@radix-ui/react-dropdown-menu";
import { toast } from "sonner";

interface User {
  full_name?: string;
  email?: string;
  avatar?: string;
}

export default function Navbar({ handleDownloadSummary }: { handleDownloadSummary?: () => void }) {
  const router = useRouter();
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const checkAuth = async () => {
    try {
      const res = await axios.get("/api/check-auth", {
        withCredentials: true,
      });
      if (res.status === 200) {
        setLoggedIn(true);
        setUser(res.data.user);
      }
    } catch (error) {
      setLoggedIn(false);
      console.log("User not found", error);
    } finally {
      setLoading(false);
    }
  };

  const firstLetter = user?.full_name?.charAt(0).toUpperCase() ?? "";
  const lastLetter =
    user?.full_name?.split(" ")[1]?.charAt(0).toUpperCase() ?? "";
  const name = firstLetter + lastLetter || "U";

  useEffect(() => {
    checkAuth();
  }, []);

  const handleLogOut = async () => {
    try {
      const res = await axios.post(
        "/api/logout",
        {},
        { withCredentials: true }
      );
      if (res.status === 200) {
        setLoggedIn(false);
        setUser(null);
        setOpen(false);
        toast(res.data.message);
        router.push("/sign-in");
        router.refresh();
      }
    } catch (error) {
      toast("❌ Failed to logout");
      console.error(error);
    }
  };

  if (loading) return null;

  return (
    <section className="bg-transparent fixed top-0 left-0 w-full backdrop-blur-lg z-50 p-2">
      <div className="flex justify-between items-center px-4 mx-auto">
        {/* Logo Section */}
        <div className="flex items-center">
          {/* Desktop Logo */}
          <Image
            src="/assets/EdutubeLogoDekstop.png"
            alt="EduTube Desktop Logo"
            width={120}
            height={120}
            className="hidden md:block cursor-pointer"
            onClick={() => router.push("/")}
          />

          {/* Mobile Logo */}
          <div className="relative w-10 h-10 md:hidden cursor-pointer">
            <Image
              src="/assets/EdutubeLogoMobile.png"
              alt="EduTube Mobile Logo"
              fill
              className="object-contain"
              onClick={() => router.push("/")}
            />
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex justify-between items-center space-x-16">
          <Link
            href={"/"}
            className="text-white hover:text-blue-400 transition"
          >
            Home
          </Link>
          <Link
            href={"/#features"}
            className="text-white hover:text-blue-400 transition"
          >
            Features
          </Link>
          <Link
            href={"/#faq"}
            className="text-white hover:text-blue-400 transition"
          >
            FAQ
          </Link>
        </div>

        {/* Desktop Buttons */}
        {loggedIn && user ? (
          <div className="flex items-center gap-2.5">
            {pathname === "/dashboard" ? (
              <Button
                size="sm"
                className="hidden md:flex relative overflow-hidden bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-3 rounded-lg font-semibold shadow-lg hover:opacity-90 transition cursor-pointer"
                onClick={handleDownloadSummary}
              >
                <span className="flex justify-center items-center gap-2 relative z-10">
                  <DownloadCloud className="text-white" />Download PDF
                </span>
              </Button>
            ) : (
              <Button
                size="sm"
                className="hidden md:flex relative overflow-hidden bg-gradient-to-r from-[#5D2CA8] to-[#3B82F6] text-white px-4 py-3 rounded-lg font-semibold shadow-lg hover:opacity-90 transition cursor-pointer"
                onClick={() => router.push("/dashboard")}
              >
                <span className="flex justify-center items-center gap-2 relative z-10">
                  Go to App <ArrowRight />
                </span>
                <span className="absolute top-0 left-[-100%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></span>
              </Button>
            )}

            <div className="hidden md:flex relative">
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  {user?.avatar ? (
                    <Image
                      src={user.avatar}
                      alt="user"
                      width={32}
                      height={32}
                      className="rounded-full cursor-pointer"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-9 h-9 bg-gradient-to-r from-customPurple to-[#3B82F6] rounded-full text-white cursor-pointer">
                      {name}
                    </div>
                  )}
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  side="bottom"
                  align="end"
                  sideOffset={8}
                  className="w-56"
                >
                  <DropdownMenuArrow className="fill-white" />
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {user?.full_name && (
                    <DropdownMenuItem>{user?.full_name}</DropdownMenuItem>
                  )}
                  <DropdownMenuItem>{user?.email}</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant={"destructive"}
                    onClick={handleLogOut}
                    className="text-red-600 cursor-pointer hover:bg-rose-50"
                  >
                    <LogOut className="w-4 h-4 mr-2" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ) : (
          <div className="hidden md:flex gap-3">
            <Button
              size="sm"
              variant="outline"
              className="cursor-pointer"
              onClick={() => router.push("/sign-in")}
            >
              Login
            </Button>
            <Button
              size="sm"
              className="relative overflow-hidden bg-gradient-to-r from-[#5D2CA8] to-[#3B82F6] text-white px-4 py-3 rounded-lg font-semibold shadow-lg hover:opacity-90 transition cursor-pointer"
              onClick={() => router.push("/sign-up")}
            >
              <span className="relative z-10">Sign Up</span>
              <span className="absolute top-0 left-[-100%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></span>
            </Button>
          </div>
        )}

        {/* Mobile Hamburger */}
        <div className="md:hidden p-3">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Menu className="text-white w-8 h-8 cursor-pointer" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-transparent backdrop-blur-2xl text-white w-[80%] sm:w-[60%] p-6 flex flex-col"
            >
              {/* Header with Logo + Close */}
              <SheetHeader className="flex justify-between items-center border-b border-white/20 pb-4">
                <Image
                  src="/assets/EdutubeLogoDekstop.png"
                  alt="Logo"
                  width={40}
                  height={40}
                  className="cursor-pointer w-[100px]"
                  onClick={() => router.push("/")}
                />
                <SheetClose asChild />
              </SheetHeader>

              {/* Mobile Nav Links */}
              {loggedIn && user ? (
                <nav className="flex flex-col gap-6 mt-6 text-lg font-medium">
                  <SheetClose asChild>
                    <Link href="/">Home</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/#features">Features</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/#pricing">Pricing</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/#faq">FAQ</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      size="sm"
                      className="relative overflow-hidden bg-gradient-to-r from-[#5D2CA8] to-[#3B82F6] text-white px-4 py-3 rounded-lg font-semibold shadow-lg border-none outline-none hover:opacity-90 transition cursor-pointer w-full mt-2"
                      onClick={() => router.push("/dashboard")}
                    >
                      <span className="flex justify-center items-center gap-2 relative z-10">
                        Go to App <ArrowRight />
                      </span>
                      <span className="absolute top-0 left-[-100%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></span>
                    </Button>
                  </SheetClose>
                </nav>
              ) : (
                <nav className="flex flex-col gap-6 mt-6 text-lg font-medium">
                  <SheetClose asChild>
                    <Link href="/">Home</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/#features">Features</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/#pricing">Pricing</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/#faq">FAQ</Link>
                  </SheetClose>
                </nav>
              )}

              {/* Divider */}
              <div className="h-px bg-white/20 my-6" />

              {/* Mobile Buttons */}
              {!loggedIn ? (
                <div className="flex flex-col gap-4">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full text-black cursor-pointer"
                    onClick={() => router.push("/sign-in")}
                  >
                    Login
                  </Button>
                  <Button
                    size="sm"
                    className="relative overflow-hidden bg-gradient-to-r from-[#5D2CA8] to-[#3B82F6] text-white px-4 py-3 rounded-lg font-semibold shadow-lg hover:opacity-90 transition cursor-pointer"
                    onClick={() => router.push("/sign-up")}
                  >
                    <span className="relative z-10">Sign Up</span>
                    <span className="absolute top-0 left-[-100%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></span>
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col justify-end h-full">
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-4 items-center">
                      {user && (
                        <>
                          {user?.avatar ? (
                            <Image
                              src={user.avatar}
                              alt="user"
                              width={25}
                              height={25}
                              className="rounded-full"
                            />
                          ) : (
                            <div className="text-sm rounded-full w-9 h-9 flex items-center justify-center bg-gradient-to-r from-[#5D2CA8] to-[#3B82F6] text-white">
                              {name ?? "U"}
                            </div>
                          )}
                          <div className="flex flex-col">
                            {user?.full_name && (
                              <p className="text-gray-400 text-sm">
                                {user.full_name}
                              </p>
                            )}
                            <p className="text-gray-400 text-sm">
                              {user?.email}
                            </p>
                          </div>
                        </>
                      )}
                    </div>

                    <Button
                      size="sm"
                      variant="destructive"
                      className="w-full"
                      onClick={handleLogOut}
                    >
                      <LogOut className="mr-2" /> Logout
                    </Button>
                  </div>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </section>
  );
};
