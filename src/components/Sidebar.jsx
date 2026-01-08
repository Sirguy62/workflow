"use client";

import { Home, CheckSquare, CheckCircle, Zap, Lightbulb } from "lucide-react";

export default function Sidebar() {
  const userName = "Edwin"; // 🔁 replace with session later

  return (
    <aside
      className="
    bg-white border-r
    h-screen sticky top-0
    transition-all duration-300
    w-64 md:w-20 lg:w-64
    px-4 py-6
    
    hidden lg:block
  "
    >
      {/* LOGO */}
      <div className="flex items-center gap-3 mb-8 justify-center lg:justify-start ">
        <div className="w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center text-white">
          <Zap size={20} />
        </div>
        <h1 className="hidden lg:block text-xl font-bold text-purple-600">
          Taskflow
        </h1>
      </div>

      {/* GREETING (hidden on md) */}
      <div className="hidden lg:block mb-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Hey, {userName} 👋
        </h2>
        <p className="text-sm text-purple-500">✨ Let's crush some tasks!!</p>
      </div>

      {/* PRODUCTIVITY CARD (xl & lg only) */}
      <div className="hidden lg:block mb-6 p-4 rounded-xl bg-purple-50">
        <p className="text-xs font-semibold text-purple-600 mb-2">
          PRODUCTIVITY
        </p>
        <div className="flex items-center justify-between">
          <div className="w-full h-2 bg-purple-100 rounded-full overflow-hidden">
            <div className="w-0 h-full bg-purple-500" />
          </div>
          <span className="ml-3 text-sm font-semibold text-purple-600">0%</span>
        </div>
      </div>

      {/* NAV */}
      <nav className="space-y-2">
        <NavItem icon={<Home />} label="Dashboard" active />
        <NavItem icon={<CheckSquare />} label="Pending Tasks" />
        <NavItem icon={<CheckCircle />} label="Completed Tasks" />
      </nav>

      {/* PRO TIP (xl & lg only) */}
      <div className="hidden lg:block mt-8 p-4 rounded-xl bg-purple-50">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
            <Lightbulb size={18} />
          </div>
          <div>
            <p className="font-semibold text-sm text-gray-800">Pro Tip</p>
            <p className="text-xs text-gray-600">
              Use keyboard shortcuts to boost productivity
            </p>
            <a
              href="#"
              className="text-xs text-purple-600 font-medium mt-1 inline-block"
            >
              Visit Sirguy Digital Services
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}

/* ---------------- NAV ITEM ---------------- */

function NavItem({ icon, label, active }) {
  return (
    <button
      className={`
        flex items-center gap-3
        w-full px-3 py-2 rounded-lg
        transition
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
