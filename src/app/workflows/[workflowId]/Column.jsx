"use client";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";
import CreateTaskModal from "./CreateTaskModal";
import { useState } from "react";

export default function Column({
  stage,
  tasks,
  workflowId,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
}) {
  const [open, setOpen] = useState(false);

  const { setNodeRef, isOver } = useDroppable({
    id: stage.id,
    data: { stageId: stage.id },
  });

  return (
    <div
      ref={setNodeRef}
      className={`bg-gray-100 rounded-lg p-3 min-h-[300px] border
        ${isOver ? "border-blue-500" : "border-transparent"}
      `}
    >
      <div className="flex justify-between mb-3">
        <h3 className="font-semibold text-gray-600">{stage.name}</h3>
        <button onClick={() => setOpen(true)} className="text-sm text-blue-600">
          + Add
        </button>
      </div>

      <SortableContext
        items={tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2">
          {tasks.length === 0 && (
            <div className="text-xs text-gray-600 italic">Drop tasks here</div>
          )}

          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              stageId={stage.id}
              onUpdate={onUpdateTask}
              onDelete={onDeleteTask}
            />
          ))}
        </div>
      </SortableContext>

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
