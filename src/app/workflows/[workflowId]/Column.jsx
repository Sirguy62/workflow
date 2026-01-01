"use client";

import TaskCard from "./TaskCard";
import CreateTaskModal from "./CreateTaskModal";
import { useState } from "react";

export default function Column({
  stage,
  tasks,
  workflowId,
  onAddTask,
  onDragStart,
  onReorderTasks,
  setHoverStage,
  isHover,
  onUpdateTask,
  onDeleteTask,
  draggingTask,
}) {
  const [open, setOpen] = useState(null);

  function handleDragOver(e, targetTask) {
    e.preventDefault();
    onReorderTasks(stage.id, targetTask.id);
  }

  return (
    <div
      className={`
    bg-gray-100 rounded-lg p-3 min-h-[300px] border
    w-[90vw] max-w-[90vw]
    sm:w-auto sm:max-w-none
    flex-shrink-0 snap-center
    ${isHover ? "border-blue-500" : "border-transparent"}
  `}
      onMouseEnter={() => setHoverStage(stage.id)}
    >
      <div className="flex justify-between mb-3">
        <h3 className="font-semibold text-gray-600">{stage.name}</h3>
        <button onClick={() => setOpen(true)} className="text-sm text-blue-600">
          + Add
        </button>
      </div>

      <div className="space-y-2">
        {tasks.length === 0 && (
          <div className="text-xs text-gray-600 italic">No tasks</div>
        )}

        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            stageId={stage.id}
            onDragStart={onDragStart}
            onUpdate={onUpdateTask}
            onDelete={onDeleteTask}
            isDragging={draggingTask?.id === task.id} // 👈 ADD THIS
          />
        ))}
      </div>

      {open && (
        <CreateTaskModal
          stageId={stage.id}
          workflowId={workflowId}
          onClose={() => setOpen(false)}
          onCreate={(task) => {
            onAddTask(stage.id, task);
            setOpen(false);
          }}
        />
      )}
    </div>
  );
}
