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
    <motion.nav 
      className="bottom-nav"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <motion.button
            key={tab.id}
            className={`nav-item ${isActive ? "active" : ""}`}
            onClick={() => onTabChange(tab.id)}
            whileTap={{ scale: 0.9 }}
            aria-label={tab.label}
          >
            <motion.div
              initial={false}
              animate={isActive ? { scale: 1.1, y: -2 } : { scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Icon 
                size={24} 
                strokeWidth={isActive ? 2.5 : 2}
              />
            </motion.div>
            <motion.span
              initial={false}
              animate={{ 
                opacity: isActive ? 1 : 0.7,
                fontWeight: isActive ? 600 : 500,
              }}
            >
              {tab.label}
            </motion.span>
            
            {isActive && (
              <motion.div
                className="absolute -top-1 left-1/2 w-1 h-1 bg-black rounded-full"
                layoutId="activeIndicator"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </motion.button>
        );
      })}
    </motion.nav>
  );
}
