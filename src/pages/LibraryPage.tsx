import { motion } from "framer-motion";
import { BookOpen, Clock, Star } from "lucide-react";

const comingSoonItems = [
  { icon: BookOpen, title: "Lesson Library", desc: "All your learning materials" },
  { icon: Clock, title: "Progress History", desc: "Track your journey" },
  { icon: Star, title: "Achievements", desc: "Celebrate your wins" },
];

export function LibraryPage() {
  return (
    <motion.div 
      className="page library-page"
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
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Library</h1>
        <p className="text-sm text-gray-500">Your learning resources</p>
      </motion.header>

      <div className="space-y-4">
        {comingSoonItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center">
                <Icon className="w-6 h-6 text-gray-400" />
              </div>
              <div>
                <p className="font-semibold text-gray-700">{item.title}</p>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div 
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-sm text-gray-400">Coming soon...</p>
      </motion.div>
    </motion.div>
  );
}
