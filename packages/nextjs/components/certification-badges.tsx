import { motion } from "framer-motion"
import { Shield, Lock, CheckCircle } from "lucide-react"

export function CertificationBadges() {
  const badges = [
    {
      icon: Shield,
      title: "CertiK Audited",
      color: "text-blue-400",
      bgColor: "bg-blue-500/20",
      borderColor: "border-blue-500/30",
    },
    {
      icon: Lock,
      title: "Hacken Verified",
      color: "text-purple-400",
      bgColor: "bg-purple-500/20",
      borderColor: "border-purple-500/30",
    },
    {
      icon: CheckCircle,
      title: "ChainLink VRF",
      color: "text-green-400",
      bgColor: "bg-green-500/20",
      borderColor: "border-green-500/30",
    },
  ]

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {badges.map((badge, index) => {
        const Icon = badge.icon
        return (
          <motion.div
            key={badge.title}
            className={`px-4 py-2 rounded-full ${badge.bgColor} ${badge.borderColor} border flex items-center gap-2`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <Icon className={`h-4 w-4 ${badge.color}`} />
            <span className={`text-sm font-medium ${badge.color}`}>{badge.title}</span>
          </motion.div>
        )
      })}
    </div>
  )
} 