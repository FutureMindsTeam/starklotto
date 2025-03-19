"use client"

import { motion } from "framer-motion"
import { User, Ticket, Trophy } from "lucide-react"

interface HowItWorksSectionProps {
  howItWorksY: any
}

export function HowItWorksSection({ howItWorksY }: HowItWorksSectionProps) {
  return (
    <motion.section
      id="how-it-works"
      style={{ y: howItWorksY }}
      className="w-full py-12 md:py-24 lg:py-32 relative backdrop-blur-sm"
    >
      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How It Works</h2>
            <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Getting started is easy. Follow these simple steps to participate.
            </p>
          </div>
        </motion.div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
          <motion.div
            className="flex flex-col items-center space-y-4 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <motion.div
              className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/20 to-indigo-500/20"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <User className="h-8 w-8 text-primary" />
            </motion.div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">1. Connect Wallet</h3>
              <p className="text-gray-400">Connect your Web3 wallet to get started.</p>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col items-center space-y-4 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/20 to-indigo-500/20"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Ticket className="h-8 w-8 text-primary" />
            </motion.div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">2. Choose Numbers</h3>
              <p className="text-gray-400">Select your lucky numbers and purchase tickets.</p>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col items-center space-y-4 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/20 to-indigo-500/20"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Trophy className="h-8 w-8 text-primary" />
            </motion.div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">3. Win & Collect</h3>
              <p className="text-gray-400">Winners receive prizes automatically in their wallet.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
} 