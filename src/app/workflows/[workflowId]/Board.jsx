"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import Column from "./Column";
import EditWorkflowModal from "../EditWorkflowModal";
import { useRouter } from "next/navigation";
import Toast from "@/components/Toast";
import { LiaEditSolid } from "react-icons/lia";

export default function Board({ workflow }) {
  const router = useRouter();

  /* ======================
     INITIAL STATE
  ====================== */
  const [tasksByStage, setTasksByStage] = useState(() => {
    const grouped = {};
    workflow.stages.forEach((stage) => {
      grouped[stage.id] = [...(stage.tasks || [])].sort(
        (a, b) => a.order - b.order
      );
    });
    return grouped;
  });

  const [toast, setToast] = useState(null);
  const [editWorkflowOpen, setEditWorkflowOpen] = useState(false);

  function showToast(message, type = "success") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  /* ======================
     TASK CRUD (UNCHANGED)
  ====================== */
  function addTask(stageId, task) {
    setTasksByStage((prev) => ({
      ...prev,
      [stageId]: [...prev[stageId], task],
    }));
  }

  async function updateTask(updatedTask) {
    setTasksByStage((prev) => ({
      ...prev,
      [updatedTask.stageId]: prev[updatedTask.stageId].map((t) =>
        t.id === updatedTask.id ? updatedTask : t
      ),
    }));

    await fetch("/api/tasks", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    });

    showToast("Task updated");
  }

  async function deleteTask(stageId, task) {
    setTasksByStage((prev) => ({
      ...prev,
      [stageId]: prev[stageId].filter((t) => t.id !== task.id),
    }));

    await fetch("/api/tasks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: task.id }),
    });

    showToast("Task deleted");
  }

  /* ======================
     DND KIT
  ====================== */
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    })
  );

  async function handleDragEnd({ active, over }) {
    if (!over) return;

    const activeTask = active.data.current;
    const overStageId = over.data.current?.stageId || over.id;

    if (!activeTask) return;

    // SAME STAGE → REORDER
    if (activeTask.stageId === overStageId) {
      const items = tasksByStage[overStageId];
      const oldIndex = items.findIndex((t) => t.id === active.id);
      const newIndex = items.findIndex((t) => t.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const reordered = arrayMove(items, oldIndex, newIndex);

        setTasksByStage({
          ...tasksByStage,
          [overStageId]: reordered,
        });

        await fetch("/api/tasks/reorder", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tasks: reordered.map((t, i) => ({ id: t.id, order: i })),
          }),
        });
      }
    }

    // DIFFERENT STAGE → MOVE
    if (activeTask.stageId !== overStageId) {
      setTasksByStage((prev) => ({
        ...prev,
        [activeTask.stageId]: prev[activeTask.stageId].filter(
          (t) => t.id !== active.id
        ),
        [overStageId]: [
          ...prev[overStageId],
          { ...activeTask, stageId: overStageId },
        ],
      }));

      await fetch("/api/tasks", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: active.id,
          stageId: overStageId,
        }),
      });
    }
  }

  /* ======================
     RENDER (UNCHANGED UI)
  ====================== */
  return (
    <>
      <div className="flex flex-col gap-3 mb-6">
        <button
          onClick={() => router.push("/workflows")}
          className="text-sm text-blue-600 mb-2"
        >
          ← Back to workflows
        </button>

        <div className="flex gap-4">
          <div>
            <h1 className="text-2xl text-gray-600 font-bold">
              {workflow.name}
            </h1>
            <p className="text-gray-600 max-w-80">{workflow.description}</p>
          </div>
          <button
            className="text-blue-600 mt-6"
            onClick={() => setEditWorkflowOpen(true)}
          >
            <LiaEditSolid size={30} />
          </button>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 overflow-x-auto pb-4 sm:grid sm:grid-cols-4">
          {workflow.stages.map((stage) => (
            <Column
              key={stage.id}
              stage={stage}
              workflowId={workflow.id}
              tasks={tasksByStage[stage.id] || []}
              onAddTask={addTask}
              onUpdateTask={updateTask}
              onDeleteTask={deleteTask}
            />
          ))}
        </div>
      </DndContext>

      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </>
  );
}
