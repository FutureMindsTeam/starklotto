import React from "react";
import InfiniteCarousel from "./InfiniteCarousel";

function HotDeal() {
  return (
    <div className="mt-8 sm:mt-12 lg:mt-16">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 lg:mb-8">
        Hot Deal
      </h2>
      <div className="w-full overflow-hidden">
        <InfiniteCarousel />
      </div>
    </div>
  );
}

export default HotDeal;
