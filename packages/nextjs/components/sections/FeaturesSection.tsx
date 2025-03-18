"use client"

import { motion } from "framer-motion"
import { Shield, Lock, Trophy } from "lucide-react"
import { CertificationBadges } from "~~/components/certification-badges"

interface FeaturesSectionProps {
  featuresY: any
}

export function FeaturesSection({ featuresY }: FeaturesSectionProps) {
  return (
    <motion.section
      id="features"
      style={{ y: featuresY }}
      className="w-full py-12 md:py-24 lg:py-32 bg-muted/50 backdrop-blur-sm relative"
    >
      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Security Features</h2>
            <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform uses audited and verified smart contracts to ensure transparency and security.
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
              <Shield className="h-8 w-8 text-primary" />
            </motion.div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Audited Contracts</h3>
              <p className="text-gray-400">All our smart contracts have been audited by leading security firms.</p>
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
              <Lock className="h-8 w-8 text-primary" />
            </motion.div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Secure Transactions</h3>
              <p className="text-gray-400">All transactions are secured and verified on the blockchain.</p>
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
              <h3 className="text-xl font-bold">Instant Prizes</h3>
              <p className="text-gray-400">Winners receive their prizes automatically and instantly.</p>
            </div>
          </motion.div>
        </div>

        <CertificationBadges />
      </div>
    </motion.section>
  )
} 