"use client";

import { useState, useEffect } from "react";
import { useScroll, useTransform } from "framer-motion";
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
import BuyTicketsModal from "~~/components/BuyTicketsModal";

export default function Home() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, -150]);
  const featuresY = useTransform(scrollY, [500, 1000], [0, -150]);
  const howItWorksY = useTransform(scrollY, [1000, 1500], [0, -150]);
  const faqY = useTransform(scrollY, [1500, 2000], [0, -150]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);
  const [jackpot, setJackpot] = useState(250000);
  const [showSecurityInfo, setShowSecurityInfo] = useState(false);

  const { status } = useAccount();

  // Set target date for countdown (24 hours from now)
  const targetDate = new Date();
  targetDate.setHours(targetDate.getHours() + 24);

  // Simulate jackpot increasing over time
  useEffect(() => {
    const interval = setInterval(() => {
      setJackpot((prev) => prev + Math.floor(Math.random() * 100));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleBuyTicket = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground overflow-x-hidden">
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

      {/* Notification */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

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

      <BuyTicketsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        jackpotAmount={`$${jackpot.toLocaleString()} USDC`}
        countdown={{
          days: "00",
          hours: "23",
          minutes: "59",
          seconds: "58",
        }}
        balance={1000}
        ticketPrice={10}
      />
    </div>
  );
}
