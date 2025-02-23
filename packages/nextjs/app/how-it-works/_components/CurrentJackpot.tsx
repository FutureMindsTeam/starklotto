"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const CurrentJackpot = () => {
  const router = useRouter();

  const handleParticipate = () => {
    router.push("/play");
  };

  return (
    <div className="flex flex-col items-center text-white px-6 py-4 md:py-16 rounded-lg shadow-lg">
      <Image
        src="/jackpot.svg"
        alt="Trophy"
        width={512}
        height={402}
        className=" mb-4  hidden md:block "
      />

      <h2 className=" text-lg md:text-3xl font-normal md:font-bold mb-1 md:mb-4">
        🔥 CURRENT JACKPOT 🔥
      </h2>
      <p className=" font-normal text-lg  md:text-xl  md:mb-4 text-yellow-500 md:font-bold">
        15 ETH + NFT EXCLUSIVE
      </p>
      <button
        onClick={handleParticipate}
        className="bg-red-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-red-700 transition"
      >
        PARTICIPATE NOW
      </button>
      <div className="mt-4">
        <Image src="/trophy.svg" alt="Trophy" width={191} height={191} />
      </div>
    </div>
  );
};

export default CurrentJackpot;
