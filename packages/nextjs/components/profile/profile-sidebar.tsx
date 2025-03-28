"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ProfileSidebar() {
  const [activeNav, setActiveNav] = useState<string>("My Tickets");

  return (
    <div className="flex flex-col gap-4">
      {/* Perfil y balance */}
      <div
        className="rounded-xl overflow-hidden border"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          borderColor: "rgba(255, 255, 255, 0.2)",
        }}
      >
        <div className="p-5">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <Image
                  src="/profile.svg"
                  alt="Profile"
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <h2
                className="text-2xl font-bold"
                style={{
                  background: "linear-gradient(to right, #C084FC, #F472B6)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Pirate King
              </h2>
              <div className="flex items-center text-gray-400 text-sm mt-0.5">
                <span>0x1a2b...3c4d</span>
                {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
                <button className="ml-2 text-gray-400 hover:text-white">
                  {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="opacity-70"
                  >
                    <rect
                      x="9"
                      y="9"
                      width="13"
                      height="13"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
          <div className="my-6 border-t border-gray-800"></div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-400 mb-1">Balance</div>
              <div className="text-lg font-bold text-white whitespace-nowrap">
                1,250 USDC
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-400 mb-1">Total Won</div>
              <div className="text-lg font-bold text-[#f5a623] whitespace-nowrap">
                12,500 USDC
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-6 text-white py-3 rounded-xl font-medium text-base"
            style={{
              background: "linear-gradient(to right, #9333EA, #4338CA)",
            }}
          >
            Buy Tickets
          </motion.button>
        </div>
      </div>

      {/* Navegación */}
      <div
        className="rounded-xl overflow-hidden border"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          borderColor: "rgba(255, 255, 255, 0.2)",
        }}
      >
        <nav>
          <div
            className={
              activeNav === "My Tickets" ? "bg-[rgba(144,66,240,0.1)]" : ""
            }
          >
            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
            <button
              onClick={() => setActiveNav("My Tickets")}
              className={`flex items-center px-4 py-3.5 w-full text-left transition-colors text-base relative
                ${activeNav === "My Tickets" ? "text-[#9042F0]" : "text-white hover:text-[#a288ff]"}
              `}
            >
              {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="mr-3"
              >
                <rect x="5" y="6" width="14" height="12" rx="1" />
                <path d="M5 10H19" />
                <path d="M12 6V18" strokeDasharray="2 2" />
              </svg>
              <span>My Tickets</span>
              {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
              {activeNav === "My Tickets" && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#9042F0]"></div>
              )}
            </button>
          </div>

          {["Wallet", "History", "Rewards", "Settings"].map((item) => (
            <div
              key={item}
              className={activeNav === item ? "bg-[rgba(144,66,240,0.1)]" : ""}
            >
              {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
              <button
                onClick={() => setActiveNav(item)}
                className={`flex items-center px-4 py-3.5 w-full text-left transition-colors text-base relative
                  ${activeNav === item ? "text-[#9042F0]" : "text-white hover:text-[#a288ff] hover:bg-[#1A1333]"}
                `}
              >
                {getIcon(item)}
                <span>{item}</span>
                {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
                {activeNav === item && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#9042F0]"></div>
                )}
              </button>
            </div>
          ))}
        </nav>
      </div>

      {/* Disconnect Wallet - completamente separado */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center text-[#ff6b6b] hover:text-[#ff8787] transition-colors px-4 py-3.5 text-base hover:bg-red-500/10 rounded-lg"
      >
        {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-3"
        >
          <path
            d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 17L21 12L16 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 12H9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Disconnect Wallet</span>
      </motion.button>
    </div>
  );
}

function getIcon(label: string) {
  switch (label) {
    case "Wallet":
      return (
        // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="mr-3"
        >
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 10H21" />
          <path d="M15 15H17" />
        </svg>
      );
    case "History":
      return (
        // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="mr-3"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7V12L15 14" />
        </svg>
      );
    case "Rewards":
      return (
        // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="mr-3"
        >
          <path d="M8 21H16" />
          <path d="M12 17V21" />
          <path d="M7 4H17V8C17 11.3137 14.7614 14 12 14C9.23858 14 7 11.3137 7 8V4Z" />
          <path d="M5 4H7" />
          <path d="M17 4H19" />
        </svg>
      );
    case "Settings":
      return (
        // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="mr-3"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      );
    default:
      return null;
  }
}
