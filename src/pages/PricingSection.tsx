"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import axios from "axios";

export type Plan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  razorpayPlanId: string;
  highlight?: boolean;
};

export const pricingPlans: Plan[] = [
  {
    name: "Free",
    price: "₹0",
    description: "Get started with basic video summarization.",
    razorpayPlanId: "plan_free",
    features: [
      "Summarize up to 3 videos/month",
      "Supports videos less than 20 minutes",
      "Basic AI summaries (short text only)",
      "Export to Text only",
      "No history saved",
    ],
  },
  {
    name: "Pro",
    price: "₹99",
    description: "Best for students who need unlimited notes.",
    razorpayPlanId: "plan_starter_12345",
    features: [
      "Unlimited video summaries",
      "Supports videos up to 1 hour",
      "Full transcript + detailed summary",
      "Export to PDF / Text",
      "Save your summary history",
      "Standard response speed",
    ],
  },
  {
    name: "Premium",
    price: "₹199",
    description: "Perfect for creators & professionals.",
    razorpayPlanId: "plan_pro_67890",
    highlight: true,
    features: [
      "Unlimited videos Summaries",
      "Supports videos up to 5 hour",
      "Export to Text/PDF",
      "Multilingual support (English, Hindi, Bengali, etc.)",
      "Custom summary length (short, medium, detailed)",
      "Priority support (faster replies, bug fixes)",
      "Early access to new features",
      "Save your summary history",
      "High response speed",
    ],
  },
];

const PricingSection = () => {
  const router = useRouter();
  const[loggedIn, setLoggedIn] = useState(false);

  const checkAuth = async () => {
    try {
      const res = await axios.get("/api/check-auth", {
        withCredentials: true,
      });
      if (res.status === 200) {
        setLoggedIn(true);
      }
    } catch (error) {
      console.log("User not found", error);
      router.push("sign-up");
    }
  }

  function handleSubscribe(razorpayPlanId: string): void {
    checkAuth();
    if(razorpayPlanId === "plan_free"){
      if(!loggedIn) router.push("/dashboard");
      else router.push("/sign-in");
    }else{
      //Api call
    }
  }

  return (
    <section
      id="pricing"
      className="flex flex-col justify-center items-center h-auto overflow-auto"
      style={{
        background:
          "linear-gradient(to bottom, #5D2CA8 0%, #4A2390 40%, #3E1F73 75%, #2B1452 100%)",
      }}
    >
      <div className="text-center mb-10 space-y-5 px-4 sm:px-6">
        {/* Badge */}
        <div className="bg-black/10 border border-black/10 rounded-lg px-2 sm:px-3 py-1 sm:py-2 inline-flex items-center">
          <Badge className="text-white bg-transparent text-[10px] sm:text-xs md:text-[13px] font-inter font-medium">
            Boost your productivity
          </Badge>
        </div>

        {/* Heading */}
        <h2 className="text-white font-dm-sans font-semibold text-lg sm:text-xl md:text-[54px] leading-[28px] sm:leading-[36px] md:leading-[60px] tracking-[-1px] sm:tracking-[-2px] md:tracking-[-3.24px] md:max-w-[540px] mx-auto">
          A more effective way to track progress
        </h2>

        {/* Paragraph */}
        <p className="text-white/50 font-inter text-xs sm:text-sm md:text-lg leading-[20px] sm:leading-[24px] md:leading-[31px] tracking-[-0.5px] sm:tracking-[-0.6px] md:tracking-[-0.792px] max-w-full sm:max-w-[400px] md:max-w-[535px] mx-auto">
          Effortlessly turn your ideas into a fully functional, responsive,
          no-code SaaS website in just minutes with the set of free components
          for Framer.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 md:mb-40 lg:items-end">
        {pricingPlans.map((plan) => (
          <Card
            key={plan.name}
            className={`p-2 w-xs md:p-6 md:w-sm ${
              plan.name === "Pro"
                ? "bg-black text-white"
                : "bg-white text-black"
            } ${
              plan.name === "Free"
                ? "h-[500px]"
                : plan.name === "Pro"
                ? "h-[550px] md:h-[500px] lg:h-[600px]"
                : "h-[700px]"
            }`}
          >
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                {plan.name === "Pro" ? (
                  <Badge className="bg-gradient-to-r from-[#DD7DFF] via-[#E1CD86] via-29% via-[#8BCB92] via-51% via-[#71C2EF] via-76% to-[#3BFFFF] bg-clip-text text-transparent border border-gray-700 p-2 animate-shimmer">
                    Most Popular
                  </Badge>
                ) : null}
              </div>

              <p className="flex items-baseline gap-1 text-3xl font-bold mt-2">
                {plan.price}
                <span className="text-gray-400 text-xs">/month</span>
              </p>
              <p className="text-gray-400 text-sm mt-1">{plan.description}</p>
            </CardHeader>
            <CardContent>
              <Button
                className={`w-full cursor-pointer mb-5 ${
                  plan.name === "Pro"
                    ? "bg-white text-black hover:bg-gray-200"
                    : "bg-black text-white"
                }`}
                onClick={() => handleSubscribe(plan.razorpayPlanId)}
              >
                {plan.price === "₹0" ? "Get Started" : "Subscribe"}
              </Button>

              <ul className="text-left space-y-2 my-4">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    {feature.startsWith("No") ? (
                      <span className="text-red-500">
                        <X />
                      </span>
                    ) : (
                      <span className="text-green-600">
                        <Check />
                      </span>
                    )}

                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
