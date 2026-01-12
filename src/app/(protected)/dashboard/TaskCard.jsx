"use client";

import { useState, useRef, useEffect } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { BsCalendar3 } from "react-icons/bs";
import EditTaskModal from "@/components/EditTaskModal";

export default function TaskCard({ task, onDelete, onUpdate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const menuRef = useRef(null);

  const {
    setNodeRef,
    setActivatorNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const priorityColor =
    task.priority === "High"
      ? "bg-pink-100 text-pink-600"
      : task.priority === "Medium"
      ? "bg-purple-100 text-purple-600"
      : "bg-green-100 text-green-600";

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className="bg-white border rounded-xl p-4 relative"
      >
        <div className="flex justify-between items-start mb-7">
          <div>
            <h4 className="font-medium text-gray-700">{task.title}</h4>
            {task.description && (
              <p className="text-sm text-gray-500">{task.description}</p>
            )}
          </div>

          <div className="flex flex-col items-center gap-2">
            <button
              ref={setActivatorNodeRef}
              {...attributes}
              {...listeners}
              className="cursor-grab active:cursor-grabbing text-gray-400"
              aria-label="Drag task"
            >
              Drag!!
            </button>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="text-gray-400 hover:text-gray-600"
            >
              <HiOutlineDotsVertical size={25} className="text-purple-500"/>
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center mt-3">
          <span className={`text-xs px-2 py-1 rounded ${priorityColor}`}>
            {task.priority}
          </span>

          {task.dueDate && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <BsCalendar3 />
              {new Date(task.dueDate).toLocaleDateString()}
            </div>
          )}
        </div>

        {menuOpen && (
          <div
            ref={menuRef}
            className="absolute top-12 right-4 z-50 bg-white border rounded-lg shadow-md w-40"
          >
            <button
              onClick={() => {
                setMenuOpen(false);
                setEditOpen(true);
              }}
              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2 text-gray-700"
            >
              <MdEdit className="text-purple-500"/> Edit
            </button>

            <button
              onClick={() => {
                setMenuOpen(false);
                if (!confirm("Delete this task?")) return;
                onDelete?.();
              }}
              className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
            >
              <MdDeleteOutline /> Delete
            </button>
          </div>
        )}
      </div>

      {editOpen && (
        <EditTaskModal
          task={task}
          onClose={() => setEditOpen(false)}
          onSave={onUpdate}
        />
      )}
    </>
  );
}
