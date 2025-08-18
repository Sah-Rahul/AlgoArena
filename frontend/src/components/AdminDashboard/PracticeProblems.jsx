import { useState } from "react";
import Layout from "./Layout";
import { FiSearch } from "react-icons/fi";
import { FaPlus, FaSortAlphaDown, FaRegBookmark } from "react-icons/fa";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import problemData from "../../problemData/problemdata.json";
import companiesData from "../../problemData/companies.json";

const topicsData = [
  { name: "Array", count: 24 },
  { name: "String", count: 7 },
  { name: "Two Pointers", count: 6 },
  { name: "Dynamic Programming", count: 6 },
  { name: "Math", count: 5 },
  { name: "DFS", count: 5 },
];

const PracticeProblems = () => {
  const [openSort, setOpenSort] = useState(false);
  const [sortBy, setSortBy] = useState("Default");
  const [activeTab, setActiveTab] = useState("companies");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const problemsPerPage = 10;

  const handleSortSelect = (option) => {
    setSortBy(option);
    setOpenSort(false);
  };

  let filteredProblems = problemData;

  if (selectedCompany) {
    filteredProblems = filteredProblems.filter((p) =>
      p.tags.includes(selectedCompany)
    );
  }

  if (selectedTopic) {
    filteredProblems = filteredProblems.filter((p) =>
      p.tags.includes(selectedTopic)
    );
  }

  if (statusFilter !== "All") {
    filteredProblems = filteredProblems.filter((p) =>
      statusFilter === "Solved" ? p.status === "Solved" : p.status !== "Solved"
    );
  }

  const sortedProblems = [...filteredProblems].sort((a, b) => {
    if (sortBy === "Easy") return a.difficulty === "Easy" ? -1 : 1;
    if (sortBy === "Medium") return a.difficulty === "Medium" ? -1 : 1;
    if (sortBy === "Hard") return a.difficulty === "Hard" ? -1 : 1;
    return 0;
  });

  // Pagination logic
  const indexOfLast = currentPage * problemsPerPage;
  const indexOfFirst = indexOfLast - problemsPerPage;
  const currentProblems = sortedProblems.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(sortedProblems.length / problemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedCompany(null);
    setSelectedTopic(null);
    setCurrentPage(1);
  };

  return (
    <Layout>
      <div className="p-6 bg-[#130a0ab9] min-h-screen text-white">
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
                onClick={() => setOpenSort(!openSort)}
                className="flex items-center cursor-pointer gap-2 bg-[#1e1e1e] rounded-lg px-4 py-2 text-sm hover:bg-[#2a2a2a]"
              >
                <FaSortAlphaDown className="text-yellow-500" />
                Sort: {sortBy}
              </button>
              {openSort && (
                <div className="absolute mt-2 w-40 bg-[#1e1e1e] rounded-lg shadow-lg z-10">
                  {["Default", "Easy", "Medium", "Hard"].map((option) => (
                    <button
                      key={option}
                      onClick={() => handleSortSelect(option)}
                      className="block cursor-pointer w-full text-left px-4 py-2 hover:bg-[#2a2a2a] text-white"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button className="bg-[#1e1e1e] cursor-pointer rounded-lg px-4 py-2 text-sm hover:bg-[#2a2a2a]">
              My Sheets
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-4 border-b border-gray-700 flex gap-4">
          <button
            onClick={() => handleTabChange("companies")}
            className={`cursor-pointer pb-2 font-semibold ${
              activeTab === "companies"
                ? "border-b-2 border-yellow-500 text-yellow-500"
                : "text-gray-400 hover:text-yellow-500"
            }`}
          >
            Companies
          </button>
          <button
            onClick={() => handleTabChange("topics")}
            className={`cursor-pointer pb-2 font-semibold ${
              activeTab === "topics"
                ? "border-b-2 border-yellow-500 text-yellow-500"
                : "text-gray-400 hover:text-yellow-500"
            }`}
          >
            Topics
          </button>
        </div>

        {/* Selected filter */}
        <div className="mb-3 text-yellow-400 font-semibold">
          {activeTab === "companies" && selectedCompany && (
            <>Selected Company: {selectedCompany}</>
          )}
          {activeTab === "topics" && selectedTopic && (
            <>Selected Topic: {selectedTopic}</>
          )}
          {!selectedCompany && !selectedTopic && (
            <>Select a {activeTab === "companies" ? "Company" : "Topic"}</>
          )}
        </div>

        {/* Filters */}
        <div className="bg-[#000] py-4 mb-4 px-6">
          <div className="flex flex-wrap gap-4 justify-center items-center">
            {activeTab === "companies" &&
              companiesData.map((company) => (
                <button
                  key={company}
                  onClick={() =>
                    setSelectedCompany(
                      selectedCompany === company ? null : company
                    )
                  }
                  className={`cursor-pointer font-semibold px-4 py-2 rounded-md text-sm transition-all ${
                    selectedCompany === company
                      ? "bg-yellow-500 text-black"
                      : "bg-white/90 text-black hover:bg-yellow-400"
                  }`}
                >
                  {company}
                </button>
              ))}

            {activeTab === "topics" &&
              topicsData.map((topic) => (
                <button
                  key={topic.name}
                  onClick={() =>
                    setSelectedTopic(
                      selectedTopic === topic.name ? null : topic.name
                    )
                  }
                  className={`cursor-pointer font-semibold px-4 py-2 rounded-md text-sm transition-all flex items-center gap-2 ${
                    selectedTopic === topic.name
                      ? "bg-yellow-500 text-black"
                      : "bg-white/90 text-black hover:bg-yellow-400"
                  }`}
                >
                  {topic.name}
                  <span className="text-gray-600">({topic.count})</span>
                </button>
              ))}
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
              {currentProblems.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-gray-400">
                    No problems found for selected filters.
                  </td>
                </tr>
              )}
              {currentProblems.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-[#2a2a2a] hover:bg-[#1a1a1a] transition"
                >
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
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-md text-xs ${
                        p.difficulty === "Easy"
                          ? "bg-green-900 text-green-400"
                          : p.difficulty === "Medium"
                          ? "bg-yellow-900 text-yellow-400"
                          : "bg-red-900 text-red-400"
                      }`}
                    >
                      {p.difficulty}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-400">{p.status}</td>
                  <td className="py-3 px-4 text-gray-400">
                    <FaPlus className="cursor-pointer hover:text-white" />
                  </td>
                  <td className="py-3 px-4 text-gray-400">
                    <FaRegBookmark className="cursor-pointer hover:text-white" />
                  </td>
                  <td className="py-3 px-4">
                    <button className="px-4 cursor-pointer py-1 border-1 border-yellow-500 rounded-md text-sm font-medium hover:bg-yellow-400">
                      Solve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-5 flex items-center justify-end gap-3">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`h-10 w-10 flex items-center justify-center rounded-full ${
              currentPage === 1 ? "opacity-30" : "hover:bg-[#2a2a2a]"
            }`}
          >
            <IoIosArrowBack className="text-yellow-500 cursor-pointer text-3xl" />
          </button>
          <span className="text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`h-10 w-10 flex items-center justify-center rounded-full ${
              currentPage === totalPages ? "opacity-30" : "hover:bg-[#2a2a2a]"
            }`}
          >
            <IoIosArrowForward className="text-yellow-500 cursor-pointer text-3xl" />
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default PracticeProblems;
