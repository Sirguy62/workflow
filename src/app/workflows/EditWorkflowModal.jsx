"use client";

import { useState } from "react";

export default function EditWorkflowModal({
  workflow,
  onClose,
  onSave,
  onDelete,
}) {
  const [name, setName] = useState(workflow.name);
  const [description, setDescription] = useState(workflow.description || "");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/workflows", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: workflow.id,
        name,
        description,
      }),
    });

    if (!res.ok) {
      alert("Failed to update workflow");
      setLoading(false);
      return;
    }

    await res.json();
    setLoading(false);
    onSave();
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form className="bg-white p-6 rounded w-96" onSubmit={submit}>
        <h2 className="font-bold text-gray-600 mb-4">Edit Workflow</h2>

        <input
          className="border text-gray-600 border-gray-300 p-2 w-full mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <textarea
          className="border p-2 w-full mb-4 text-gray-600 border-gray-300"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex justify-between">
          <button type="button" onClick={onDelete} className="text-red-600">
            Delete
          </button>

          <div className="flex gap-3">
            <button type="button" onClick={onClose}>
              Cancel
            </button>

            <button
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
