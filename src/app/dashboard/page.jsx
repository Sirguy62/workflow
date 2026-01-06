"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import StatsCards from "@/components/StatsCards";
import RightPanel from "@/components/RightPanel";
import TaskList from "./TaskList";
import TaskStatistics from "@/components/TaskStatistics";

export default function DashboardPage() {
    const [tasks, setTasks] = useState([]);
  return (
    <div className="flex min-h-screen bg-[#faf8ff]">
      <Sidebar />

      <main className="flex-1 px-8 py-6">
        {/* <TopBar /> */}

        <StatsCards tasks={tasks} />

        <div className="mt-6 flex gap-6">
          <div className="flex-1">
            <TaskList tasks={tasks} setTasks={setTasks} />
          </div>

          {/* <RightPanel /> */}
        </div>
      </main>
      <section className="py-6 lg:pr-8 lg:pl-0 px-8">
        <RightPanel tasks={tasks}/>
      </section>
    </div>
  );
}
