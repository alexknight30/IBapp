import { motion } from "framer-motion";
import { Map, BookOpen, User } from "lucide-react";

interface BottomNavProps {
  activeTab: "home" | "library" | "profile";
  onTabChange: (tab: "home" | "library" | "profile") => void;
}

const tabs = [
  { id: "home" as const, label: "Map", icon: Map },
  { id: "library" as const, label: "Library", icon: BookOpen },
  { id: "profile" as const, label: "Profile", icon: User },
];

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="bottom-nav">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <motion.button
            key={tab.id}
            className={`nav-item ${isActive ? "active" : ""}`}
            onClick={() => onTabChange(tab.id)}
            whileTap={{ scale: 0.92 }}
          >
            <motion.div
              animate={{ 
                scale: isActive ? 1.1 : 1,
                y: isActive ? -2 : 0,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            </motion.div>
            <span>{tab.label}</span>
            {isActive && (
              <motion.div
                className="absolute -top-0.5 w-1 h-1 bg-black rounded-full"
                layoutId="navDot"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </motion.button>
        );
      })}
    </nav>
  );
}
