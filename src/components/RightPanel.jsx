import TaskStatistics from "@/components/TaskStatistics";
import RecentActivity from "./RecentActivity";

export default function RightPanel({ tasks }) {
  return (
    <aside className="w-80 space-y-6">
      <TaskStatistics tasks={tasks} />

      <div className="bg-white border rounded-xl p-4">
        <RecentActivity tasks={tasks} />
      </div>
    </aside>
  );
}
