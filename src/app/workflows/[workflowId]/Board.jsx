"use client";

import { useState, useEffect } from "react";
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

  const [draggingTask, setDraggingTask] = useState(null);
  const [dragFromStage, setDragFromStage] = useState(null);
  const [hoverStage, setHoverStage] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [toast, setToast] = useState(null);
  const [editWorkflowOpen, setEditWorkflowOpen] = useState(false);

  function showToast(message, type = "success") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  /* ======================
     ADD TASK
  ====================== */
  function addTask(stageId, task) {
    setTasksByStage((prev) => ({
      ...prev,
      [stageId]: [...prev[stageId], task],
    }));
  }

  /* ======================
     UPDATE TASK
  ====================== */
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

  /* ======================
     DELETE TASK
  ====================== */
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
     DRAG START
  ====================== */
  function onDragStart(task, stageId) {
    setDraggingTask(task);
    setDragFromStage(stageId);
  }

  /* ======================
     REORDER WITHIN STAGE
  ====================== */
  function reorderWithinStage(stageId, targetTaskId) {
    if (!draggingTask || dragFromStage !== stageId) return;

    setTasksByStage((prev) => {
      const list = [...prev[stageId]];
      const from = list.findIndex((t) => t.id === draggingTask.id);
      const to = list.findIndex((t) => t.id === targetTaskId);

      if (from === -1 || to === -1) return prev;

      list.splice(from, 1);
      list.splice(to, 0, draggingTask);

      return { ...prev, [stageId]: list };
    });
  }

  /* ======================
     DROP HANDLER (FINAL)
  ====================== */
  async function handleDrop(stageId) {
    if (!draggingTask) return;

    // SAME STAGE → SAVE ORDER
    if (stageId === dragFromStage) {
      const reordered = tasksByStage[stageId].map((t, i) => ({
        id: t.id,
        order: i,
      }));

      await fetch("/api/tasks/reorder", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tasks: reordered }),
      });
    }

    // DIFFERENT STAGE → MOVE TASK
    if (stageId !== dragFromStage) {
      setTasksByStage((prev) => ({
        ...prev,
        [dragFromStage]: prev[dragFromStage].filter(
          (t) => t.id !== draggingTask.id
        ),
        [stageId]: [...prev[stageId], { ...draggingTask, stageId }],
      }));

      await fetch("/api/tasks", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: draggingTask.id,
          stageId,
        }),
      });
    }

    setDraggingTask(null);
    setDragFromStage(null);
    setHoverStage(null);
  }

  /* ======================
     GLOBAL MOUSE EVENTS
  ====================== */
  useEffect(() => {
    function onMove(e) {
      setMousePos({ x: e.clientX, y: e.clientY });
    }

    function onUp() {
      if (hoverStage) handleDrop(hoverStage);
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [hoverStage, draggingTask, dragFromStage, tasksByStage]);

  /* ======================
     RENDER
  ====================== */
  return (
    <>
      <div className="flex flex-col gap-3 mb-6">
        <div>
          <button
            onClick={() => router.push("/workflows")}
            className="text-sm text-blue-600 mb-2"
          >
            ← Back to workflows
          </button>
        </div>
        <div className="flex gap-4">
          <div>
            <h1 className="text-2xl text-gray-600 font-bold">
              {workflow.name}
            </h1>
            <p className="text-gray-600 max-w-80">{workflow.description}</p>
          </div>
          <button
            className="text-blue-600 cursor-pointer mt-6"
            onClick={() => setEditWorkflowOpen(true)}
          >
            <LiaEditSolid size={30} />
          </button>
        </div>
      </div>
      {draggingTask && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: mousePos.x + 12,
            top: mousePos.y + 12,
          }}
        >
          <div className="bg-white rounded shadow-2xl p-2 text-sm w-56 opacity-90">
            <div className="font-medium">{draggingTask.title}</div>
            <div className="text-xs mt-1 flex justify-between text-gray-600">
              <span>
                {draggingTask.priority === 1
                  ? "High"
                  : draggingTask.priority === 2
                  ? "Medium"
                  : "Low"}
              </span>
              {draggingTask.dueDate && (
                <span>
                  {new Date(draggingTask.dueDate).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      <div
        className="
  flex gap-4 overflow-x-auto pb-4
  sm:grid sm:grid-cols-4 sm:overflow-visible
"
      >
        {workflow.stages.map((stage) => (
          <Column
            key={stage.id}
            stage={stage}
            workflowId={workflow.id}
            tasks={tasksByStage[stage.id] || []}
            onAddTask={addTask}
            onDragStart={onDragStart}
            setHoverStage={setHoverStage}
            isHover={hoverStage === stage.id}
            onUpdateTask={updateTask}
            onDeleteTask={deleteTask}
            onReorderTasks={reorderWithinStage}
            draggingTask={draggingTask}
          />
        ))}
      </div>

      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </>
  );
}
