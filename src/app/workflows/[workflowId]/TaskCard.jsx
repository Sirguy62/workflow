"use client";

import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import EditTaskModal from "./EditTaskModal";

export default function TaskCard({ task, stageId, onUpdate, onDelete }) {
  const [open, setOpen] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: { ...task, stageId },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const priorityStyles = {
    1: "bg-red-100 text-red-700",
    2: "bg-yellow-100 text-yellow-700",
    3: "bg-green-100 text-green-700",
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        onDoubleClick={() => setOpen(true)}
        className="relative bg-white rounded p-3 shadow-sm text-sm cursor-grab active:cursor-grabbing select-none"
      >
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            onClick={() => setOpen(true)}
            className="text-xs text-blue-600 hover:underline"
          >
            Edit
          </button>
          <button
            onClick={() => {
              if (!confirm("Delete this task?")) return;
              onDelete(stageId, task);
            }}
            className="text-xs text-red-600 hover:underline"
          >
            Delete
          </button>
        </div>

        <div className="font-medium text-gray-600 mb-3 pr-16">{task.title}</div>

        <div className="flex justify-between items-center text-xs">
          <span
            className={`px-2 py-0.5 rounded font-medium ${
              priorityStyles[task.priority]
            }`}
          >
            {task.priority === 1
              ? "High"
              : task.priority === 2
              ? "Medium"
              : "Low"}
          </span>

          {task.dueDate && (
            <span className="text-gray-600">
              {new Date(task.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      {open && (
        <EditTaskModal
          task={task}
          stageId={stageId}
          onClose={() => setOpen(false)}
          onSave={onUpdate}
          onDelete={(t) => onDelete(stageId, t)}
        />
      )}
    </>
  );
}
