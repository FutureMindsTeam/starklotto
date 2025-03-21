"use client"

import { useState } from "react"
import { X, Shuffle } from "lucide-react"

interface BuyTicketsModalProps {
  isOpen: boolean
  onClose: () => void
  jackpotAmount: string
  countdown: {
    days: string
    hours: string
    minutes: string
    seconds: string
  }
  balance: number
  ticketPrice: number
}

export default function BuyTicketsModal({
  isOpen,
  onClose,
  jackpotAmount = "$250,295 USDC",
  countdown = { days: "00", hours: "23", minutes: "57", seconds: "46" },
  balance = 1000,
  ticketPrice = 10,
}: BuyTicketsModalProps) {
  const [ticketCount, setTicketCount] = useState(1)
  const [selectedNumbers, setSelectedNumbers] = useState<Record<number, number[]>>({
    1: [],
  })

  const increaseTickets = () => {
    if (ticketCount < 10) {
      setTicketCount((prev) => {
        const newCount = prev + 1
        setSelectedNumbers((current) => ({
          ...current,
          [newCount]: [],
        }))
        return newCount
      })
    }
  }

  const decreaseTickets = () => {
    if (ticketCount > 1) {
      setTicketCount((prev) => {
        const newCount = prev - 1
        const newSelected = { ...selectedNumbers }
        delete newSelected[ticketCount]
        setSelectedNumbers(newSelected)
        return newCount
      })
    }
  }

  const selectNumber = (ticketId: number, num: number) => {
    setSelectedNumbers((current) => {
      const currentSelected = current[ticketId] || []

      // If already selected, remove it
      if (currentSelected.includes(num)) {
        return {
          ...current,
          [ticketId]: currentSelected.filter((n) => n !== num),
        }
      }

      // If we already have 5 numbers, don't add more
      if (currentSelected.length >= 5) return current

      // Add the number
      return {
        ...current,
        [ticketId]: [...currentSelected, num],
      }
    })
  }

  const generateRandom = (ticketId: number) => {
    const numbers = new Set<number>()
    while (numbers.size < 5) {
      numbers.add(Math.floor(Math.random() * 41)) // 0-40 inclusive
    }
    setSelectedNumbers((current) => ({
      ...current,
      [ticketId]: Array.from(numbers),
    }))
  }

  const generateRandomForAll = () => {
    const newSelections: Record<number, number[]> = {}
    for (let i = 1; i <= ticketCount; i++) {
      const numbers = new Set<number>()
      while (numbers.size < 5) {
        numbers.add(Math.floor(Math.random() * 41)) // 0-40 inclusive
      }
      newSelections[i] = Array.from(numbers)
    }
    setSelectedNumbers(newSelections)
  }

  const totalCost = ticketCount * ticketPrice

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#111827] rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 flex flex-col gap-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-purple-400">Buy Tickets</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X size={24} />
            </button>
          </div>

          {/* Next Draw */}
          <div>
            <p className="text-gray-300 mb-1">Next Draw</p>
            <p className="text-[#4ade80] text-3xl font-bold">{jackpotAmount}</p>

            {/* Countdown */}
            <div className="flex justify-between mt-4">
              <div className="text-center">
                <p className="text-purple-400 text-2xl font-bold">{countdown.days}</p>
                <p className="text-gray-400 text-sm">Days</p>
              </div>
              <div className="text-center">
                <p className="text-purple-400 text-2xl font-bold">{countdown.hours}</p>
                <p className="text-gray-400 text-sm">Hours</p>
              </div>
              <div className="text-center">
                <p className="text-purple-400 text-2xl font-bold">{countdown.minutes}</p>
                <p className="text-gray-400 text-sm">Minutes</p>
              </div>
              <div className="text-center">
                <p className="text-purple-400 text-2xl font-bold">{countdown.seconds}</p>
                <p className="text-gray-400 text-sm">Seconds</p>
              </div>
            </div>
          </div>

          {/* Balance and Price */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="text-[#4ade80]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
                  <path d="M6 10H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <p className="text-white">
                Balance: <span className="text-[#4ade80]">${balance} $tarkPlay</span>
              </p>
            </div>
            <p className="text-white">
              Price per ticket: <span className="text-[#4ade80]">${ticketPrice} $tarkPlay</span>
            </p>
          </div>

          {/* Ticket Quantity */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <button
                onClick={decreaseTickets}
                className="bg-purple-600 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold"
              >
                -
              </button>
              <p className="text-white">
                {ticketCount} Ticket{ticketCount > 1 ? "s" : ""}
              </p>
              <button
                onClick={increaseTickets}
                className="bg-purple-600 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold"
              >
                +
              </button>
            </div>
            <button
              onClick={generateRandomForAll}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Shuffle size={16} />
              Random for all
            </button>
          </div>

          {/* Ticket Selection */}
          {Array.from({ length: ticketCount }).map((_, idx) => {
            const ticketId = idx + 1
            return (
              <div key={ticketId} className="bg-[#1a2234] rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-white font-medium">Ticket #{ticketId}</p>
                  <button
                    onClick={() => generateRandom(ticketId)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-lg flex items-center gap-1"
                  >
                    <Shuffle size={14} />
                    Random
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 41 }).map((_, numIdx) => {
                    const num = numIdx
                    const isSelected = selectedNumbers[ticketId]?.includes(num)
                    return (
                      <button
                        key={num}
                        onClick={() => selectNumber(ticketId, num)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm
                          ${isSelected ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}
                      >
                        {num < 10 ? `0${num}` : num}
                      </button>
                    )
                  })}
                </div>

                <div className="flex justify-center mt-4 gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-gray-400"
                    >
                      ?
                    </div>
                  ))}
                </div>
              </div>
            )
          })}

          {/* Game Rules */}
          <div className="bg-[#1a2234] rounded-lg p-4">
            <h3 className="text-white font-medium mb-2">Game Rules</h3>
            <ul className="text-gray-400 space-y-1 text-sm">
              <li>• Select 5 numbers from 00 to 40 for each ticket</li>
              <li>• You can purchase up to 10 tickets per transaction</li>
              <li>• The draw takes place daily at 20:00 UTC</li>
              <li>• Match all numbers to win the jackpot</li>
              <li>• Smaller prizes for partial matches</li>
            </ul>
          </div>

          {/* Total Cost */}
          <div className="bg-[#1a2234] rounded-lg p-4 flex justify-between items-center">
            <p className="text-white font-medium">Total cost:</p>
            <p className="text-[#4ade80] font-medium">${totalCost} $tarkPlay</p>
          </div>

          {/* Buy Button */}
          <button className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium">
            Buy Tickets
          </button>
        </div>
      </div>
    </div>
  )
}

