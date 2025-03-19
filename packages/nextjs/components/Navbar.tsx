"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Shield, Info, Trophy, User, HomeIcon, Menu, X } from "lucide-react";
import { CustomConnectButton } from "./scaffold-stark/CustomConnectButton";
import { GlowingButton } from "./glowing-button";
import { useAccount } from "@starknet-react/core";

interface NavbarProps {
  onBuyTicket: () => void;
  onNavigate: (sectionId: string) => void;
}

const menuItems = [
  { id: "hero", label: "Home", icon: HomeIcon },
  { id: "features", label: "Features", icon: Shield },
  { id: "how-it-works", label: "How It Works", icon: Info },
  { id: "faq", label: "FAQ", icon: Trophy },
];

const PlayNowButton = ({ onClick }: { onClick: () => void }) => (
  <motion.button
    onClick={onClick}
    className="relative group"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    {/* Animated background glow */}
    <div className="absolute -inset-1 bg-gradient-to-r from-[#8A3FFC] via-[#00FFA3] to-[#9B51E0] rounded-lg blur-lg group-hover:blur-xl opacity-70 group-hover:opacity-100 transition-all duration-500 animate-gradient-xy"></div>

    {/* Button content */}
    <div className="relative px-4 py-2 bg-black rounded-lg flex items-center gap-2 border border-[#00FFA3]/30">
      <div className="absolute inset-0 bg-gradient-to-r from-[#8A3FFC]/20 to-[#00FFA3]/20 rounded-lg"></div>

      <span className="font-semibold text-sm bg-gradient-to-r from-[#00FFA3] to-white bg-clip-text text-transparent">
        Play Now
      </span>

      <motion.div
        className="relative"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        <span className="text-base">🎲</span>
        <div className="absolute -inset-1 bg-[#00FFA3] rounded-full blur-md opacity-50 animate-pulse"></div>
      </motion.div>
    </div>
  </motion.button>
);

export function Navbar({ onBuyTicket, onNavigate }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { status } = useAccount();
  const isConnected = status === "connected";

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Gradient Border */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#00FFA3]/50 to-transparent"></div>

        {/* Navbar Content */}
        <div className="bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-14">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2 group">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-[#00FFA3]/20 rounded-full blur-md group-hover:blur-lg transition-all"></div>
                  <Image
                    src="/Starklotto.png"
                    alt="StarkLotto Logo"
                    width={32}
                    height={32}
                    className="rounded-full relative z-10"
                  />
                </motion.div>
                <motion.span
                  className="text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00FFA3] to-white"
                  whileHover={{ scale: 1.05 }}
                >
                  StarkLotto
                </motion.span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-8">
                {menuItems.slice(0, 2).map(({ id, label, icon: Icon }) => (
                  <motion.button
                    key={id}
                    onClick={() => onNavigate(id)}
                    className="text-white/80 hover:text-white transition-colors flex items-center gap-1.5 group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="h-3.5 w-3.5 text-[#00FFA3] group-hover:text-[#00FFA3] transition-colors" />
                    <span className="relative text-sm">
                      {label}
                      <span className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-[#00FFA3]/0 via-[#00FFA3]/70 to-[#00FFA3]/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    </span>
                  </motion.button>
                ))}

                {isConnected && <PlayNowButton onClick={onBuyTicket} />}

                {menuItems.slice(2).map(({ id, label, icon: Icon }) => (
                  <motion.button
                    key={id}
                    onClick={() => onNavigate(id)}
                    className="text-white/80 hover:text-white transition-colors flex items-center gap-1.5 group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="h-3.5 w-3.5 text-[#00FFA3] group-hover:text-[#00FFA3] transition-colors" />
                    <span className="relative text-sm">
                      {label}
                      <span className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-[#00FFA3]/0 via-[#00FFA3]/70 to-[#00FFA3]/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Right Side Actions */}
              <div className="flex items-center gap-3">
                <CustomConnectButton />
                {isConnected && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-[#00FFA3]/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                    <Link href="/profile">
                      <Image
                        src="/profile-icon.png"
                        alt="Profile"
                        width={28}
                        height={28}
                        className="rounded-full border border-[#00FFA3]/30 hover:border-[#00FFA3]/60 transition-colors"
                      />
                    </Link>
                  </motion.div>
                )}

                {/* Mobile Menu Button */}
                <motion.button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden flex items-center justify-center w-8 h-8 relative group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 bg-[#00FFA3]/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  {isMenuOpen ? (
                    <X className="h-5 w-5 text-[#00FFA3] group-hover:text-[#00FFA3] transition-colors relative z-10" />
                  ) : (
                    <Menu className="h-5 w-5 text-[#00FFA3] group-hover:text-[#00FFA3] transition-colors relative z-10" />
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-x-0 top-[57px] z-40 md:hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="bg-black/95 backdrop-blur-md border-t border-[#00FFA3]/20">
              <div className="container mx-auto px-4">
                <div className="py-4 space-y-3">
                  {menuItems.map(({ id, label, icon: Icon }) => (
                    <motion.button
                      key={id}
                      onClick={() => {
                        onNavigate(id);
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-white/80 hover:text-white hover:bg-[#00FFA3]/10 rounded-lg transition-colors group text-sm"
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className="h-4 w-4 text-[#00FFA3] group-hover:text-[#00FFA3] transition-colors" />
                      {label}
                    </motion.button>
                  ))}
                  {isConnected && (
                    <div className="px-4">
                      <PlayNowButton onClick={onBuyTicket} />
                    </div>
                  )}
                  <div className="px-4 pt-3 border-t border-[#00FFA3]/20">
                    <CustomConnectButton />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
