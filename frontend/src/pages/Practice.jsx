import { useEffect, useMemo, useState } from "react";
import Navbar from "../Components/Navbar";
import { useThemeContext } from "../context/ThemeContext";
import { MdFilterAltOff, MdSort } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { FiEdit3 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { useProblemStore } from "../store/useProblemStore";

// Loader (kept simple)
const Loader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
  </div>
);

const Practice = () => {
  const { theme } = useThemeContext();
  const isDark = theme === "dark";

  // UI state
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all"); // all | EASY | MEDIUM | HARD
  const [companiesSelected, setCompaniesSelected] = useState([]); // array of strings
  const [topicsSelected, setTopicsSelected] = useState([]); // array of strings
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // change if you want

  // store (API)
  const { getAllProblems, problems = [], isProblemLoading } = useProblemStore();

  useEffect(() => {
    getAllProblems();
  }, [getAllProblems]);

  // Debounce search input
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => clearTimeout(t);
  }, [search]);

  // derive unique companies & topics from API data (so sidebar is dynamic)
  const uniqueCompanies = useMemo(() => {
    const s = new Set();
    (problems || []).forEach((p) => {
      (p.companies || []).forEach((c) => s.add(c));
    });
    return Array.from(s).sort();
  }, [problems]);

  const uniqueTopics = [
  "Arrays",
  "Linked List",
  "Trees",
  "Graphs",
  "Dynamic Programming",
  "Greedy",
  "Recursion",
  "Backtracking",
  "Math",
  "Bit Manipulation",
];

console.log(problems)
  // toggle helpers
  const toggleCompany = (company) =>
    setCompaniesSelected((prev) =>
      prev.includes(company) ? prev.filter((c) => c !== company) : [...prev, company]
    );

  const toggleTopic = (topic) =>
    setTopicsSelected((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );

  const clearAllFilters = () => {
    setSearch("");
    setDebouncedSearch("");
    setDifficultyFilter("all");
    setCompaniesSelected([]);
    setTopicsSelected([]);
    setCurrentPage(1);
  };

  // Filtering pipeline (memoized)
  const filteredProblems = useMemo(() => {
    let arr = (problems || []).slice();

    // search (title, tags, companies, description) - case insensitive
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      arr = arr.filter((p) => {
        const title = (p.title || "").toLowerCase();
        const desc = (p.description || "").toLowerCase();
        const tags = (p.tags || []).join(" ").toLowerCase();
        const comps = (p.companies || []).join(" ").toLowerCase();
        return title.includes(q) || desc.includes(q) || tags.includes(q) || comps.includes(q);
      });
    }

    // difficulty filter
    if (difficultyFilter && difficultyFilter !== "all") {
      const want = difficultyFilter.toString().toLowerCase();
      arr = arr.filter((p) => (p.difficulty || "").toString().toLowerCase() === want);
    }

    // companies filter (if user selected any, include problems that match ANY selected company)
    if (companiesSelected.length > 0) {
      arr = arr.filter((p) =>
        (p.companies || []).some((c) => companiesSelected.includes(c))
      );
    }

    // topics/tags filter (if user selected any, include problems that match ANY selected topic)
    if (topicsSelected.length > 0) {
      arr = arr.filter((p) => (p.tags || []).some((t) => topicsSelected.includes(t)));
    }

    // optional: stable sort by createdAt desc (if present) or keep original order
    arr.sort((a, b) => {
      // if createdAt exists, sort newest first
      if (a.createdAt && b.createdAt) return new Date(b.createdAt) - new Date(a.createdAt);
      return 0;
    });

    return arr;
  }, [problems, debouncedSearch, difficultyFilter, companiesSelected, topicsSelected]);

  // pagination
  const totalPages = Math.max(1, Math.ceil(filteredProblems.length / itemsPerPage));
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [totalPages, currentPage]);

  const currentList = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProblems.slice(start, start + itemsPerPage);
  }, [filteredProblems, currentPage]);

  // basic handlers
  const handleEdit = (id) => {
    // redirect or open modal
    console.log("edit", id);
  };
  const handleDelete = (id, title) => {
    if (confirm(`Delete "${title}" ?`)) {
      console.log("delete", id);
      // call delete action
    }
  };

  if (isProblemLoading) return <Loader />;

  return (
    <div className={`min-h-screen ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
      <Navbar />

      <div className="pt-36 px-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
          {/* mobile filter toggle */}
          <div className="lg:hidden mb-4 absolute top-[241px] left-42">
            <button
              onClick={() => setIsFilterOpen((s) => !s)}
              className={`flex w-[120px] items-center gap-2 px-4 py-2 rounded-lg border ${
                isDark ? "bg-[#1a1a1a] border-gray-600 text-white" : "bg-gray-100 border-gray-300 text-black"
              }`}
            >
              <MdFilterAltOff />
              Filters
            </button>
          </div>

          {/* overlay for mobile */}
          {isFilterOpen && (
            <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsFilterOpen(false)} />
          )}

          {/* sidebar */}
          <aside
            className={`w-full lg:w-64 shrink-0 rounded-lg p-4 sticky top-[100px] space-y-8 transition-all duration-300 z-50
              ${isDark ? "bg-[#111111] border border-[#2e2e2e] text-gray-300" : "bg-gray-100 border border-gray-300 text-gray-700"}
              ${isFilterOpen ? "block fixed inset-y-0 left-0 w-80 h-full overflow-y-auto lg:static lg:w-64 lg:h-auto" : "hidden lg:block"}
            `}
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-sm uppercase font-semibold tracking-wide text-gray-400">Filters</h2>
              <div className="flex items-center gap-2">
                <button onClick={clearAllFilters} className={`text-xl hover:underline ${isDark ? "text-yellow-400" : "text-yellow-600"}`}>
                  Clear All
                </button>

                <button onClick={() => setIsFilterOpen(false)} className={`lg:hidden p-1 rounded hover:bg-gray-700 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  <span className="p-2 rounded-full border border-gray-500 hover:bg-gray-700 transition-colors duration-200 text-white"><RxCross2 className="h-6 w-6" /></span>
                </button>
              </div>
            </div>

            {/* Companies (dynamic) */}
            <div>
              <h3 className="text-sm font-semibold mb-2">{isDark ? "Companies" : "Our Partners"}</h3>
              <ul className="space-y-1 text-sm max-h-48 overflow-auto pr-2">
                {uniqueCompanies.length === 0 ? (
                  <li className={`text-xs ${isDark ? "text-gray-500" : "text-gray-600"}`}>No companies</li>
                ) : (
                  uniqueCompanies.map((company) => (
                    <li key={company}>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={companiesSelected.includes(company)}
                          onChange={() => toggleCompany(company)}
                          className={`form-checkbox ${isDark ? "bg-gray-800 border-gray-600" : "bg-white border-gray-400"}`}
                        />
                        <span className="select-none">{company}</span>
                      </label>
                    </li>
                  ))
                )}
              </ul>
            </div>

            {/* Topics (dynamic) */}
            <div>
              <h3 className="text-sm font-semibold mb-2 text-gray-400">Topics</h3>
              <ul className="space-y-1 text-sm max-h-48 overflow-auto pr-2">
                {uniqueTopics.length === 0 ? (
                  <li className={`text-xs ${isDark ? "text-gray-500" : "text-gray-600"}`}>No topics</li>
                ) : (
                  uniqueTopics.map((tag) => (
                    <li key={tag}>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={topicsSelected.includes(tag)}
                          onChange={() => toggleTopic(tag)}
                          className={`form-checkbox ${isDark ? "bg-gray-800 border-gray-600" : "bg-white border-gray-400"}`}
                        />
                        <span className="select-none">{tag}</span>
                      </label>
                    </li>
                  ))
                )}
              </ul>
            </div>

            {/* Apply button for mobile */}
            <div className="lg:hidden pt-4 border-t border-gray-600">
              <button onClick={() => setIsFilterOpen(false)} className="w-full bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-md text-sm font-medium">Apply Filters</button>
            </div>
          </aside>

          {/* main content */}
          <main className="flex-1 overflow-x-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <h1 className="text-2xl text-yellow-500 font-semibold">Practice</h1>

              <div className="flex flex-wrap items-center gap-3">
                <input
                  onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                  value={search}
                  type="text"
                  placeholder="Search problems or tags..."
                  className={`px-4 py-2 rounded-md text-sm w-full sm:w-64 ${isDark ? "bg-[#1a1a1a] border border-gray-600 text-white placeholder-gray-400" : "bg-gray-100 border border-gray-300 text-black placeholder-gray-500"}`}
                />

                {/* Difficulty filter (keeps design) */}
                <div className="relative w-[140px]">
                  <select
                    id="difficulty"
                    value={difficultyFilter}
                    onChange={(e) => { setDifficultyFilter(e.target.value); setCurrentPage(1); }}
                    className={`block w-full appearance-none rounded-md py-2 px-4 pr-8 shadow-md ${
                      isDark ? "bg-yellow-500 font-semibold text-white border-orange-500" : "bg-yellow-500 text-white font-semibold border-white"
                    } focus:outline-none focus:ring-2 focus:ring-yellow-400 cursor-pointer`}
                  >
                    <option value="all" className="text-black">All Difficulty</option>
                    <option value="easy" className="text-black">Easy</option>
                    <option value="medium" className="text-black">Medium</option>
                    <option value="hard" className="text-black">Hard</option>
                  </select>

                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                    <MdSort />
                  </div>
                </div>
              </div>
            </div>

            {/* header row */}
            <div className={`hidden sm:grid grid-cols-6 text-sm px-4 py-2 border-b ${isDark ? "text-gray-400 border-gray-700" : "text-gray-600 border-gray-300"}`}>
              <div className="font-bold">Problems</div>
              <div className="font-bold">Difficulty</div>
              <div className="font-bold">Status</div>
              <div className="font-bold">Tags</div>
              <div className="text-right font-bold">Solve</div>
              <div className="text-right font-bold">Actions</div>
            </div>

            {/* list */}
            {currentList.map((problem) => (
              <div key={problem._id || problem.id}
                className={`flex flex-col sm:grid sm:grid-cols-6 items-start sm:items-center px-4 py-4 border-b gap-2 ${isDark ? "border-gray-800 text-white" : "border-gray-200 text-black hover:bg-gray-100"} hover:bg-[#111]`}
              >
                <div className="flex flex-col">
                  <div className="cursor-pointer font-medium hover:text-yellow-500 transition-colors">
                    {(problem.title || "Untitled").slice(0, 60)}{(problem.title || "").length > 60 ? "..." : ""}
                  </div>
                  <div className={`text-sm ${isDark ? "text-yellow-400" : "text-yellow-600"}`}>
                    {(problem.companies || []).slice(0, 3).join(", ")}
                  </div>
                </div>

                <div>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    (problem.difficulty || "").toString().toLowerCase() === "easy" ? "text-green-400 border border-green-700" :
                    (problem.difficulty || "").toString().toLowerCase() === "medium" ? "bg-yellow-900/20 text-yellow-400 border border-yellow-700" :
                    "bg-red-900/20 text-red-400 border border-red-700"
                  }`}>
                    {problem.difficulty || "N/A"}
                  </span>
                </div>

                <div>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${problem.status === "Solved" ? "bg-green-400 text-black border border-green-700" : isDark ? "" : "bg-gray-200 text-gray-600 border border-gray-300"}`}>
                    {problem.status === "Solved" ? "✔ Solved" : "Unsolved"}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {(problem.tags || []).length > 0 ? (problem.tags || []).slice(0, 3).map((t, i) => (
                    <span key={i} className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${isDark ? "bg-yellow-500/80" : "bg-yellow-400/60"}`}>{t}</span>
                  )) : <span className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>No tags</span>}
                  {(problem.tags || []).length > 3 && <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>+{(problem.tags || []).length - 3} more</span>}
                </div>

                <div className="sm:text-right w-full sm:w-auto">
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-1 rounded-md text-sm font-semibold w-full sm:w-auto transition-colors">Solve</button>
                </div>

                <div className="sm:text-right w-full sm:w-auto">
                  <div className="flex gap-2 justify-end">
                    <button onClick={() => handleEdit(problem._id || problem.id)} className={`p-2 rounded-md transition-colors ${isDark ? "hover:text-yellow-500" : "hover:text-yellow-500"}`} title="Edit">
                      <FiEdit3 className="text-[18px]" />
                    </button>
                    <button onClick={() => handleDelete(problem._id || problem.id, problem.title)} className={`p-2 rounded-md transition-colors ${isDark ? "hover:text-red-500" : "hover:text-red-500"}`} title="Delete">
                      <MdDeleteOutline className="text-[18px]" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* no results */}
            {filteredProblems.length === 0 && (
              <div className={`text-center py-12 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-semibold mb-2">No Problems Found</h3>
                <p>Try clearing filters or search something else.</p>
              </div>
            )}

            {/* pagination */}
            <div className="mt-8 flex items-center justify-between flex-wrap gap-4">
              <div className="text-sm text-gray-400">
                Showing <strong>{filteredProblems.length === 0 ? 0 : (currentList.length)}</strong> of <strong>{filteredProblems.length}</strong> problems
              </div>

              <div className="flex items-center gap-2">
                <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} className={`px-3 py-2 rounded ${isDark ? "text-white hover:bg-gray-700" : "text-black hover:bg-gray-300"}`}>&larr;</button>

                {Array.from({ length: totalPages }).map((_, i) => {
                  const page = i + 1;
                  return (
                    <button key={page} onClick={() => setCurrentPage(page)} className={`px-4 py-2 rounded-md text-sm border ${currentPage === page ? "bg-yellow-500 text-black" : isDark ? "bg-[#1a1a1a] border-gray-600 text-white" : "bg-gray-100 border-gray-300 text-black"}`}>
                      {page}
                    </button>
                  );
                })}

                <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} className={`px-3 py-2 rounded ${isDark ? "text-white hover:bg-gray-700" : "text-black hover:bg-gray-300"}`}>&rarr;</button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Practice;
