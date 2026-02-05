import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Lock } from "lucide-react";
import confetti from "canvas-confetti";

interface Level {
  id: number;
  title: string;
  subtitle: string;
  isUnlocked: boolean;
  isActive: boolean;
}

const levels: Level[] = [
  { id: 5, title: "Advanced", subtitle: "Expert strategies", isUnlocked: false, isActive: false },
  { id: 4, title: "Credit", subtitle: "Build your score", isUnlocked: false, isActive: false },
  { id: 3, title: "Investing", subtitle: "Grow your wealth", isUnlocked: false, isActive: false },
  { id: 2, title: "Budgeting", subtitle: "Master your money", isUnlocked: false, isActive: false },
  { id: 1, title: "Basics", subtitle: "Financial fundamentals", isUnlocked: true, isActive: true },
];

// Zigzag positions (pixels from center) - more pronounced stagger
const xOffsets = [0, -60, 60, -60, 60];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const nodeVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

const labelVariants: Variants = {
  hidden: { opacity: 0, y: -8, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 25 },
  },
  exit: { 
    opacity: 0, 
    y: -8, 
    scale: 0.95,
    transition: { duration: 0.15 },
  },
};

function handleStartClick(e: React.MouseEvent) {
  e.stopPropagation();
  confetti({
    particleCount: 60,
    spread: 55,
    origin: { y: 0.6 },
    colors: ["#D4AF37", "#F4E4BA", "#B8960C"],
  });
}

export function LevelMap() {
  // Default to showing the active level (Basics, id: 1)
  const [selectedLevel, setSelectedLevel] = useState<number | null>(1);

  const handleLevelClick = (levelId: number) => {
    setSelectedLevel(selectedLevel === levelId ? null : levelId);
  };

  return (
    <div className="level-map">
      <motion.header 
        className="map-header"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-xl font-bold text-gray-900 mb-1">
          Financial Foundations
        </h1>
        <p className="text-sm text-gray-400">
          Master the basics of personal finance
        </p>
      </motion.header>

      <div className="map-scroll-area">
        <motion.div 
          className="levels-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
        {/* SVG Path - dotted line from bottom to top */}
        <svg className="path-svg" viewBox="0 0 200 720" preserveAspectRatio="none">
          {/* Background dotted path (gray) */}
          <path
            d="M 100 680 
               Q 100 640, 40 600
               Q -20 560, 40 520
               Q 100 480, 160 440
               Q 220 400, 160 360
               Q 100 320, 40 280
               Q -20 240, 40 200
               Q 100 160, 160 120
               Q 220 80, 160 40
               Q 100 0, 100 -40"
            fill="none"
            stroke="#e0e0e0"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="6 10"
          />
          {/* Animated gold progress path */}
          <motion.path
            d="M 100 680 
               Q 100 640, 40 600"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="6 10"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          />
        </svg>

        {levels.map((level, index) => {
          const isSelected = selectedLevel === level.id;
          
          return (
            <motion.div
              key={level.id}
              className="level-node"
              variants={nodeVariants}
              style={{ transform: `translateX(${xOffsets[index]}px)` }}
            >
              <motion.div
                className={`level-circle ${level.isActive ? "active" : "locked"}`}
                onClick={() => handleLevelClick(level.id)}
                whileTap={{ scale: 0.95 }}
                animate={level.isActive ? {
                  boxShadow: [
                    "0 6px 24px rgba(212, 175, 55, 0.45)",
                    "0 6px 32px rgba(212, 175, 55, 0.65)",
                    "0 6px 24px rgba(212, 175, 55, 0.45)",
                  ],
                } : undefined}
                transition={level.isActive ? {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                } : undefined}
              >
                <div className="level-inner">
                  {level.isUnlocked ? (
                    <span className={`text-xl font-bold ${level.isActive ? "text-amber-700" : "text-gray-400"}`}>
                      {level.id}
                    </span>
                  ) : (
                    <Lock className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </motion.div>

              {/* Label card - only shown when selected */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div 
                    className="level-card"
                    variants={labelVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <p className="level-card-title">
                      {level.title}
                    </p>
                    <p className="level-card-subtitle">
                      {level.subtitle}
                    </p>
                    
                    {level.isActive && (
                      <motion.button
                        className="start-button"
                        onClick={handleStartClick}
                        whileTap={{ scale: 0.97 }}
                      >
                        Start
                      </motion.button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
        </motion.div>
      </div>
    </div>
  );
}
