import TopBar from "./TopBar";
import { TbHomeSearch } from "react-icons/tb";
import { BsFire } from "react-icons/bs";

export default function StatsCards({ tasks, onMenuClick, onAddTask }) {
  const stats = [
    {
      label: "Total Tasks",
      value: tasks.length,
      icon: <TbHomeSearch size={30} />,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      label: "Low Priority",
      value: tasks.filter((t) => t.priority === "Low").length,
      icon: <BsFire size={28} />,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Medium Priority",
      value: tasks.filter((t) => t.priority === "Medium").length,
      icon: <BsFire size={28} />,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      label: "High Priority",
      value: tasks.filter((t) => t.priority === "High").length,
      icon: <BsFire size={28} />,
      color: "text-red-600",
      bg: "bg-red-50",
    },
  ];

  return (
    <div>
      <TopBar onMenuClick={onMenuClick} onAddTask={onAddTask} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-xl p-4 border hover:shadow transition"
          >
            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-lg ${s.bg} ${s.color}`}>
                {s.icon}
              </div>

              <div>
                <p className={`text-2xl font-semibold ${s.color}`}>{s.value}</p>
                <p className="text-sm text-gray-500">{s.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
