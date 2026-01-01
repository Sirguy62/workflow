"use client";

import { useState } from "react";

export default function CreateTaskModal({
  stageId,
  workflowId,
  onClose,
  onCreate,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(1);
  const [dueDate, setDueDate] = useState("");

  async function submit(e) {
    e.preventDefault();

    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        priority,
        dueDate,
        stageId,
        workflowId,
      }),
    });

    if (!res.ok) {
      console.error("Failed to create task");
      return;
    }

    const task = await res.json();
    onCreate(task);
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={submit}
        className="bg-white p-6 rounded-lg w-96 space-y-4"
      >
        <h2 className="font-bold text-gray-600  text-lg">New Task</h2>

        <input
          className="border p-2 w-full text-gray-600 border-gray-300"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* <textarea
          className="border p-2 w-full"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        /> */}

        <select
          className="border p-2 w-full text-gray-600 border-gray-300"
          value={priority}
          onChange={(e) => setPriority(Number(e.target.value))}
        >
          <option value={1}>High</option>
          <option value={2}>Medium</option>
          <option value={3}>Low</option>
        </select>

        <input
          type="date"
          className="border p-2 w-full text-gray-600 border-gray-300"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button
            className=" text-gray-600 border-gray-300 border rounded p-2"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
