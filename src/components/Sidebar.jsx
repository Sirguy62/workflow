"use client";

import { Home, CheckSquare, CheckCircle, Lightbulb } from "lucide-react";

export default function Sidebar({ user, activeTab, setActiveTab }) {
  const name = user?.name || "User";

  return (
    <aside
      className="
      bg-white border-r h-screen sticky top-0
      w-64 md:w-20 lg:w-64
      px-4 py-6 hidden md:block
    "
    >
      <div className="hidden lg:block mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Hey, {name} 👋</h2>
        <p className="text-sm text-purple-500">✨ Let's crush some tasks!!</p>
      </div>

      <nav className="space-y-2">
        <NavItem
          icon={<Home />}
          label="Dashboard"
          active={activeTab === "dashboard"}
          onClick={() => setActiveTab("dashboard")}
        />
        <NavItem
          icon={<CheckSquare />}
          label="Pending Tasks"
          active={activeTab === "pending"}
          onClick={() => setActiveTab("pending")}
        />
        <NavItem
          icon={<CheckCircle />}
          label="Completed Tasks"
          active={activeTab === "completed"}
          onClick={() => setActiveTab("completed")}
        />
      </nav>

      <div className="hidden lg:block mt-8 p-4 rounded-xl bg-purple-50">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
            <Lightbulb size={18} />
          </div>
          <div>
            <p className="font-semibold text-sm">Pro Tip</p>
            <p className="text-xs text-gray-600">
              Use keyboard shortcuts to boost productivity
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-3 w-full px-3 py-2 rounded-lg transition
        ${
          active
            ? "bg-purple-50 text-purple-600"
            : "text-gray-600 hover:bg-gray-50"
        }
        justify-center lg:justify-start
      `}
    >
      <span className="w-5 h-5">{icon}</span>
      <span className="hidden lg:inline text-sm font-medium">{label}</span>
    </button>
  );
}
