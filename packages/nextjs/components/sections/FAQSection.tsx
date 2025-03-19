"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "~~/components/ui/card"

interface FAQSectionProps {
  faqY: any
}

export function FAQSection({ faqY }: FAQSectionProps) {
  return (
    <motion.section
      id="faq"
      style={{ y: faqY }}
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
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Frequently Asked Questions</h2>
            <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Find answers to common questions about our platform.
            </p>
          </div>
        </motion.div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2">
          <Card className="bg-black/20 border-white/10">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">How is randomness guaranteed?</h3>
              <p className="text-gray-400">
                We use Chainlink VRF (Verifiable Random Function) to ensure fair and provably random number generation.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-white/10">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">When do I receive my winnings?</h3>
              <p className="text-gray-400">
                Winnings are automatically sent to your wallet immediately after the draw.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-white/10">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">What cryptocurrencies are accepted?</h3>
              <p className="text-gray-400">
                We currently accept USDC on multiple networks including Ethereum and Polygon.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-white/10">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">How do I verify the results?</h3>
              <p className="text-gray-400">
                All draws are recorded on the blockchain and can be verified through our explorer.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.section>
  )
} 