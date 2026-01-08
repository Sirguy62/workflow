"use client";

import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { LuCalendarClock } from "react-icons/lu";
import { IoFlagOutline } from "react-icons/io5";
import { RiMenu2Line } from "react-icons/ri";
import { TbPlaylistAdd } from "react-icons/tb";

export default function EditTaskModal({ task, onClose, onSave }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [priority, setPriority] = useState(task.priority);
  const [dueDate, setDueDate] = useState(task.dueDate || "");

  function submit(e) {
    e.preventDefault();

    onSave({
      ...task,
      title,
      description,
      priority,
      dueDate,
    });

    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <form
        onSubmit={submit}
        className="bg-white rounded-xl w-105 p-6 space-y-4"
      >
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-md text-gray-700">Edit Task</h2>
          <button type="button" onClick={onClose} className="text-gray-700">
            <IoMdClose size={20} />
          </button>
        </div>
        <div className="w-full">
          <label className="block font-medium text-sm text-gray-700 mb-1">
            Task Details
          </label>
          <input
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-purple-300/40 p-2 rounded w-full text-gray-500 text-sm"
          />
        </div>
        <div className="w-full">
          <div className="flex justify-start items-center mb-1 gap-1">
            <span className="flex justify-center items-center text-purple-500">
              <RiMenu2Line size={20} />
            </span>
            <label className="block font-medium text-sm text-gray-700">
              Description
            </label>
          </div>
          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border  border-purple-300/40 p-2 rounded w-full text-gray-500 text-sm"
          />
        </div>

        <div className="flex justify-center items-center gap-6">
          <div className="w-full">
            <div className="flex justify-start items-center mb-1 gap-1">
              <span className="flex justify-center items-center text-purple-500">
                <IoFlagOutline size={20} />
              </span>
              <label className="block font-medium text-sm text-gray-700">
                Priority
              </label>
            </div>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className={`
    border  border-purple-300/40 p-2 rounded w-full text-sm font-medium
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

          <div className="w-full">
            <div className="flex justify-start items-center mb-1 gap-1">
              <span className="flex justify-center items-center text-purple-500">
                <LuCalendarClock size={20} />
              </span>
              <label className="block font-medium text-sm text-gray-700">
                Due Date
              </label>
            </div>
            <input
              type="date"
              value={dueDate || ""}
              onChange={(e) => setDueDate(e.target.value)}
              className="border  border-purple-300/40 p-2 rounded w-full text-sm text-gray-600"
            />
          </div>
        </div>

        <div className="flex w-full">
          <button className="flex items-center justify-center bg-linear-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg w-full my-2">
            <TbPlaylistAdd size={20}/>
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
}
