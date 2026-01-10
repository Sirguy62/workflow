"use client";

function StatCard({ label, value, color }) {
  return (
    <div className="bg-white border rounded-xl p-4">
      <p className="text-sm text-gray-500">{label}</p>
      <p className={`text-2xl font-semibold ${color}`}>{value}</p>
    </div>
  );
}

export default function TaskStatistics({ tasks = [] }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = tasks.filter((t) => !t.completed).length;

  const completionRate =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="bg-white border rounded-xl p-4 space-y-4">
      <h4 className="font-semibold text-gray-700">Task Statistics</h4>

      {/* STATS GRID */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard label="Total Tasks" value={total} color="text-purple-600" />
        <StatCard label="Completed" value={completed} color="text-green-600" />
        <StatCard label="Pending" value={pending} color="text-purple-600" />
        <StatCard
          label="Completion Rate"
          value={`${completionRate}%`}
          color="text-purple-600"
        />
      </div>

      {/* PROGRESS BAR */}
      <div>
        <div className="flex justify-between text-sm text-gray-500 mb-1">
          <span>Task progress</span>
          <span>
            {completed}/{total}
          </span>
        </div>

        <div className="w-full h-2 bg-purple-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-purple-500 transition-all duration-500"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>
    </div>
  );
}
