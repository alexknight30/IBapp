import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { BottomNav } from "./components/BottomNav";
import { HomePage } from "./pages/HomePage";
import { LibraryPage } from "./pages/LibraryPage";
import { ProfilePage } from "./pages/ProfilePage";

type Tab = "home" | "library" | "profile";

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("home");

  return (
    <div className="app">
      <main className="main-content">
        <AnimatePresence mode="wait">
          {activeTab === "home" && <HomePage key="home" />}
          {activeTab === "library" && <LibraryPage key="library" />}
          {activeTab === "profile" && <ProfilePage key="profile" />}
        </AnimatePresence>
      </main>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
