"use client";

import { BsCalendar3 } from "react-icons/bs";
import { MdOutlineAccessTime } from "react-icons/md";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { LuMenu } from "react-icons/lu";

export default function CompletedTasksTab({
  tasks = [],
  setTasks,
  onMenuClick,
}) {
  const completedTasks = tasks.filter((t) => t.completed);

  async function undoTask(id) {
    await fetch("/api/tasks", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, completed: false }),
    });

    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: false } : t))
    );
  }

  return (
    <section className="w-full space-y-6">
      {/* Mobile menu */}
      <div className="flex md:hidden w-full">
        <button onClick={onMenuClick}>
          <LuMenu size={30} className="text-purple-500" />
        </button>
      </div>

      {/* Header */}
      <div>
        <h2 className="text-3xl font-extrabold text-gray-800">
          Completed Tasks
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {completedTasks.length} task marked as completed
        </p>
      </div>

      {/* Tasks */}
      <div className="space-y-4">
        {completedTasks.map((task) => (
          <div
            key={task.id}
            className="bg-white border rounded-xl p-5 flex justify-between opacity-80"
          >
            <div className="flex gap-4">
              <IoCheckmarkCircleOutline
                onClick={() => undoTask(task.id)}
                className="cursor-pointer text-green-500 text-2xl mt-1"
              />

              <div>
                <h3 className="font-semibold text-gray-700 line-through">
                  {task.title}
                </h3>
                {task.description && (
                  <p className="text-sm text-gray-500 mt-1 line-through">
                    {task.description}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col items-end justify-between text-sm text-gray-500">
              <HiOutlineDotsVertical />
              <span>{new Date(task.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}

        {completedTasks.length === 0 && (
          <p className="text-center text-gray-400">No completed tasks</p>
        )}
      </div>
    </section>
  );
}
