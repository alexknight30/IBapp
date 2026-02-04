import { motion } from "framer-motion";
import { User, Trophy, Flame, Target } from "lucide-react";

const stats = [
  { icon: Flame, label: "Day Streak", value: "0", color: "text-orange-500" },
  { icon: Trophy, label: "XP Earned", value: "0", color: "text-amber-500" },
  { icon: Target, label: "Completed", value: "0%", color: "text-emerald-500" },
];

export function ProfilePage() {
  return (
    <motion.div 
      className="page profile-page"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <motion.header 
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <motion.div 
          className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        >
          <User className="w-12 h-12 text-gray-400" />
        </motion.div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Profile</h1>
        <p className="text-sm text-gray-500">Track your progress</p>
      </motion.header>

      <motion.div 
        className="grid grid-cols-3 gap-3 mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              className="bg-gray-50 rounded-2xl p-4 text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
              <p className="text-xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div 
        className="mt-8 p-4 bg-gray-50 rounded-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <p className="text-center text-sm text-gray-400">
          Complete lessons to build your stats!
        </p>
      </motion.div>
    </motion.div>
  );
}
