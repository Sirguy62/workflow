"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import MobileSidebar from "@/components/MobileSidebar";
import StatsCards from "@/components/StatsCards";
import RightPanel from "@/components/RightPanel";
import TaskList from "./TaskList";
import PendingTasksTab from "@/components/PendingTasksTab";
import CompletedTasksTab from "@/components/CompletedTasksTab";

export default function DashboardClient({ user }) {
  const [tasks, setTasks] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [createOpen, setCreateOpen] = useState(false);
  const [loadingTasks, setLoadingTasks] = useState(true);



useEffect(() => {
  async function loadTasks() {
    try {
      setLoadingTasks(true);
      const res = await fetch("/api/tasks");
      const data = res.ok ? await res.json() : [];
      setTasks(data);
    } catch {
      setTasks([]);
    } finally {
      setLoadingTasks(false);
    }
  }

  loadTasks();
}, []);




  return (
    <div className="flex min-h-screen bg-[#faf8ff]">
      <Sidebar user={user} activeTab={activeTab} setActiveTab={setActiveTab} />

      <MobileSidebar
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
      />

      <main className="flex flex-col xl:flex-row justify-center w-full">
        <section className="flex-1 px-8 py-6 min-h-[80vh]">
          {activeTab === "dashboard" && (
            <>
              <StatsCards
                tasks={tasks}
                onMenuClick={() => setMobileOpen(true)}
                onAddTask={() => setCreateOpen(true)}
              />

              <div className="mt-6">
                <TaskList
                  tasks={tasks}
                  setTasks={setTasks}
                  createOpen={createOpen}
                  setCreateOpen={setCreateOpen}
                  loading={loadingTasks}
                />
              </div>
            </>
          )}

          {activeTab === "pending" && (
            <PendingTasksTab
              onMenuClick={() => setMobileOpen(true)}
              onAddTask={() => setCreateOpen(true)}
            />
          )}
          {activeTab === "completed" && (
            <CompletedTasksTab onMenuClick={() => setMobileOpen(true)} />
          )}
        </section>

        {activeTab === "dashboard" && (
          <section className="xl:mr-4 xl:pr-8 py-6 xl:w-80 w-full px-8 xl:px-0">
            <RightPanel tasks={tasks} />
          </section>
        )}
      </main>
    </div>
  );
}
