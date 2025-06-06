"use client";

import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "~~/components/Navbar";
import { AnimatedBackground } from "~~/components/animated-background";
import { FloatingCoins } from "~~/components/floating-coins";
import { Notification } from "~~/components/notification";
import {
  HeroSection,
  FeaturesSection,
  HowItWorksSection,
  FAQSection,
  CTASection,
} from "~~/components/sections";
import { useAccount } from "@starknet-react/core";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { scrollY } = useScroll();
  const [showSecurityInfo, setShowSecurityInfo] = useState(false);

  // Mock data - in real app, this would come from an API
  const jackpot = 250295;
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 1);

  // Scroll-based animations
  const heroY = useTransform(scrollY, [0, 500], [0, -100]);
  const featuresY = useTransform(scrollY, [0, 1000], [0, -50]);
  const howItWorksY = useTransform(scrollY, [0, 1500], [0, -50]);
  const faqY = useTransform(scrollY, [0, 2000], [0, -50]);

  const { status } = useAccount();

  const handleBuyTicket = () => {
    router.push("/buy-tickets");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#111827] to-[#0f172a] text-white">
      {/* Background Elements */}
      <AnimatedBackground />
      <FloatingCoins />

      {/* Navigation */}
      <Navbar
        onBuyTicket={handleBuyTicket}
        onNavigate={function (sectionId: string): void {
          throw new Error("Function not implemented.");
        }}
      />

      <main className="flex-1 pt-16 relative z-10">
        <HeroSection
          heroY={heroY}
          jackpot={jackpot}
          showSecurityInfo={showSecurityInfo}
          targetDate={targetDate}
          onBuyTicket={handleBuyTicket}
          onToggleSecurityInfo={() => setShowSecurityInfo(!showSecurityInfo)}
          showTicketSelector={false}
          selectedNumbers={[]}
          onSelectNumbers={function (numbers: number[]): void {
            throw new Error("Function not implemented.");
          }}
          onPurchase={function (quantity: number, totalPrice: number): void {
            throw new Error("Function not implemented.");
          }}
        />

        <FeaturesSection featuresY={featuresY} />
        <HowItWorksSection howItWorksY={howItWorksY} />
        <FAQSection faqY={faqY} />
        <CTASection onBuyTicket={handleBuyTicket} />
      </main>
    </div>
  );
}
