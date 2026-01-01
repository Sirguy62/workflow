"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import EditWorkflowModal from "./EditWorkflowModal";

export default function WorkflowCard({ workflow }) {
  const router = useRouter();
  const [openEdit, setOpenEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete(e) {
    e.stopPropagation();

    if (!confirm("Delete this workflow? This cannot be undone.")) return;

    setLoading(true);

    await fetch("/api/workflows", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: workflow.id }),
    });

    router.refresh(); // ✅ re-fetch workflows
  }

  function handleEdit(e) {
    e.stopPropagation();
    setOpenEdit(true);
  }

  return (
    <>
      <div
        onClick={() => router.push(`/workflows/${workflow.id}`)}
        className="border rounded-lg p-4 cursor-pointer hover:shadow transition"
      >
        <h2 className="font-semibold text-gray-600">{workflow.name}</h2>

        <p className="text-sm text-gray-600">
          {workflow.description || "No description"}
        </p>

        {/* ACTIONS */}
        <div className="flex gap-4 mt-3 text-sm">
          <button
            onClick={handleEdit}
            className="text-blue-600 hover:underline"
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="text-red-600 hover:underline disabled:opacity-50"
          >
            Delete
          </button>
        </div>
      </div>

      {/* EDIT MODAL */}
      {openEdit && (
        <EditWorkflowModal
          workflow={workflow}
          onClose={() => setOpenEdit(false)}
          onSave={() => {
            setOpenEdit(false);
            router.refresh();
          }}
          onDelete={() => handleDelete(new Event("click"))}
        />
      )}
    </>
  );
}
