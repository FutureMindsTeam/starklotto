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
import BuyTicketsModal from "~~/components/BuyTicketsModal";
import { LastDrawResults } from "~~/components/LastDrawResults";

export default function Home() {
  const router = useRouter();
  const { scrollY } = useScroll();
  const { status } = useAccount();

  const heroY = useTransform(scrollY, [0, 500], [0, -100]);
  const featuresY = useTransform(scrollY, [0, 1000], [0, -50]);
  const howItWorksY = useTransform(scrollY, [0, 1500], [0, -50]);
  const faqY = useTransform(scrollY, [0, 2000], [0, -50]);

  const [showSecurityInfo, setShowSecurityInfo] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  const jackpot = 250295;
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 1);

  const handleBuyTicket = () => {
    router.push("/buy-tickets");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#111827] to-[#0f172a] text-white">
      <AnimatedBackground />
      <FloatingCoins />

      <Navbar onBuyTicket={handleBuyTicket} onNavigate={handleScroll} />

      <main className="flex-1 pt-16 relative z-10">
        <HeroSection
          heroY={heroY}
          jackpot={jackpot}
          showSecurityInfo={showSecurityInfo}
          targetDate={targetDate}
          onBuyTicket={handleBuyTicket}
          onToggleSecurityInfo={() => setShowSecurityInfo(!showSecurityInfo)}
          showTicketSelector={showTicketSelector}
          selectedNumbers={selectedNumbers}
          onSelectNumbers={handleSelectNumbers}
          onPurchase={handlePurchase}
        />

        <div className="container mx-auto px-4 relative z-20">
          <LastDrawResults />
        </div>

        <FeaturesSection featuresY={featuresY} />
        <HowItWorksSection howItWorksY={howItWorksY} />
        <FAQSection faqY={faqY} />
        <CTASection onBuyTicket={handleBuyTicket} />
      </main>
    </div>
  );
}
