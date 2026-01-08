"use client";

import { Home, CheckSquare, CheckCircle } from "lucide-react";

export default function MobileSidebar({
  open,
  onClose,
  activeTab,
  setActiveTab,
  user
}) {
  if (!open) return null;

  const handleClick = (tab) => {
    setActiveTab(tab);
    onClose();
  };
  const name = user?.name || "User";

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 z-40 md:hidden"
      />

      {/* Sidebar */}
      <aside className="fixed top-16 left-0 z-50 h-screen w-64 bg-white px-5 py-6 md:hidden">
        <div className="block mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Hey, {name} 👋
          </h2>
          <p className="text-sm text-purple-500">✨ Let's crush some tasks!!</p>
        </div>
        <nav className="space-y-3">
          <NavButton
            icon={<Home size={18} />}
            label="Dashboard"
            active={activeTab === "dashboard"}
            onClick={() => handleClick("dashboard")}
          />

          <NavButton
            icon={<CheckSquare size={18} />}
            label="Pending Tasks"
            active={activeTab === "pending"}
            onClick={() => handleClick("pending")}
          />

          <NavButton
            icon={<CheckCircle size={18} />}
            label="Completed Tasks"
            active={activeTab === "completed"}
            onClick={() => handleClick("completed")}
          />
        </nav>
      </aside>
    </>
  );
}

/* ---------------- NAV BUTTON ---------------- */

function NavButton({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-3
        w-full px-3 py-2 rounded-lg
        transition
        ${
          active
            ? "bg-purple-50 text-purple-600"
            : "text-gray-600 hover:bg-gray-50"
        }
      `}
    >
      <span className="w-5 h-5">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}
