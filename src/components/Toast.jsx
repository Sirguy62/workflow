"use client";

export default function Toast({ message, type = "success", onClose }) {
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded shadow text-white
        ${type === "error" ? "bg-red-600" : "bg-green-600"}`}
    >
      <div className="flex items-center gap-3">
        <span>{message}</span>
        <button onClick={onClose} className="font-bold">
          ×
        </button>
      </div>
    </div>
  );
}
