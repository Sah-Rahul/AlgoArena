import { useState } from "react";
import Navbar from "../Components/Navbar";
import { useThemeContext } from "../context/ThemeContext";
import practice from "../pages/problems.json";
import { MdFilterAltOff } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const Practice = () => {
  const { theme } = useThemeContext();
  const isDark = theme === "dark";
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div
      className={`min-h-screen ${
        isDark ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <Navbar />

      {/* Main Content */}
      <div className="pt-36 px-4">
        <div className="max-w-7xl  mx-auto flex flex-col lg:flex-row gap-6">
          {/* Mobile Filter Toggle Button - Only visible on mobile */}
          <div className="lg:hidden mb-4 absolute top-[241px] left-42">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex w-[120px] bg-yellow-500   items-center gap-2 px-4 py-2 rounded-lg border ${
                isDark
                  ? "bg-[#1a1a1a] border-gray-600 text-white hover:bg-[#2a2a2a]"
                  : "bg-gray-100 border-gray-300 text-black hover:bg-gray-200"
              }`}
            >
              <MdFilterAltOff />
              Filters
            </button>
          </div>

          <>
            {/* Overlay for mobile */}
            {isFilterOpen && (
              <div
                className="lg:hidden  fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={() => setIsFilterOpen(false)}
              />
            )}

            {/* Sidebar */}
            <aside
              className={`w-full lg:w-64 shrink-0 rounded-lg p-4 sticky top-[100px] space-y-8 transition-all duration-300 z-50
                ${
                  isDark
                    ? "bg-[#111111] border border-[#2e2e2e] text-gray-300"
                    : "bg-gray-100 border border-gray-300 text-gray-700"
                }
                ${
                  isFilterOpen
                    ? "block fixed inset-y-0 left-0 w-80 h-full overflow-y-auto lg:static lg:w-64 lg:h-auto"
                    : "hidden lg:block"
                }
              `}
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-sm uppercase font-semibold tracking-wide text-gray-400">
                  Filters
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    className={`text-xl hover:underline ${
                      isDark ? "text-yellow-400" : "text-yellow-600"
                    }`}
                  >
                    Clear All
                  </button>

                  {/* Close button - only visible on mobile */}
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className={`lg:hidden p-1 rounded hover:bg-gray-700 ${
                      isDark
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-600 hover:text-black"
                    }`}
                  >
                    <span className="p-2 rounded-full border border-gray-500 hover:bg-gray-700 transition-colors duration-200 text-white">
                      <RxCross2 className="h-6 w-6" />
                    </span>
                  </button>
                </div>
              </div>

              {/* Companies */}
              <div>
                <h3 className="text-sm font-semibold mb-2">
                  {isDark ? "Companies" : "Our Partners"}
                </h3>
                <ul className="space-y-1 text-sm">
                  {[
                    "Google",
                    "Amazon",
                    "TCS",
                    "Microsoft",
                    "Oracle",
                    "Atlassian",
                  ].map((company) => (
                    <li key={company}>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className={`form-checkbox ${
                            isDark
                              ? "bg-gray-800 border-gray-600"
                              : "bg-white border-gray-400"
                          }`}
                        />
                        {company}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Topics */}
              <div>
                <h3 className="text-sm font-semibold mb-2 text-gray-400">
                  Topics
                </h3>
                <ul className="space-y-1 text-sm">
                  {[
                    "Array",
                    "String",
                    "Two Pointers",
                    "Dynamic Programming",
                    "Math",
                    "DFS",
                  ].map((tag) => (
                    <li key={tag}>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className={`form-checkbox ${
                            isDark
                              ? "bg-gray-800 border-gray-600"
                              : "bg-white border-gray-400"
                          }`}
                        />
                        {tag}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Apply button for mobile */}
              <div className="lg:hidden pt-4 border-t border-gray-600">
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-md text-sm font-medium"
                >
                  Apply Filters
                </button>
              </div>
            </aside>
          </>

          {/* Main Content */}
          <main className="flex-1 overflow-x-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <h1 className="text-2xl text-yellow-500 font-semibold">
                {isDark ? "Practice" : "Problem"}
              </h1>

              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="text"
                  placeholder="Search problems or tags..."
                  className={`px-4 py-2 rounded-md text-sm w-full sm:w-64
                    ${
                      isDark
                        ? "bg-[#1a1a1a] border border-gray-600 text-white placeholder-gray-400"
                        : "bg-gray-100 border border-gray-300 text-black placeholder-gray-500"
                    }`}
                />

                <div className="w-[140px] relative">
                  <select
                    id="sort"
                    name="sort"
                    defaultValue=""
                    className="block w-full rounded-lg border border-gray-300 bg-transparent text-white py-2 px-4 shadow-md appearance-none
      focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500
      hover:shadow-lg transition duration-200 cursor-pointer"
                  >
                    <option value="easy" className="text-black">
                      Easy
                    </option>
                    <option value="medium" className="text-black">
                      Medium
                    </option>
                    <option value="hard" className="text-black">
                      Hard
                    </option>
                  </select>
                </div>
              </div>
            </div>

            {/* Table Header */}
            <div
              className={`hidden sm:grid grid-cols-5 text-sm px-4 py-2 border-b ${
                isDark
                  ? "text-gray-400 border-gray-700"
                  : "text-gray-600 border-gray-300"
              }`}
            >
              <div>Problems</div>
              <div>Difficulty</div>
              <div>Status</div>
              <div>Tags</div>
              <div className="text-right">Solve</div>
            </div>

            {/* Problem Rows */}
            {practice.map((problem) => (
              <div
                key={problem.id}
                className={`flex flex-col sm:grid sm:grid-cols-5 items-start sm:items-center px-4 py-4 border-b gap-2 hover:bg-[#111]
                  ${
                    isDark
                      ? "border-gray-800 text-white"
                      : "border-gray-200 text-black hover:bg-gray-200"
                  }`}
              >
                <div>
                  <div className="cursor-pointer font-medium">
                    {problem.title}
                  </div>
                  <div
                    className={`text-sm break-words ${
                      isDark ? "text-yellow-400" : "text-yellow-600"
                    }`}
                  >
                    {problem.companies.join(", ")}
                  </div>
                </div>

                <div>
                  <span
                    className={`text-sm ${
                      problem.difficulty === "Easy"
                        ? "text-green-400"
                        : problem.difficulty === "Medium"
                        ? "text-yellow-400"
                        : "text-red-400"
                    }`}
                  >
                    {problem.difficulty}
                  </span>
                </div>

                <div>
                  <span
                    className={`text-sm ${
                      problem.status === "Solved"
                        ? "text-green-500"
                        : isDark
                        ? "text-gray-400"
                        : "text-gray-600"
                    }`}
                  >
                    {problem.status === "Solved" ? "✔ Solved" : "Unsolved"}
                  </span>
                </div>

                <div
                  className={`text-sm break-words ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {problem.tags.join(", ")}
                </div>

                <div className="sm:text-right w-full sm:w-auto">
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-1 rounded-md text-sm font-semibold w-full sm:w-auto">
                    Solve
                  </button>
                </div>
              </div>
            ))}

            {/* Pagination */}
            <div className="mt-10 flex justify-end flex-wrap gap-2">
              <button
                className={`px-3 py-2 rounded ${
                  isDark
                    ? "text-white hover:bg-gray-700"
                    : "text-black hover:bg-gray-300"
                }`}
              >
                &larr;
              </button>
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  className={`px-4 py-2 rounded-md text-sm border ${
                    isDark
                      ? "bg-[#1a1a1a] border-gray-600 text-white hover:bg-gray-700"
                      : "bg-gray-100 border-gray-300 text-black hover:bg-gray-300"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                className={`px-3 py-2 rounded ${
                  isDark
                    ? "text-white hover:bg-gray-700"
                    : "text-black hover:bg-gray-300"
                }`}
              >
                &rarr;
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Practice;
