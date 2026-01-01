"use client";

import { useState } from "react";
import CreateWorkflowModal from "./CreateWorkflowModal";
import WorkflowCard from "./WorkflowCard";

export default function WorkflowList({ workflows }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between mb-4">
          <h1 className="text-2xl text-gray-600 font-bold">Workflows</h1>
       
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + New Workflow
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {workflows.map((wf) => (
          <WorkflowCard key={wf.id} workflow={wf} />
        ))}
      </div>

      {open && <CreateWorkflowModal onClose={() => setOpen(false)} />}
    </>
  );
}
