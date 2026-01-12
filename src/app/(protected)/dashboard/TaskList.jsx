"use client";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
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



export default function TaskList({ tasks, setTasks, createOpen, setCreateOpen, loading }) {
  const [activeTask, setActiveTask] = useState(null);
  const [filter, setFilter] = useState("all");

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    }),

    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200, 
        tolerance: 8,
      },
    }),

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

  async function addTask(task) {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: task.title,
        description: task.description, 
        priority: task.priority,
        dueDate: task.dueDate,
      }),
    });

    if (!res.ok) {
      console.error("Failed to create task");
      return;
    }

    const saved = await res.json();
    setTasks((prev) => [...prev, saved]);
  }

  async function deleteTask(taskId) {
    await fetch("/api/tasks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: taskId }),
    });

    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;

    if (["high", "medium", "low"].includes(filter)) {
      return task.priority?.toLowerCase() === filter;
    }

    if (filter === "today") {
      if (!task.dueDate) return false;
      return (
        new Date(task.dueDate).toDateString() === new Date().toDateString()
      );
    }

    if (filter === "week") {
      if (!task.dueDate) return false;
      const diff =
        (new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24);
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

        <div>
          <div className="block md:hidden">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border text-sm text-gray-600 border-purple-300/40 capitalize"
            >
              {["all", "today", "week", "high", "medium", "low"].map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>

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
          {loading ? (
            <div className="border rounded-xl p-10 text-center text-gray-400">
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto" />
                <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto" />
                <div className="h-3 bg-gray-200 rounded w-2/3 mx-auto" />
              </div>
              <p className="mt-4 text-sm">Loading tasks…</p>
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="border rounded-xl p-10 text-center text-gray-400">
              <div className="text-4xl mb-2">📅</div>
              <h4 className="text-lg font-semibold text-gray-600">
                No tasks found
              </h4>
              <p className="text-sm mb-4">No task matches this filter</p>
              <button
                onClick={() => setCreateOpen(true)}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg"
              >
                Add New Task
              </button>
            </div>
          ) : null}

          <div className="space-y-3">
            {filteredTasks.map((task) => (
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
        onClick={() => setCreateOpen(true)}
        className="mt-4 w-full border-2 border-dashed border-purple-300 rounded-lg py-2 text-purple-600"
      >
        + Add New Task
      </button>

      {createOpen && (
        <CreateTaskModal
          onClose={() => setCreateOpen(false)}
          onCreate={addTask}
        />
      )}
    </div>
  );
}
