import { useState } from "react"
import { motion } from "framer-motion"
import { Minus, Plus } from "lucide-react"
import { GlowingButton } from "./glowing-button"

interface TicketPriceCalculatorProps {
  basePrice: number
  maxTickets: number
  onPurchase: (quantity: number, totalPrice: number) => void
}

export function TicketPriceCalculator({ basePrice, maxTickets, onPurchase }: TicketPriceCalculatorProps) {
  const [quantity, setQuantity] = useState(1)

  const handleIncrement = () => {
    if (quantity < maxTickets) {
      setQuantity((prev) => prev + 1)
    }
  }

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const totalPrice = basePrice * quantity

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-400">Quantity:</span>
        <div className="flex items-center gap-3">
          <motion.button
            onClick={handleDecrement}
            className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 disabled:opacity-50"
            disabled={quantity <= 1}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Minus className="h-4 w-4" />
          </motion.button>
          <span className="text-lg font-bold min-w-[2ch] text-center">{quantity}</span>
          <motion.button
            onClick={handleIncrement}
            className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 disabled:opacity-50"
            disabled={quantity >= maxTickets}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Plus className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-400">Total Price:</span>
        <motion.span
          key={totalPrice}
          className="text-lg font-bold"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          ${totalPrice} USDC
        </motion.span>
      </div>
      <GlowingButton
        onClick={() => onPurchase(quantity, totalPrice)}
        className="w-full"
        glowColor="rgba(251,191,36,0.4)"
      >
        Purchase Tickets
      </GlowingButton>
    </div>
  )
} 