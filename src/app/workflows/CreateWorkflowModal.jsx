"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateWorkflowModal({ onClose }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/workflows", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description }),
      });

      if (!res.ok) {
        throw new Error("Failed to create workflow");
      }

      const workflow = await res.json();

      onClose();
      router.push(`/workflows/${workflow.id}`);
    } catch (err) {
      console.error(err);
      alert("Could not create workflow");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg p-6 w-full max-w-md"
      >
        <h2 className="text-lg text-gray-600 font-bold mb-4">New Workflow</h2>

        <input
          type="text"
          placeholder="Workflow name"
          className="border p-2 w-full mb-3 text-gray-600 border-gray-300"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Description (optional)"
          className="border p-2 w-full mb-4 text-gray-600 border-gray-300"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 text-gray-600 border rounded border-gray-300 py-2"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}
