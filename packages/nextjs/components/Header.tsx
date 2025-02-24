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

  // Detectar scroll para cambiar el fondo
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
        isScrolled ? "bg-gray-900 bg-opacity-80 shadow-lg" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between py-4 px-6 md:px-8">
        {/* Logo */}
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

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8">
          {menuLinks.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                passHref
                className="text-white hover:text-yellow-400 transition duration-300"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Icons */}
        <div className="hidden md:flex items-center space-x-4">
          {/*           <button className="p-2 bg-transparent hover:bg-gray-700 rounded-full transition">
            <CustomConnectButton isHeader={true} />
          </button> */}
          <button className="mb-6 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-full shadow-lg hover:opacity-90 transition">
            <CustomConnectButton isHeader={true} />
          </button>
          <button
            className="p-2 bg-transparent hover:bg-gray-700 rounded-full transition"
            onClick={handleProfileClick}
          >
            <UserIcon className="h-6 w-6 text-white" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-white focus:outline-none"
        >
          {isMenuOpen ? (
            <XMarkIcon className="h-8 w-8" />
          ) : (
            <Bars3Icon className="h-8 w-8" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 bg-opacity-90 shadow-lg">
          <ul className="flex flex-col items-center space-y-4 py-4">
            {menuLinks.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  passHref
                  onClick={toggleMenu}
                  className="text-white text-lg hover:text-yellow-400 transition duration-300"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Icons for Mobile */}
          <div className="flex justify-center space-x-6 py-4">
            <button className="p-2 bg-transparent hover:bg-gray-700 rounded-full transition">
              <WalletIcon className="h-6 w-6 text-white" />
            </button>
            <button className="p-2 bg-transparent hover:bg-gray-700 rounded-full transition">
              <UserIcon className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
