import { RiMenu3Fill } from "react-icons/ri";
import {
  FaChartBar,
  FaCog,
  FaCrown,
  FaFileAlt,
  FaHome,
  FaStar,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Layout = ({ children }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const sideBarMenu = [
    { key: "/admin/dashboard", icon: <FaHome />, label: "DashBoard" },
    {
      key: "/admin/practice-problems",
      icon: <FaFileAlt />,
      label: "Practice Problems",
    },
    {
      key: "/admin/my-submissions",
      icon: <FaChartBar />,
      label: "My Submissions",
    },
    {
      key: "/admin/public-sheets",
      icon: <FaFileAlt />,
      label: "Public Sheets",
    },
    { key: "/admin/saved-problems", icon: <FaStar />, label: "Saved Problems" },
    {
      key: "/admin/featured-courses",
      icon: <FaCrown />,
      label: "Featured Courses",
    },
    { key: "/admin/settings", icon: <FaCog />, label: "Settings" },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-red-500 text-white z-50 overflow-hidden
          transition-all duration-300 ${collapsed ? "w-20" : "w-[260px]"}`}
      >
        <h2
          className={`px-6 p-6 mt-5 border-b border-white/20 font-semibold
          transition-all duration-300 ${
            collapsed ? "text-center text-ellipsis whitespace-nowrap" : ""
          }`}
        >
          <span className={`transition-opacity duration-300 `}>
            {collapsed ? (
              <div className="bg-pink-500 h-10 w-10 rounded-full overflow-hidden object-center">
                <img src="/images/admin.jpeg" alt="" />
              </div>
            ) : (
              <h2 className="text-[20px] font-semibold">Admin Panel</h2>
            )}
          </span>
        </h2>

        <div className="p-4 flex flex-col gap-2">
          {sideBarMenu.map((item) => (
            <Link
              key={item.key}
              to={item.key}
              className={` flex items-center gap-2 p-2 rounded hover:bg-white/10 transition-colors ${
                location.pathname === item.key ? "text-blue-500 " : "text-white"
              }`}
            >
              <span className="text-[18px]">{item.icon}</span>
              <span
                className={` transition-all duration-300 overflow-hidden whitespace-nowrap ${
                  collapsed ? "w-0 opacity-0 text-2xl" : "w-auto opacity-100"
                }`}
              >
                {item.label}
              </span>
            </Link>
          ))}
        </div>

        <div
          className={`bg-pink-500 flex items-center justify-center bottom-0 h-16 w-full absolute transition-all duration-300 overflow-hidden ${
            collapsed ? "opacity-0" : "opacity-100"
          }`}
        >
          Upgrade Plan
        </div>
      </aside>

      {/* Main content */}
      <section
        className={`flex flex-col flex-1 transition-all duration-300 ${
          collapsed ? "ml-20" : "ml-[260px]"
        } h-screen overflow-hidden`}
      >
        {/* Navbar */}
        <nav className="h-16 bg-orange-500 px-6 flex items-center justify-between sticky top-0 z-10 shadow">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="h-10 w-10 cursor-pointer text-white"
          >
            <RiMenu3Fill className="text-3xl" />
          </button>
          <div className="text-white font-semibold">Navbar here</div>
        </nav>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {children}
        </main>
      </section>
    </div>
  );
};

export default Layout;
