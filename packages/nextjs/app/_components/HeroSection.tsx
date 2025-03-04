"use client";

import React from "react";
import SocialLinks from "./SocialLinks";
import { useRouter } from "next/navigation";
import Image from "next/image";

function HeroSection() {
  const router = useRouter();

  const handlePlayNow = () => {
    router.push("/play");
  };

  
  const handleExplorePrizes = () => {
    router.push("/prizes");
  };

  return (
    <div className="grid md:grid-cols-2 gap-4 md:gap-8 items-center pt-16 md:pt-20">
      <div className="space-y-4 md:space-y-6 py-4 sm:py-8 md:py-12 lg:py-20 px-4 sm:px-8 md:px-12 lg:pl-24">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mt-0">
          WELCOME TO STARKLOTTO!
        </h1>
        <p className="text-xs sm:text-sm opacity-90 max-w-xl">
          THE MOST INNOVATIVE DECENTRALIZED LOTTERY ON THE STARKNET BLOCKCHAIN.
          PLAY, WIN, AND BE PART OF THE FUTURE OF DIGITAL LOTTERIES.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
          <button
            onClick={handlePlayNow}
            className="bg-white text-[#1a0505] px-4 sm:px-6 py-2 rounded-md font-semibold hover:bg-opacity-90 transition text-sm sm:text-base"
          >
            Play Now
          </button>
          <button
            onClick={handleExplorePrizes}
            className="border-2 border-white px-4 sm:px-6 py-2 rounded-md font-semibold hover:bg-white hover:text-[#1a0505] transition text-sm sm:text-base"
          >
            Explore Prizes
          </button>
        </div>
        <div className="pt-4 sm:pt-6 md:pt-8">
          <p className="mb-2 sm:mb-4 text-sm sm:text-base">
            Share Your Experience
          </p>
          <SocialLinks />
        </div>
      </div>

      {/* Image - responsive sizing and positioning */}
      <div className="relative flex justify-center md:justify-start px-4 sm:px-0">
        <Image
          src="/starklotto-main-home.png"
          alt="Lottery ticket with coins"
          className="rounded-[20px] sm:rounded-[30px] md:rounded-[50px] shadow-2xl mt-4 sm:mt-8 md:mt-16"
          width={606}
          height={404}
          priority
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
        />
      </div>
    </div>
  );
}

export default HeroSection;
