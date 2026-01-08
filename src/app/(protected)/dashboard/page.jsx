"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import MobileSidebar from "@/components/MobileSidebar";
import StatsCards from "@/components/StatsCards";
import RightPanel from "@/components/RightPanel";
import TaskList from "./TaskList";

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#faf8ff]">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Sidebar */}
      <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />

      <main className="flex flex-col xl:flex-row justify-center w-full">
        <section className="flex-1 px-8 py-6 min-h-[80vh]">
          <StatsCards tasks={tasks} onMenuClick={() => setMobileOpen(true)} />

          <div className="mt-6 flex gap-6">
            <div className="flex-1">
              <TaskList tasks={tasks} setTasks={setTasks} />
            </div>
          </div>
        </section>

        <section className="xl:mr-4 xl:pr-8 py-6 xl:w-80 w-full px-8 xl:px-0">
          <RightPanel tasks={tasks} />
        </section>
      </main>
    </div>
  );
}
