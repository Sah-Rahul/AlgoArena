import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiSun, FiMoon } from "react-icons/fi"; // icons import kiye
import { useThemeContext } from "../context/ThemeContext";
import { useAuthStore } from "../store/useAuthStore";
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useThemeContext();
  const isDark = theme === "dark";
  const { authUser } = useAuthStore();

  const navBar = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "Practice",
      link: "/practice",
    },
    {
      label: "Discuss",
      link: "/discuss",
    },
    {
      label: "Pricing",
      link: "/pricing",
    },
  ];
  return (
    <nav
      className={`fixed top-[5px] left-0 right-0 mx-4 flex justify-between items-center border px-6 py-4 rounded-full text-sm z-50 shadow-md max-md:w-auto
      ${
        isDark
          ? "bg-black border-gray-700 text-white"
          : "bg-[#f3d599] border-slate-700 text-black"
      }
    `}
    >
      {/* Logo */}
      <Link to={"/"}>
        <h1 className="text-lg font-bold">Leetcode</h1>
      </Link>

      {/* Nav Links - Desktop Only */}
      <div className="hidden md:flex items-center gap-6 ml-7">
        {navBar.map(({ label, link }) => (
          <Link
            to={link}
            key={label}
            className="relative overflow-hidden h-6 group"
          >
            <span className="block group-hover:-translate-y-full transition-transform duration-300">
              {label}
            </span>
            <span className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">
              {label}
            </span>
          </Link>
        ))}
      </div>

      {/* Right side buttons - Desktop Only */}
      <div className="hidden md:flex items-center gap-4">
        {/* Dark/Light Mode toggle button instead of Contact */}
        <button
          onClick={toggleTheme}
          className=" hover:text-[#FCDB9B]   transition  "
          aria-label="Toggle Dark/Light Mode"
        >
          {isDark ? <FiSun size={26} /> : <FiMoon size={26} />}
        </button>

        {/* User image instead of Get Started button */}
        {authUser && (
          <img
            src={authUser?.image || "https://avatar.iran.liara.run/public/boy"}
            alt="User Avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden text-gray-400"
        onClick={() => setMobileMenuOpen((prev) => !prev)}
        aria-label="Toggle Mobile Menu"
      >
        <FiMenu className="w-6 h-6" />
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className={`${
            isDark ? "bg-gray-900" : "bg-white"
          } absolute top-20 left-0 w-full flex flex-col items-center gap-4 text-base py-4 z-50`}
        >
          {navBar.map((item, index) => (
            <Link key={index} to={item.link} className="hover:text-indigo-600">
              {item.label}
            </Link>
          ))}

          {/* Dark/Light Mode toggle for mobile */}
          <button
            onClick={toggleTheme}
            className="  px-4 py-2 rounded-full text-sm font-medium transition w-full flex items-center gap-2 justify-center"
            aria-label="Toggle Dark/Light Mode"
          >
            {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
            {isDark ? "Light Mode" : "Dark Mode"}
          </button>

          {/* User avatar for mobile */}
          {authUser && (
            <img
              src={
                authUser?.image || "https://avatar.iran.liara.run/public/boy"
              }
              alt="User Avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
          )}

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <RxCross2 className="h-7 w-7" />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
