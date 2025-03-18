"use client";

import React from "react";

import SocialLinks from "./SocialLinks";
import { useRouter } from "next/navigation";
import Image from "next/image";

function Header() {
  const router = useRouter();

  const handlePlayNow = () => {
    router.push("/play");
  };

  const handleExplorePrizes = () => {
    router.push("/prizes");
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div className="space-y-6 py-20 pl-24">
        <h1 className="text-5xl font-bold leading-tight mt-0">
          WELCOME TO STARKLOTTO!
        </h1>
        <p className="text-sm opacity-90 max-w-xl">
          THE MOST INNOVATIVE DECENTRALIZED LOTTERY ON THE STARKNET BLOCKCHAIN.
          PLAY, WIN, AND BE PART OF THE FUTURE OF DIGITAL LOTTERIES.
        </p>
        <div className="flex gap-4 pt-4">
          <button
            onClick={handlePlayNow}
            className="bg-white text-[#1a0505] px-6 py-2 rounded-md font-semibold hover:bg-opacity-90 transition"
          >
            Play Now
          </button>
          <button
            onClick={handleExplorePrizes}
            className="border-2 border-white px-6 py-2 rounded-md font-semibold hover:bg-white hover:text-[#1a0505] transition"
          >
            Explore Prizes
          </button>
        </div>
        <div className="pt-8">
          <p className="mb-4">Share Your Experience</p>
          {/* <SocialLinks /> */}
        </div>
      </div>

      <div className="relative">
        <Image
          src="/starklotto-main-home.png"
          alt="Lottery ticket with coins"
          className="rounded-[50px] shadow-2xl mt-16"
          width={606}
          height={404}
        />
      </div>
    </div>
  );
}

export default Header;
