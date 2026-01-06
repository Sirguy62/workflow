"use client";

import { Clock } from "lucide-react";

export default function RecentActivity({ tasks }) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="bg-white border rounded-xl p-4">
        <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <Clock className="text-purple-500" size={18} />
          Recent Activity
        </h4>
        <p className="text-sm text-gray-400">No recent activity</p>
      </div>
    );
  }

  // Get latest task by createdAt
  const latest = [...tasks].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  )[0];

  const statusColor =
    latest.status === "Completed"
      ? "bg-green-100 text-green-600"
      : "bg-purple-100 text-purple-600";

  return (
    <div className="bg-white border rounded-xl p-4">
      <h4 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
        <Clock className="text-purple-500" size={18} />
        Recent Activity
      </h4>

      <div className="flex justify-between items-center">
        <div>
          <p className="font-medium text-gray-700">{latest.title}</p>
          <p className="text-sm text-gray-500">
            {new Date(latest.createdAt).toLocaleDateString()}
          </p>
        </div>

        <span
          className={`text-xs px-3 py-1 rounded-full font-medium ${statusColor}`}
        >
          {latest.status}
        </span>
      </div>
    </div>
  );
}
