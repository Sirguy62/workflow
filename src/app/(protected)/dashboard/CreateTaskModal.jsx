"use client";

import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { LuCalendarClock } from "react-icons/lu";
import { IoFlagOutline } from "react-icons/io5";
import { RiMenu2Line } from "react-icons/ri";
import { TbPlaylistAdd } from "react-icons/tb";

export default function CreateTaskModal({ onClose, onCreate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      id: crypto.randomUUID(),
      title,
      description,
      priority,
      dueDate: dueDate || null,
      createdAt: new Date().toISOString(),
    };

    onCreate(newTask);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <form
        onSubmit={submit}
        className="bg-white rounded-xl w-95 lg:w-112.5 p-6 space-y-4"
      >
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-md text-gray-700">Create Task</h2>
          <button type="button" onClick={onClose} className="text-gray-700">
            <IoMdClose size={20} />
          </button>
        </div>

        {/* TITLE */}
        <div>
          <label className="block font-medium text-sm text-gray-700 mb-1">
            Task Details
          </label>
          <input
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-purple-300/40 p-2 rounded w-full text-gray-600 text-sm"
            autoFocus
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <div className="flex items-center gap-1 mb-1">
            <RiMenu2Line className="text-purple-500" size={18} />
            <label className="font-medium text-sm text-gray-700">
              Description
            </label>
          </div>
          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-purple-300/40 p-2 rounded w-full text-gray-600 text-sm"
          />
        </div>

        {/* PRIORITY + DATE */}
        <div className="flex gap-6">
          {/* PRIORITY */}
          <div className="w-full">
            <div className="flex items-center gap-1 mb-1">
              <IoFlagOutline className="text-purple-500" size={18} />
              <label className="font-medium text-sm text-gray-700">
                Priority
              </label>
            </div>

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className={`
                border border-purple-300/40 p-2 rounded w-full text-sm font-medium
                ${
                  priority === "Low"
                    ? "bg-green-50 text-green-700"
                    : priority === "Medium"
                    ? "bg-purple-50 text-purple-700"
                    : "bg-pink-50 text-pink-700"
                }
              `}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* DUE DATE */}
          <div className="w-full">
            <div className="flex items-center gap-1 mb-1">
              <LuCalendarClock className="text-purple-500" size={18} />
              <label className="font-medium text-sm text-gray-700">
                Due Date
              </label>
            </div>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="border border-purple-300/40 p-2 rounded w-full text-sm text-gray-600"
            />
          </div>
        </div>

        {/* SUBMIT */}
        <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg w-full mt-2">
          <TbPlaylistAdd size={18} />
          Create Task
        </button>
      </form>
    </div>
  );
}
