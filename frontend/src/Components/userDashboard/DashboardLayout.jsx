import {
  Bookmark,
  BookOpen,
  Code,
  FileText,
  Menu,
  MessageCircle,
  Trophy,
  X,
  Sun,
  Moon,
  User,
  LogOut
} from "lucide-react";
import { MdDashboard } from "react-icons/md";
import { useState, useEffect } from "react";
import { useThemeContext } from "../../context/ThemeContext";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

const DashboardLayout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { logout, authUser } = useAuthStore();

  const { theme, toggleTheme } = useThemeContext();
  const isDark = theme === "dark";

  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setOpen(false); // Close sidebar on mobile by default
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const toggleSidebar = () => setOpen(prev => !prev);

  const sidebarLinks = [
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: <MdDashboard size={18} />,
      id: "dashboard-tooltip",
    },
    {
      to: "/submissions",
      label: "My Submissions",
      icon: <FileText size={18} />,
      id: "submissions-tooltip",
    },
    {
      to: "/discussions",
      label: "Discussions",
      icon: <MessageCircle size={18} />,
      id: "discussions-tooltip",
    },
    {
      to: "/contests",
      label: "Contests",
      icon: <Trophy size={18} />,
      id: "contests-tooltip",
    },
    {
      to: "/bookmarks",
      label: "Bookmarked",
      icon: <Bookmark size={18} />,
      id: "bookmarks-tooltip",
    },
    {
      to: "/problems",
      label: "Problems",
      icon: <BookOpen size={18} />,
      id: "problems-tooltip",
    },
  ];

  const isAdmin = true;

  const adminLinks = [
    {
      to: "/add-problem",
      label: "Add Problem",
      icon: <Code size={18} />,
      id: "add-problem-tooltip",
    },
  ];

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && open && !event.target.closest('.sidebar') && !event.target.closest('.menu-button')) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, open]);

  return (
    <div className={`flex min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Mobile Overlay */}
      {isMobile && open && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`sidebar h-screen fixed top-0 left-0 z-40 transition-all duration-300 ease-in-out
          ${open ? (isMobile ? "w-64" : "w-64") : (isMobile ? "-translate-x-full w-64" : "w-16")} overflow-hidden
          ${isDark 
            ? "bg-gray-800 text-white border-r border-gray-700" 
            : "bg-white text-gray-800 border-r border-gray-200 shadow-lg"
          }
        `}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h1 className={`font-bold text-xl ${isDark ? 'text-white' : 'text-gray-800'} ${!open && !isMobile ? 'hidden' : ''}`}>
           <Link to={'/'}> {open || isMobile ? "LeetCode UI" : "LC"}</Link>
          </h1>
          {isMobile && (
            <button 
              onClick={() => setOpen(false)}
              className={`p-1 rounded-full hover:bg-gray-100 ${isDark ? 'hover:bg-gray-700 text-white' : 'text-gray-600'}`}
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 p-3 overflow-y-auto">
          {[...sidebarLinks, ...(isAdmin ? adminLinks : [])].map(
            ({ to, label, icon, id }) => (
              <Link
                key={id}
                to={to}
                data-tooltip-id={!open && !isMobile ? id : undefined}
                data-tooltip-content={!open && !isMobile ? label : undefined}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200
                  ${isDark 
                    ? "text-gray-300 hover:bg-gray-700 hover:text-white" 
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  }
                `}
                onClick={() => isMobile && setOpen(false)}
              >
                <div className="flex-shrink-0">
                  {icon}
                </div>
                {(open || isMobile) && <span className="font-medium">{label}</span>}
              </Link>
            )
          )}
        </nav>

        {/* Tooltips when collapsed */}
        {!open && !isMobile &&
          [...sidebarLinks, ...(isAdmin ? adminLinks : [])].map((link) => (
            <Tooltip
              key={link.id}
              id={link.id}
              place="right"
              className="z-[9999]"
              style={{ position: "fixed" }}
            />
          ))}
      </aside>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isMobile ? "ml-0" : (open ? "ml-64" : "ml-16")
        }`}
      >
        {/* Top Navbar */}
        <nav className={`h-16 w-full px-4 flex items-center justify-between border-b sticky top-0 z-20
          ${isDark 
            ? "bg-gray-800 text-white border-gray-700" 
            : "bg-white text-gray-800 border-gray-200 shadow-sm"
          }
        `}>
          <div className="flex items-center gap-4">
            <button
              className="menu-button p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={toggleSidebar}
            >
              <Menu size={20} className={isDark ? "text-white" : "text-gray-700"} />
            </button>
            
            {/* Mobile Logo */}
            {isMobile && (
              <h1 className={`font-bold text-xl ${isDark ? 'text-white' : 'text-gray-800'}`}>
                LeetCode UI
              </h1>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors
                ${isDark 
                  ? "hover:bg-gray-700 text-yellow-400" 
                  : "hover:bg-gray-100 text-gray-600"
                }
              `}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* User Avatar */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none"
              >
                <img
                  src={authUser?.image || "https://avatar.iran.liara.run/public/boy"}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
                {!isMobile && (
                  <span className={`font-medium hidden sm:block ${isDark ? 'text-white' : 'text-gray-700'}`}>
                    {authUser?.name}
                  </span>
                )}
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className={`absolute right-0 top-12 w-48 rounded-lg shadow-lg overflow-hidden z-50 border
                  ${isDark 
                    ? "bg-gray-800 border-gray-700" 
                    : "bg-white border-gray-200"
                  }
                `}>
                  <div className={`px-4 py-3 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                      {authUser?.name}
                    </p>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {authUser?.email || 'user@example.com'}
                    </p>
                  </div>
                  <div className="py-1">
                    <Link
                      to="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors
                        ${isDark 
                          ? "text-gray-300 hover:bg-gray-700 hover:text-white" 
                          : "text-gray-700 hover:bg-gray-50"
                        }
                      `}
                    >
                      <User size={16} />
                      My Profile
                    </Link>
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900 dark:text-red-400 transition-colors"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main className={`p-4 sm:p-6 ${isDark ? 'bg-gray-900' : 'bg-gray-50'} min-h-[calc(100vh-4rem)]`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;