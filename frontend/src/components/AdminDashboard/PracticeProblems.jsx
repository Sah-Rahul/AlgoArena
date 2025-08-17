import { useState } from "react";
import Layout from "./Layout";
import { FiSearch } from "react-icons/fi";
import { FaPlus, FaSortAlphaDown, FaRegBookmark } from "react-icons/fa";
import problemData from "../../problemData/problemdata.json";

const PracticeProblems = () => {
  const [open, setOpen] = useState(false); 
  const [sortBy, setSortBy] = useState("Default");

  const handleSelect = (option) => {
    setSortBy(option);
    setOpen(false);
  };

  // Sort problemData based on sortBy
  const sortedProblems = [...problemData].sort((a, b) => {
    if (sortBy === "Easy") return a.difficulty === "Easy" ? -1 : 1;
    if (sortBy === "Medium") return a.difficulty === "Medium" ? -1 : 1;
    if (sortBy === "Hard") return a.difficulty === "Hard" ? -1 : 1;
    return 0; 
  });

  return (
    <Layout>
      <div className="p-6 bg-black min-h-screen text-white">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
          <h2 className="text-xl font-semibold">Practice Problems</h2>
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search */}
            <div className="flex items-center bg-[#1e1e1e] rounded-lg px-3 py-2 w-full md:w-72">
              <input
                type="text"
                placeholder="Search problems or tags..."
                className="bg-transparent outline-none ml-2 w-full text-sm"
              />
              <FiSearch className="text-gray-400" />
            </div>
            {/* Sort */}
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center cursor-pointer gap-2 bg-[#1e1e1e] rounded-lg px-4 py-2 text-sm hover:bg-[#2a2a2a]"
              >
                <FaSortAlphaDown className="text-yellow-500" />
                Sort: {sortBy}
              </button>
              {open && (
                <div className="absolute mt-2 w-40 bg-[#1e1e1e] rounded-lg shadow-lg">
                  <button
                    onClick={() => handleSelect("Default")}
                    className="block cursor-pointer w-full text-left px-4 py-2 hover:bg-[#2a2a2a] text-white"
                  >
                    Default
                  </button>
                  <button
                    onClick={() => handleSelect("Easy")}
                    className="block cursor-pointer w-full text-left px-4 py-2 hover:bg-[#2a2a2a] text-white"
                  >
                    Easy
                  </button>
                  <button
                    onClick={() => handleSelect("Medium")}
                    className="block cursor-pointer w-full text-left px-4 py-2 hover:bg-[#2a2a2a] text-white"
                  >
                    Medium
                  </button>
                  <button
                    onClick={() => handleSelect("Hard")}
                    className="block w-full text-left px-4 py-2 hover:bg-[#2a2a2a] text-white"
                  >
                    Hard
                  </button>
                </div>
              )}
            </div>

            {/* My Sheets */}
            <button className="bg-[#1e1e1e] cursor-pointer rounded-lg px-4 py-2 text-sm hover:bg-[#2a2a2a]">
              My Sheets
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#1e1e1e] text-gray-300">
                <th className="text-left py-3 px-4">Problems</th>
                <th className="text-left py-3 px-4">Difficulty</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Notes</th>
                <th className="text-left py-3 px-4">Add to Sheets</th>
                <th className="text-left py-3 px-4">Solve</th>
              </tr>
            </thead>
            <tbody>
              {sortedProblems.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-[#2a2a2a] hover:bg-[#1a1a1a] transition"
                >
                  {/* Problem */}
                  <td className="py-3 px-4">
                    <div className="flex flex-col">
                      <span className="font-medium flex items-center gap-2">
                        {p.title}
                        {p.badge && (
                          <span className="bg-white text-black text-xs px-2 py-0.5 rounded-md flex items-center gap-1">
                            {p.badge}
                            <span className="text-orange-500">●</span>
                          </span>
                        )}
                      </span>
                      <div className="flex flex-wrap gap-2 text-xs text-gray-400 mt-1">
                        {p.tags.map((t, i) => (
                          <span
                            key={i}
                            className="bg-[#2a2a2a] px-2 py-0.5 rounded-md"
                          >
                            {t}
                          </span>
                        ))}
                        {p.more && (
                          <span className="bg-[#2a2a2a] px-2 py-0.5 rounded-md">
                            {p.more}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  {/* Difficulty */}
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-md text-xs ${
                        p.difficulty === "Easy"
                          ? "bg-green-900 text-green-400"
                          : "bg-yellow-900 text-yellow-400"
                      }`}
                    >
                      {p.difficulty}
                    </span>
                  </td>
                  {/* Status */}
                  <td className="py-3 px-4 text-gray-400">{p.status}</td>
                  {/* Notes */}
                  <td className="py-3 px-4 text-gray-400">
                    <FaPlus className="cursor-pointer hover:text-white" />
                  </td>
                  {/* Add to Sheets */}
                  <td className="py-3 px-4 text-gray-400">
                    <FaRegBookmark className="cursor-pointer hover:text-white" />
                  </td>
                  {/* Solve */}
                  <td className="py-3 px-4">
                    <button className="px-4 py-1 bg-yellow-500 text-black rounded-md text-sm font-medium hover:bg-yellow-400">
                      Solve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default PracticeProblems;