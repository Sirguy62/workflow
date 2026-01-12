import {
  FiFilter,
  FiArrowDown,
  FiArrowUp,
  FiAlertCircle,
} from "react-icons/fi";
import { FaSortAmountUpAlt } from "react-icons/fa";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { TbMedal2 } from "react-icons/tb";

const sortOptions = [
  {
    label: "Newest",
    value: "newest",
    icon: <FaSortAmountUpAlt />,
  },
  {
    label: "Oldest",
    value: "oldest",
    icon: <FaSortAmountDownAlt />,
  },
  {
    label: "Priority",
    value: "priority",
    icon: <TbMedal2 />,
  },
];

export default function SortBar({ sort, setSort }) {
  return (
    <div className="flex items-center gap-2 w-full md:w-auto">
      <div className="flex md:hidden items-center justify-between gap-2 bg-white border rounded-xl px-3 py-2 shadow-sm w-full">
        <div className="flex items-center p-3">
          <FiFilter className="text-purple-500" />
          <span className="text-sm font-bold text-gray-700">Sort By:</span>
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-transparent text-sm text-gray-700 focus:outline-none "
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="hidden md:flex items-center  bg-white border rounded-xl px-3 py-4 shadow-sm">
        <FiFilter className="text-purple-500" />
        <span className="text-sm font-bold text-gray-700">Sort By:</span>

        {sortOptions.map((opt) => (
          <div key={opt.value} className="p-1 bg-purple-300/10 rounded">
            <button
              onClick={() => setSort(opt.value)}
              className={`flex items-center gap-1 px-4 py-1 rounded-lg text-sm transition
              ${
                sort === opt.value
                  ? "bg-white text-purple-600 font-medium shadow-lg shadow-purple-300/40"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {opt.icon}
              {opt.label}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
