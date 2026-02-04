import { motion, type Variants } from "framer-motion";
import { Lock, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

interface Level {
  id: number;
  title: string;
  subtitle: string;
  isUnlocked: boolean;
  isActive: boolean;
}

const levels: Level[] = [
  { id: 1, title: "Basics", subtitle: "Financial fundamentals", isUnlocked: true, isActive: true },
  { id: 2, title: "Budgeting", subtitle: "Master your money", isUnlocked: false, isActive: false },
  { id: 3, title: "Investing", subtitle: "Grow your wealth", isUnlocked: false, isActive: false },
  { id: 4, title: "Credit", subtitle: "Build your score", isUnlocked: false, isActive: false },
  { id: 5, title: "Advanced", subtitle: "Expert strategies", isUnlocked: false, isActive: false },
];

// Zigzag positions (pixels from center)
const xOffsets = [0, 40, -40, 40, -40];

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

function handleStartClick() {
  confetti({
    particleCount: 60,
    spread: 55,
    origin: { y: 0.6 },
    colors: ["#D4AF37", "#F4E4BA", "#B8960C"],
  });
}

export function LevelMap() {
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

      <motion.div 
        className="levels-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* SVG Path */}
        <svg className="path-svg" viewBox="0 0 180 680" preserveAspectRatio="none">
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#D4AF37" />
              <stop offset="12%" stopColor="#D4AF37" />
              <stop offset="12%" stopColor="#e0e0e0" />
              <stop offset="100%" stopColor="#e0e0e0" />
            </linearGradient>
          </defs>
          <motion.path
            d="M 90 35 
               Q 90 75, 130 95
               Q 170 115, 130 155
               Q 90 195, 50 215
               Q 10 235, 50 275
               Q 90 315, 130 335
               Q 170 355, 130 395
               Q 90 435, 50 455
               Q 10 475, 50 515
               Q 90 555, 90 595"
            fill="none"
            stroke="url(#pathGradient)"
            strokeWidth="5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </svg>

        {levels.map((level, index) => (
          <motion.div
            key={level.id}
            className="level-node"
            variants={nodeVariants}
            style={{ transform: `translateX(${xOffsets[index]}px)` }}
          >
            <motion.div
              className={`level-circle ${level.isActive ? "active" : "locked"}`}
              whileTap={level.isUnlocked ? { scale: 0.95 } : undefined}
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

              {level.isActive && (
                <motion.button
                  className="start-button"
                  onClick={handleStartClick}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    START
                  </span>
                </motion.button>
              )}
            </motion.div>

            <div className="text-center">
              <p className={`text-sm font-semibold ${level.isActive ? "text-amber-700" : "text-gray-500"}`}>
                {level.title}
              </p>
              <p className="text-xs text-gray-400">
                {level.subtitle}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
