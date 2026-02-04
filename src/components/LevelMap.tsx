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

// Zigzag positions
const positions = [0, 50, -50, 50, -50];

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const nodeVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.8,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 20,
    },
  },
};

function handleStartClick() {
  // Fire confetti
  confetti({
    particleCount: 80,
    spread: 60,
    origin: { y: 0.7 },
    colors: ["#D4AF37", "#F4E4BA", "#B8960C", "#FFD700"],
  });
}

export function LevelMap() {
  return (
    <div className="level-map">
      <motion.header 
        className="map-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Financial Foundations
        </h1>
        <p className="text-sm text-gray-500">
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
        <svg className="path-svg" viewBox="0 0 200 800" preserveAspectRatio="none">
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#D4AF37" />
              <stop offset="15%" stopColor="#D4AF37" />
              <stop offset="15%" stopColor="#e5e5e5" />
              <stop offset="100%" stopColor="#e5e5e5" />
            </linearGradient>
          </defs>
          <motion.path
            d="M 100 40 
               Q 100 90, 150 120
               Q 200 150, 150 200
               Q 100 250, 50 280
               Q 0 310, 50 360
               Q 100 410, 150 440
               Q 200 470, 150 520
               Q 100 570, 50 600
               Q 0 630, 50 680
               Q 100 730, 100 760"
            fill="none"
            stroke="url(#pathGradient)"
            strokeWidth="6"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </svg>

        {levels.map((level, index) => (
          <motion.div
            key={level.id}
            className="level-node"
            variants={nodeVariants}
            style={{ transform: `translateX(${positions[index]}px)` }}
          >
            <motion.div
              className={`level-circle ${level.isActive ? "active" : "locked"}`}
              whileHover={level.isUnlocked ? { scale: 1.08 } : {}}
              whileTap={level.isUnlocked ? { scale: 0.95 } : {}}
              animate={level.isActive ? {
                boxShadow: [
                  "0 0 20px rgba(212, 175, 55, 0.4)",
                  "0 0 40px rgba(212, 175, 55, 0.7)",
                  "0 0 20px rgba(212, 175, 55, 0.4)",
                ],
              } : {}}
              transition={level.isActive ? {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              } : {}}
            >
              <motion.div 
                className="level-inner"
                animate={level.isActive ? {
                  scale: [1, 1.05, 1],
                } : {}}
                transition={level.isActive ? {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                } : {}}
              >
                {level.isUnlocked ? (
                  <motion.span 
                    className={`text-2xl font-bold ${level.isActive ? "text-amber-700" : "text-gray-400"}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                  >
                    {level.id}
                  </motion.span>
                ) : (
                  <Lock className="w-6 h-6 text-gray-400" />
                )}
              </motion.div>

              {level.isActive && (
                <motion.button
                  className="start-button"
                  onClick={handleStartClick}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    START
                  </span>
                </motion.button>
              )}
            </motion.div>

            <motion.div 
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <p className={`text-sm font-semibold ${level.isActive ? "text-amber-700" : "text-gray-500"}`}>
                {level.title}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {level.subtitle}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
