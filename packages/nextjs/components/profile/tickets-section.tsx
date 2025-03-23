"use client"

import { Search } from "lucide-react"
import TicketCard from "./ticket-card"
import { motion } from "framer-motion"

interface TicketsSectionProps {
  activeTab: "all" | "active" | "finished"
  setActiveTab: (tab: "all" | "active" | "finished") => void
}

export default function TicketsSection({ activeTab, setActiveTab }: TicketsSectionProps) {
  // Mock data for tickets
  const tickets = [
    {
      id: "ticket-005",
      status: "active",
      numbers: [2, 13, 24, 35, 46],
      drawDate: "Mar 24, 2025",
      drawAmount: "$270,000",
      purchaseDate: "Mar 21, 2025",
      daysLeft: 3,
    },
    {
      id: "ticket-001",
      status: "active",
      numbers: [7, 12, 23, 34, 45],
      drawDate: "Mar 23, 2025",
      drawAmount: "$250,000",
      purchaseDate: "Mar 20, 2025",
      daysLeft: 2,
    },
    {
      id: "ticket-002",
      status: "active",
      numbers: [3, 16, 22, 31, 42],
      drawDate: "Mar 22, 2025",
      drawAmount: "$300,000",
      purchaseDate: "Mar 19, 2025",
      daysLeft: 1,
    },
    {
      id: "ticket-003",
      status: "finished",
      numbers: [5, 11, 18, 27, 39],
      drawDate: "Mar 20, 2025",
      drawAmount: "$200,000",
      purchaseDate: "Mar 17, 2025",
      matchedNumbers: "4 / 5",
      winAmount: "No win",
    },
    {
      id: "ticket-004",
      status: "winner",
      numbers: [9, 14, 25, 33, 41],
      drawDate: "Mar 18, 2025",
      drawAmount: "$180,000",
      purchaseDate: "Mar 15, 2025",
      matchedNumbers: "5 / 5",
      winAmount: "$180,000",
    },
  ]

  // Filter tickets based on active tab
  const filteredTickets = tickets.filter((ticket) => {
    if (activeTab === "all") return true
    if (activeTab === "active") return ticket.status === "active"
    if (activeTab === "finished") return ticket.status === "finished" || ticket.status === "winner"
    return true
  })

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-xl font-bold mb-4 md:mb-0"
          style={{
            background: "linear-gradient(to right, #C084FC, #F472B6)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          My Tickets
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex gap-2"
        >
          <div className="relative group">
            <div
              className="border rounded-lg flex items-center py-2 px-3 w-64 transition-all duration-200 group-hover:border-purple-500/50"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                borderColor: "rgba(255, 255, 255, 0.1)",
              }}
            >
              <Search className="text-gray-400 h-4 w-4 mr-2 group-hover:text-purple-400 transition-colors" />
              <input
                type="text"
                placeholder="Search tickets..."
                className="bg-transparent border-none outline-none text-white placeholder-gray-400 text-sm w-full"
              />
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#0F0B1F] border border-[#2A2344] rounded-lg h-9 w-9 flex items-center justify-center hover:bg-[#1A1333] transition-colors"
          >
            {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 3L7 21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M17 21L17 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 7L7 3L11 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path
                d="M21 17L17 21L13 17"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="rounded-lg inline-flex p-1 mb-5 border shadow-lg"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          borderColor: "rgba(255, 255, 255, 0.2)",
        }}
      >
        <TabButton label="All Tickets" active={activeTab === "all"} onClick={() => setActiveTab("all")} />
        <TabButton label="Active" active={activeTab === "active"} onClick={() => setActiveTab("active")} />
        <TabButton label="Finished" active={activeTab === "finished"} onClick={() => setActiveTab("finished")} />
      </motion.div>

      <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-4" initial={{ opacity: 1 }} animate={{ opacity: 1 }}>
        {filteredTickets.map((ticket, index) => (
          <motion.div
            // biome-ignore lint/style/useTemplate: <explanation>
            key={ticket.id + "-" + activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
            layout
          >
            <TicketCard ticket={ticket} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

function TabButton({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <motion.button
      whileHover={!active ? { scale: 1.05 } : {}}
      whileTap={!active ? { scale: 0.95 } : {}}
      onClick={onClick}
      className={`px-5 py-1.5 rounded-lg transition-all duration-200 text-sm ${
        active ? "bg-[#9042F0] text-white shadow-md shadow-purple-900/30" : "text-gray-400 hover:text-white"
      }`}
    >
      {label}
    </motion.button>
  )
}

