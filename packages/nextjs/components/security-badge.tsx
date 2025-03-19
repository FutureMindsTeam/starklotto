import { motion } from "framer-motion"
import { Shield, Lock, CheckCircle } from "lucide-react"

interface SecurityBadgeProps {
  type: "verified" | "secure" | "encrypted"
}

export function SecurityBadge({ type }: SecurityBadgeProps) {
  const badges = {
    verified: {
      icon: CheckCircle,
      text: "Verified",
      color: "text-green-400",
      bgColor: "bg-green-500/20",
      borderColor: "border-green-500/30",
    },
    secure: {
      icon: Shield,
      text: "Secure",
      color: "text-blue-400",
      bgColor: "bg-blue-500/20",
      borderColor: "border-blue-500/30",
    },
    encrypted: {
      icon: Lock,
      text: "Encrypted",
      color: "text-purple-400",
      bgColor: "bg-purple-500/20",
      borderColor: "border-purple-500/30",
    },
  }

  const badge = badges[type]
  const Icon = badge.icon

  return (
    <motion.div
      className={`px-2 py-1 rounded-full ${badge.bgColor} ${badge.borderColor} border flex items-center gap-1`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
    >
      <Icon className={`h-3 w-3 ${badge.color}`} />
      <span className={`text-xs ${badge.color}`}>{badge.text}</span>
    </motion.div>
  )
} 