import { motion } from "framer-motion"
import { Coins } from "lucide-react"

export function FloatingCoins() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            x: Math.random() * window.innerWidth,
            y: -50,
            rotate: Math.random() * 360,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: window.innerHeight + 50,
            rotate: Math.random() * 360 * 2,
          }}
          transition={{
            duration: Math.random() * 15 + 20,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 20,
          }}
        >
          <Coins className="h-8 w-8 text-amber-400/30" />
        </motion.div>
      ))}
    </div>
  )
} 