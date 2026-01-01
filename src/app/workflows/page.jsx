import { getWorkflows } from "../../../lib/workflow.service";
import WorkflowList from "./WorkflowList";

export const dynamic = "force-dynamic";

export default async function WorkflowsPage() {
  const workflows = await getWorkflows();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <WorkflowList workflows={workflows} />
    </div>
  );
}
