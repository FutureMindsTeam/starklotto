"use client";

import { motion } from "framer-motion";
import { Shield, Lock, ChevronRight, Check } from "lucide-react";
import { Button } from "~~/components/ui/button";
import { SecurityBadge } from "~~/components/security-badge";
import { GlowingButton } from "~~/components/glowing-button";
import { CountdownTimer } from "~~/components/countdown-timer";
import { NumberSelector } from "~~/components/number-selector";
import { TicketPriceCalculator } from "~~/components/ticket-price-calculator";
import { LiveActivityFeed } from "~~/components/live-activity-feed";
import BuyTicketsModal  from "../BuyTicketsModal";

interface HeroSectionProps {
  heroY: any;
  jackpot: number;
  showSecurityInfo: boolean;
  showTicketSelector: boolean;
  selectedNumbers: number[];
  targetDate: Date;
  onBuyTicket: () => void;
  onSelectNumbers: (numbers: number[]) => void;
  onPurchase: (quantity: number, totalPrice: number) => void;
  onToggleSecurityInfo: () => void;
}

export function HeroSection({
  heroY,
  jackpot,
  showSecurityInfo,
  showTicketSelector,
  selectedNumbers,
  targetDate,
  onBuyTicket,
  onSelectNumbers,
  onPurchase,
  onToggleSecurityInfo,
}: HeroSectionProps) {
  return (
    <motion.section
      id="hero"
      style={{ y: heroY }}
      className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden"
    >
      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2 mb-4">
                <SecurityBadge type="verified" />
                <SecurityBadge type="secure" />
                <SecurityBadge type="encrypted" />
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-violet-500 to-indigo-600">
                The Most Secure and Exciting Web3 Lottery
              </h1>
              <p className="max-w-[600px] text-gray-300 md:text-xl">
                Play, win, and collect prizes instantly with blockchain
                security. Transparent, fair, and fully decentralized.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <GlowingButton
                onClick={onBuyTicket}
                glowColor="rgba(139, 92, 246, 0.6)"
              >
                Play Now
              </GlowingButton>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/10 hover:bg-white/5 hover:border-white/20 text-white"
                >
                  How It Works
                </Button>
              </motion.div>
            </div>

            {/* Security Info Button */}
            <motion.button
              className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors mt-4 w-fit"
              onClick={onToggleSecurityInfo}
              whileHover={{ x: 5 }}
            >
              <Shield className="h-4 w-4" />
              <span>View our security measures</span>
              <ChevronRight className="h-4 w-4" />
            </motion.button>

            {/* Security Info Panel */}
            <motion.div
              className={`mt-4 p-4 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10 ${
                showSecurityInfo ? "block" : "hidden"
              }`}
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: showSecurityInfo ? 1 : 0,
                height: showSecurityInfo ? "auto" : 0,
              }}
              exit={{ opacity: 0, height: 0 }}
            >
              <h3 className="text-lg font-medium mb-2">
                Our Security Measures
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Smart contracts audited by CertiK and Hacken</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Chainlink VRF for provably fair randomness</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>
                    Multi-signature treasury with time-locked transactions
                  </span>
                </li>
              </ul>
            </motion.div>
          </motion.div>

          <div className="flex flex-col gap-6">
            <motion.div
              className="relative flex items-center justify-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-indigo-600/30 rounded-full blur-3xl opacity-20 animate-pulse"></div>
              <div className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="absolute -top-2 -right-2">
                  <div className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full border border-green-500/30 flex items-center gap-1">
                    <Lock className="h-3 w-3" />
                    <span>Secure</span>
                  </div>
                </div>
                <div className="space-y-2 text-center mb-4">
                  <h3 className="text-xl font-bold">Next Draw</h3>
                  <motion.div
                    className="text-3xl font-bold text-accent"
                    key={jackpot}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    ${jackpot.toLocaleString()} USDC
                  </motion.div>
                  <CountdownTimer targetDate={targetDate} />
                </div>

                {showTicketSelector ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">
                        Select your lucky numbers:
                      </h4>
                  
                      <NumberSelector
                        maxNumbers={20}
                        maxSelections={5}
                        onSelectNumbers={onSelectNumbers}
                      />
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <TicketPriceCalculator
                        basePrice={5}
                        maxTickets={10}
                        onPurchase={onPurchase}
                      />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="grid grid-cols-5 gap-2 mb-4">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <motion.div
                          key={num}
                          className="aspect-square flex items-center justify-center bg-gradient-to-br from-amber-400 to-amber-600 rounded-full text-white font-bold text-lg"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {num}
                        </motion.div>
                      ))}
                    </div>
                    <GlowingButton onClick={onBuyTicket} className="w-full">
                      Buy Ticket
                    </GlowingButton>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Live Activity Feed */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="hidden md:block"
            >
              <LiveActivityFeed />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
