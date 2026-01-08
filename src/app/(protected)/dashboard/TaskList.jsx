"use client";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useState } from "react";
import TaskCard from "./TaskCard";
import CreateTaskModal from "./CreateTaskModal";

export default function TaskList({ tasks, setTasks }) {
  //   const [tasks, setTasks] = useState([]);
  const [activeTask, setActiveTask] = useState(null);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("all");


  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart({ active }) {
    setActiveTask(tasks.find((t) => t.id === active.id));
  }

  function handleDragEnd({ active, over }) {
    setActiveTask(null);
    if (!over || active.id === over.id) return;

    const oldIndex = tasks.findIndex((t) => t.id === active.id);
    const newIndex = tasks.findIndex((t) => t.id === over.id);

    setTasks(arrayMove(tasks, oldIndex, newIndex));
  }

  function addTask(task) {
    setTasks((prev) => [...prev, task]);
  }

  function deleteTask(taskId) {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;

    if (filter === "high" || filter === "medium" || filter === "low") {
      return task.priority?.toLowerCase() === filter;
    }

    if (filter === "today") {
      if (!task.dueDate) return false;
      const today = new Date();
      const due = new Date(task.dueDate);
      return due.toDateString() === today.toDateString();
    }

    if (filter === "week") {
      if (!task.dueDate) return false;
      const now = new Date();
      const due = new Date(task.dueDate);
      const diff = (due - now) / (1000 * 60 * 60 * 24);
      return diff >= 0 && diff <= 7;
    }

    return true;
  });


  return (
    <div className="bg-white rounded-xl border p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-gray-700 font-semibold">
          <span>🔍</span>
          <span className="capitalize">
            {filter === "all" ? "All Tasks" : `${filter} Priority`}
          </span>
        </div>
        {/* FILTERS */}
        <div>
          {/* ✅ Mobile (sm) → SELECT */}
          <div className="block md:hidden">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-purple-300/40 text-sm capitalize text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
            >
              {["all", "today", "week", "high", "medium", "low"].map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>

          {/* ✅ Desktop (md+) → BUTTONS */}
          <div className="hidden md:flex gap-2 bg-gray-100 rounded-lg p-1">
            {["all", "today", "week", "high", "medium", "low"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 text-sm rounded-md capitalize transition
          ${
            filter === f
              ? "bg-white text-purple-600 shadow"
              : "text-gray-500 hover:text-gray-700"
          }
        `}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {filteredTasks.length === 0 && (
            <div className="border rounded-xl p-10 text-center text-gray-400">
              <div className="text-4xl mb-2">📅</div>
              <h4 className="text-lg font-semibold text-gray-600">
                No tasks found
              </h4>
              <p className="text-sm mb-4">No task match this filter</p>
              <button
                onClick={() => setOpen(true)}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg"
              >
                Add New Task
              </button>
            </div>
          )}

          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onDelete={() => deleteTask(task.id)}
                onUpdate={(updated) =>
                  setTasks((prev) =>
                    prev.map((t) => (t.id === updated.id ? updated : t))
                  )
                }
              />
            ))}
          </div>
        </SortableContext>

        <DragOverlay>
          {activeTask && (
            <div className="opacity-90">
              <TaskCard task={activeTask} />
            </div>
          )}
        </DragOverlay>
      </DndContext>

      <button
        onClick={() => setOpen(true)}
        className="mt-4 w-full border-2 border-dashed border-purple-300 rounded-lg py-2 text-purple-600"
      >
        + Add New Task
      </button>

      {open && (
        <CreateTaskModal onClose={() => setOpen(false)} onCreate={addTask} />
      )}
    </div>
  );
}
