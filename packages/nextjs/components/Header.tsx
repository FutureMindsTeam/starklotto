"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  WalletIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { CustomConnectButton } from "./scaffold-stark/CustomConnectButton";
import { useRouter } from "next/navigation";

const menuLinks = [
  { label: "Home", href: "/" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Play", href: "/play" },
  { label: "Prizes", href: "/prizes" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "About Us", href: "/about-us" },
];

export const Header = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleProfileClick = () => {
    router.push("/profile");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full fixed top-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-opacity-80 shadow-lg" : "bg-transparent"
      }`}
    >
      {/* Mobile and Tablet Navigation */}
      <nav className="lg:hidden flex items-center justify-between py-4 px-4 md:px-6">
        {/* Hamburger Menu Button */}
        <button
          onClick={toggleMenu}
          className="text-white focus:outline-none"
        >
          {isMenuOpen ? (
            <XMarkIcon className="h-6 w-6 md:h-8 md:w-8" />
          ) : (
            <Bars3Icon className="h-6 w-6 md:h-8 md:w-8" />
          )}
        </button>

        {/* Center Logo */}
        <Link href="/" passHref>
          <div className="flex items-center justify-center">
            <Image
              src="/Starklotto.png"
              alt="StarkLotto Logo"
              width={80}
              height={80}
              className="rounded-full w-24 h-24 md:w-24 md:h-24"
            />
          </div>
        </Link>

        {/* Wallet Icon */}
        <div className="scale-75 md:scale-90">
          <CustomConnectButton isHeader={true} />
        </div>
      </nav>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex container mx-auto items-center justify-between py-4 px-6 lg:px-8">
        <Link href="/" passHref>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image
              src="/Starklotto.png"
              alt="StarkLotto Logo"
              width={131}
              height={110}
              className="rounded-full"
            />
          </div>
        </Link>

        <ul className="flex space-x-4 lg:space-x-8">
          {menuLinks.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                passHref
                className="text-white text-sm lg:text-base hover:text-yellow-400 transition duration-300"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center space-x-4">
          <button className="mb-6 px-4 lg:px-6 py-2 lg:py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-full shadow-lg hover:opacity-90 transition">
            <CustomConnectButton isHeader={true} />
          </button>
          <button
            className="p-2 bg-transparent hover:bg-gray-700 rounded-full transition"
            onClick={handleProfileClick}
          >
            <UserIcon className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
          </button>
        </div>
      </nav>

      {/* Mobile and Tablet Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-gray-900 bg-opacity-90 shadow-lg">
          <ul className="flex flex-col items-center space-y-3 md:space-y-4 py-4">
            {menuLinks.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  passHref
                  onClick={toggleMenu}
                  className="text-white text-base md:text-lg hover:text-yellow-400 transition duration-300"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;