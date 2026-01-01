"use client";

import { useState } from "react";

export default function EditTaskModal({
  task,
  stageId,
  onClose,
  onSave,
  onDelete,
}) {
  const [title, setTitle] = useState(task.title);
  const [priority, setPriority] = useState(task.priority);

  // ✅ SAFELY CONVERT DATE → YYYY-MM-DD STRING
  const [dueDate, setDueDate] = useState(
    task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 10) : ""
  );

  function submit(e) {
    e.preventDefault();

    onSave({
      ...task,
      title,
      priority,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      stageId,
    });

    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form className="bg-white p-5 rounded w-80" onSubmit={submit}>
        <h3 className="font-bold mb-4  text-gray-600">Edit Task</h3>

        {/* TITLE */}
        <input
          className="border p-2 w-full mb-3 text-gray-600 border-gray-300"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* PRIORITY */}
        <select
          className="border p-2 w-full mb-3 text-gray-600 border-gray-300"
          value={priority}
          onChange={(e) => setPriority(Number(e.target.value))}
        >
          <option value={1}>High</option>
          <option value={2}>Medium</option>
          <option value={3}>Low</option>
        </select>

        {/* DUE DATE */}
        <input
          type="date"
          className="border p-2 w-full mb-4 text-gray-600 border-gray-300"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <div className="flex justify-between">
          {/* <button
            type="button"
            className="text-red-600"
            onClick={() => {
              if (!confirm("Delete this task?")) return;
              onDelete(task);
              onClose();
            }}
          >
            Delete
          </button> */}

          <div className="flex gap-2">
            <button
              className="text-gray-600 border-gray-300 p-2 rounded border"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button className="bg-blue-600 text-white px-3 py-1 rounded">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
