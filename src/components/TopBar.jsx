export default function TopBar() {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">Task Overview</h2>
        <p className="text-sm text-gray-500">Manage your tasks efficiently</p>
      </div>

      <button className="bg-linear-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg">
        + Add New Task
      </button>
    </div>
  );
}
