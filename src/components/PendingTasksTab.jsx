"use client";

import { useState } from "react";
import { BsCalendar3 } from "react-icons/bs";
import { MdOutlineAccessTime } from "react-icons/md";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import SortBar from "./Sortbar";
import { LuMenu } from "react-icons/lu";

export default function PendingTasksTab({
  tasks = [],
  setTasks,
  onAddTask,
  onMenuClick,
}) {
  const pendingTasks = tasks.filter((t) => !t.completed);
  const [sort, setSort] = useState("priority");

  async function markCompleted(id) {
    await fetch("/api/tasks", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, completed: true }),
    });

    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: true } : t))
    );
  }

  return (
    <section className="w-full space-y-6">
      <div className="flex md:hidden w-full">
        <button onClick={onMenuClick}>
          <LuMenu size={30} className="text-purple-500" />
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-start md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-purple-500 text-xl">✓≡</span>
            <h2 className="text-3xl font-extrabold text-gray-800">
              Pending Tasks
            </h2>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {pendingTasks.length} task needing your attention
          </p>
        </div>

        <SortBar sort={sort} setSort={setSort} />
      </div>

      <button
        onClick={onAddTask}
        className="w-full border-2 border-dashed border-purple-200 rounded-xl py-6 flex items-center justify-center gap-3 text-purple-600 bg-purple-50/40 hover:bg-purple-50 transition"
      >
        <span className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow">
          +
        </span>
        <span className="font-medium">Add New Task</span>
      </button>

      <div className="space-y-4">
        {pendingTasks.map((task) => (
          <div
            key={task.id}
            className="bg-white border rounded-xl p-5 flex justify-between shadow-sm hover:shadow transition"
          >
            <div className="flex gap-4">
              <IoCheckmarkCircleOutline
                onClick={async () => {
                  await fetch("/api/tasks", {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      id: task.id,
                      completed: !task.completed, 
                    }),
                  });

                  setTasks((prev) =>
                    prev.map((t) =>
                      t.id === task.id ? { ...t, completed: !t.completed } : t
                    )
                  );
                }}
                className={`cursor-pointer text-2xl mt-1 transition
    ${task.completed ? "text-green-500" : "text-gray-300 hover:text-green-500"}
  `}
              />

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-800">{task.title}</h3>

                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium
                      ${
                        task.priority === "High"
                          ? "bg-pink-100 text-pink-600"
                          : task.priority === "Medium"
                          ? "bg-purple-100 text-purple-600"
                          : "bg-green-100 text-green-600"
                      }`}
                  >
                    {task.priority}
                  </span>
                </div>

                {task.description && (
                  <p className="text-sm text-gray-500 mt-1">
                    {task.description}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col items-end justify-between">
              <button className="text-gray-400 hover:text-gray-600">
                <HiOutlineDotsVertical />
              </button>

              <div className="text-right text-sm text-gray-500 space-y-1">
                <div className="flex items-center gap-1">
                  <BsCalendar3 />
                  <span>{task.dueDate || "—"}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MdOutlineAccessTime />
                  <span>
                    Created {new Date(task.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {pendingTasks.length === 0 && (
          <p className="text-center text-gray-400">No pending tasks</p>
        )}
      </div>
    </section>
  );
}
