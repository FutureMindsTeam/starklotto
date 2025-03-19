"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Navbar } from "~~/components/Navbar"
import { AnimatedBackground } from "~~/components/animated-background"
import { FloatingCoins } from "~~/components/floating-coins"
import { SecurityStatus } from "~~/components/security-status"
import { Notification } from "~~/components/notification"
import {
  HeroSection,
  FeaturesSection,
  HowItWorksSection,
  FAQSection,
  CTASection,
} from "~~/components/sections"
import { useAccount } from "@starknet-react/core"
import Image from "next/image"
import Link from "next/link"
import { CustomConnectButton } from "~~/components/scaffold-stark/CustomConnectButton"

export default function Home() {
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, -150])
  const featuresY = useTransform(scrollY, [500, 1000], [0, -150])
  const howItWorksY = useTransform(scrollY, [1000, 1500], [0, -150])
  const faqY = useTransform(scrollY, [1500, 2000], [0, -150])

  const [showTicketSelector, setShowTicketSelector] = useState(false)
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([])
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null)
  const [jackpot, setJackpot] = useState(250000)
  const [showSecurityInfo, setShowSecurityInfo] = useState(false)

  const { status } = useAccount()
  const isConnected = status === "connected"

  // Set target date for countdown (24 hours from now)
  const targetDate = new Date()
  targetDate.setHours(targetDate.getHours() + 24)

  // Simulate jackpot increasing over time
  useEffect(() => {
    const interval = setInterval(() => {
      setJackpot((prev) => prev + Math.floor(Math.random() * 100))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handleBuyTicket = () => {
    setShowTicketSelector(true)
  }

  const handleSelectNumbers = (numbers: number[]) => {
    setSelectedNumbers(numbers)
  }

  const handlePurchase = (quantity: number, totalPrice: number) => {
    setNotification({
      message: `Successfully purchased ${quantity} ticket${quantity > 1 ? "s" : ""} for $${totalPrice} USDC!`,
      type: "success",
    })
    setShowTicketSelector(false)
  }

  const handleScroll = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      const offset = section.offsetTop - 100 // Adjust offset for header height
      window.scrollTo({
        top: offset,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground overflow-x-hidden">
      {/* Background Elements */}
      <AnimatedBackground />
      <FloatingCoins />

      {/* Navigation */}
      <Navbar onBuyTicket={handleBuyTicket} onNavigate={handleScroll} />

      {/* Security Status */}
      {/* <SecurityStatus /> */}

      {/* Notification */}
      {notification && (
        <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />
      )}

      <main className="flex-1 pt-16 relative z-10">
        <HeroSection
          heroY={heroY}
          jackpot={jackpot}
          showSecurityInfo={showSecurityInfo}
          showTicketSelector={showTicketSelector}
          selectedNumbers={selectedNumbers}
          targetDate={targetDate}
          onBuyTicket={handleBuyTicket}
          onSelectNumbers={handleSelectNumbers}
          onPurchase={handlePurchase}
          onToggleSecurityInfo={() => setShowSecurityInfo(!showSecurityInfo)}
        />

        <FeaturesSection featuresY={featuresY} />

        <HowItWorksSection howItWorksY={howItWorksY} />

        <FAQSection faqY={faqY} />

        <CTASection onBuyTicket={handleBuyTicket} />
      </main>
    </div>
  )
}
