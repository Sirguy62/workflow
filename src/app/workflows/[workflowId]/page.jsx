import { getWorkflowById } from "../../../../lib/workflow.service"; 
import Board from "./Board";
import { notFound } from "next/navigation";

export default async function WorkflowPage({ params }) {
  // ✅ Next.js 16 requires this
  const { workflowId } = await params;

  if (!workflowId) {
    notFound();
  }

  const workflow = await getWorkflowById(workflowId);

  if (!workflow) {
    notFound();
  }

  return (
    <div className="px-3 py-2">
      <Board workflow={workflow} />
    </div>
  );
}
