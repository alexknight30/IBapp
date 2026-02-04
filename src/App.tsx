import { useState } from "react";
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
        {activeTab === "home" && <HomePage />}
        {activeTab === "library" && <LibraryPage />}
        {activeTab === "profile" && <ProfilePage />}
      </main>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
