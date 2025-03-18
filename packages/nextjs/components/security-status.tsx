import { motion } from "framer-motion"
import { Shield, ExternalLink } from "lucide-react"

export function SecurityStatus() {
  return (
    <motion.div
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="bg-green-500/20 border border-green-500/30 rounded-full px-4 py-1 flex items-center gap-2">
        <Shield className="h-4 w-4 text-green-400" />
        <span className="text-sm text-green-400">All Systems Operational</span>
        <a
          href="#"
          className="text-green-400 hover:text-green-300 transition-colors flex items-center gap-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="text-xs">View Status</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </motion.div>
  )
} 