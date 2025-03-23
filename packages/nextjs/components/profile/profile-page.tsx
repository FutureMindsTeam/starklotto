"use client"

import { useState } from "react"
import ProfileSidebar from "./profile-sidebar"
import TicketsSection from "./tickets-section"
import { ChevronLeft } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"all" | "active" | "finished">("all")

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom right, #0F0B1F, #1A1333)" }}
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {/* Top section */}
        <div className="absolute top-[-150px] right-[-100px] opacity-80">
          <Image src="/overlay-blur-purple.svg" alt="" width={500} height={500} />
        </div>
        <div className="absolute top-[-50px] left-[10%] opacity-70">
          <Image src="/overlay-blur-blue.svg" alt="" width={450} height={450} />
        </div>

        {/* Middle section */}
        <div className="absolute top-[20%] right-[15%] opacity-70">
          <Image src="/overlay-blur-blue.svg" alt="" width={400} height={400} />
        </div>
        <div className="absolute top-[30%] left-[-100px] opacity-80">
          <Image src="/overlay-blur-purple.svg" alt="" width={480} height={480} />
        </div>

        {/* Bottom section */}
        <div className="absolute bottom-[-100px] right-[20%] opacity-75">
          <Image src="/overlay-blur-purple.svg" alt="" width={450} height={450} />
        </div>
        <div className="absolute bottom-[-150px] left-[-50px] opacity-80">
          <Image src="/overlay-blur-blue.svg" alt="" width={500} height={500} />
        </div>

        {/* Additional elements for more coverage */}
        <div className="absolute top-[60%] right-[-150px] opacity-70">
          <Image src="/overlay-blur-blue.svg" alt="" width={480} height={480} />
        </div>
        <div className="absolute top-[10%] left-[40%] opacity-60">
          <Image src="/overlay-blur-purple.svg" alt="" width={350} height={350} />
        </div>
        <div className="absolute top-[70%] left-[30%] opacity-65">
          <Image src="/overlay-blur-blue.svg" alt="" width={420} height={420} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button className="flex items-center text-gray-400 hover:text-white transition-colors group">
            <ChevronLeft className="h-4 w-4 mr-2 group-hover:translate-x-[-2px] transition-transform" />
            <span className="text-sm">Back to Home</span>
          </button>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="w-full md:w-[280px]"
          >
            <ProfileSidebar />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex-1"
          >
            <TicketsSection activeTab={activeTab} setActiveTab={setActiveTab} />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

