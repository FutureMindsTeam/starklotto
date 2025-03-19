import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Ticket, Trophy } from "lucide-react";

interface Activity {
  id: string;
  type: "purchase" | "win";
  address: string;
  amount: number;
  timestamp: Date;
}

export function LiveActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([]);

  // Simulate new activities coming in
  useEffect(() => {
    const interval = setInterval(() => {
      const newActivity: Activity = {
        id: Math.random().toString(),
        type: Math.random() > 0.7 ? "win" : "purchase",
        address: `0x${Math.random().toString(16).slice(2, 8)}...${Math.random().toString(16).slice(2, 6)}`,
        amount: Math.floor(Math.random() * 1000),
        timestamp: new Date(),
      };

      setActivities((prev) => [newActivity, ...prev.slice(0, 4)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-4">
      <h3 className="text-lg font-medium mb-4">Live Activity</h3>
      <div className="space-y-3">
        <AnimatePresence initial={false}>
          {activities.map((activity) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3 text-sm"
            >
              <div className="flex-shrink-0">
                {activity.type === "purchase" ? (
                  <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Ticket className="h-4 w-4 text-blue-400" />
                  </div>
                ) : (
                  <div className="h-8 w-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <Trophy className="h-4 w-4 text-amber-400" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-300 truncate">
                  {activity.address}{" "}
                  {activity.type === "purchase" ? "bought tickets for" : "won"}{" "}
                  <span className="font-medium text-white">
                    ${activity.amount}
                  </span>
                </p>
                <p className="text-xs text-gray-500">
                  {formatTimeAgo(activity.timestamp)}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function formatTimeAgo(date: Date) {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
