export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r px-5 py-6">
      <h1 className="text-xl font-bold text-purple-600 mb-6">⚡ Taskflow</h1>

      <nav className="space-y-3">
        <button className="w-full text-left px-3 py-2 rounded bg-purple-50 text-purple-600">
          Dashboard
        </button>
        <button className="w-full text-left px-3 py-2 text-gray-600">
          Pending Tasks
        </button>
        <button className="w-full text-left px-3 py-2 text-gray-600">
          Completed Tasks
        </button>
      </nav>

      <div className="mt-10 p-4 rounded-xl bg-purple-50 text-sm text-purple-600">
        💡 Use keyboard shortcuts to boost productivity
      </div>
    </aside>
  );
}
