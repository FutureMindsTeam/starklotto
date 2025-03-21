"use client"

import { useState } from "react"
import BuyTicketsModal from "../../components/BuyTicketsModal"

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#111827] to-[#0f172a] text-white">
      <header className="container mx-auto py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-400 rounded-full"></div>
          <span className="text-green-400 font-bold">StarkLotto</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-white hover:text-green-400">
            Home
          </a>
          <a href="#" className="text-white hover:text-green-400">
            Features
          </a>
          <a href="#" className="text-white hover:text-green-400">
            How It Works
          </a>
          <a href="#" className="text-white hover:text-green-400">
            FAQ
          </a>
        </nav>

        <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-full">Connect Wallet</button>
      </header>

      <main className="container mx-auto py-12 px-6 flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-6xl font-bold text-purple-400 mb-4">
            The Most Secure and Exciting Web3 Lottery
          </h1>
          <p className="text-gray-300 mb-8">Play, win, and collect prizes instantly with blockchain security.</p>

          <div className="flex gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-medium"
            >
              Buy Tickets
            </button>
          </div>
        </div>

        <div className="md:w-1/2 bg-[#111827] rounded-xl p-6 border border-gray-800">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl text-gray-300">Next Draw</h2>
            <span className="text-green-400 text-sm px-2 py-1 bg-green-400/10 rounded-full flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              Secure
            </span>
          </div>

          <p className="text-[#4ade80] text-3xl font-bold mb-4">$260,446 USDC</p>

          <div className="flex justify-between mb-8">
            <div className="text-center">
              <p className="text-purple-400 text-2xl font-bold">00</p>
              <p className="text-gray-400 text-sm">Days</p>
            </div>
            <div className="text-center">
              <p className="text-purple-400 text-2xl font-bold">23</p>
              <p className="text-gray-400 text-sm">Hours</p>
            </div>
            <div className="text-center">
              <p className="text-purple-400 text-2xl font-bold">59</p>
              <p className="text-gray-400 text-sm">Minutes</p>
            </div>
            <div className="text-center">
              <p className="text-purple-400 text-2xl font-bold">58</p>
              <p className="text-gray-400 text-sm">Seconds</p>
            </div>
          </div>

          <div className="flex justify-center gap-4 mb-6">
            {[1, 2, 3, 4, 5].map((num) => (
              <div
                key={num}
                className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center font-medium"
              >
                {num}
              </div>
            ))}
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-medium"
          >
            Buy Ticket
          </button>
        </div>
      </main>

      <BuyTicketsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        jackpotAmount="$250,295 USDC"
        countdown={{ days: "00", hours: "23", minutes: "57", seconds: "46" }}
        balance={1000}
        ticketPrice={10}
      />
    </div>
  )
}

