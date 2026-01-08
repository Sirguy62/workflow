function StatCard({ label, value, color, icon }) {
  return (
    <div className="border rounded-xl p-4 bg-white">
      <div className="flex items-center gap-2 mb-1">
        <span className={`w-3 h-3 rounded-full border ${color}`} />
        <span className="text-sm text-gray-500">{label}</span>
      </div>

      <div className={`text-2xl font-bold ${color}`}>
        {icon && <span className="mr-1">{icon}</span>}
        {value}
      </div>
    </div>
  );
}
