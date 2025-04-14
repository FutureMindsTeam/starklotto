"use client";

import { useState } from "react";
import { Navbar } from "~~/components/Navbar";
import { AnimatedBackground } from "~~/components/animated-background";
import { FloatingCoins } from "~~/components/floating-coins";
import { Notification } from "~~/components/notification";
import TokenConversion from "~~/components/token-conversion";

export default function SwapPage() {
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground overflow-x-hidden">
      <AnimatedBackground />
      <FloatingCoins />
      + <Navbar onBuyTicket={() => {}} onNavigate={(sectionId: string) => {}} />
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <main className="flex-1 pt-24 relative z-10">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-violet-500 to-indigo-600 mb-4">
              Token Swap
            </h1>
            <p className="max-w-2xl mx-auto text-gray-300 text-lg">
              Convert between STRK and $tarkPlay tokens instantly with minimal
              fees.
            </p>
          </div>

          <div className="max-w-md mx-auto mb-16">
            <TokenConversion
              useExternalNotifications={true}
              onSuccess={(amount, receivedAmount, message) => {
                setNotification({
                  message,
                  type: "success",
                });
              }}
              onError={(error) => {
                setNotification({
                  message: error,
                  type: "error",
                });
              }}
            />
          </div>

          <div className="max-w-3xl mx-auto mt-12 grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-gray-900 rounded-xl p-6 border border-purple-500/20">
              <h2 className="text-xl font-bold mb-4 text-purple-300">
                About Token Conversion
              </h2>
              <p className="text-gray-300 mb-4">
                Converting between STRK and $tarkPlay tokens allows you to
                utilize your assets for different purposes within our ecosystem.
                $tarkPlay tokens are used specifically for gaming, while STRK
                tokens have broader utility.
              </p>
              <p className="text-gray-300">
                The conversion rate is pegged at 1:1, with a minimal fee of 0.5%
                applied to each transaction to support the ecosystem&apos;s
                stability and growth.
              </p>
            </div>
            <div className="bg-gray-900 rounded-xl p-6 border border-purple-500/20">
              <h2 className="text-xl font-bold mb-4 text-purple-300">
                Conversion Guidelines
              </h2>
              <ul className="text-gray-300 space-y-2">
                <li className="flex gap-2 items-start">
                  <span className="text-purple-400 font-bold">•</span>
                  <span>Conversions are processed instantly and on-chain</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-purple-400 font-bold">•</span>
                  <span>
                    You can convert in either direction: STRK to $tarkPlay or
                    $tarkPlay to STRK
                  </span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-purple-400 font-bold">•</span>
                  <span>A 0.5% fee is applied to all conversions</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-purple-400 font-bold">•</span>
                  <span>
                    There is no minimum or maximum conversion amount, but you
                    cannot exceed your balance
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
