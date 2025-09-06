import { useState } from "react";
import { MdDarkMode, MdKeyboardArrowRight, MdLightMode } from "react-icons/md";
import { IoMdArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { RxCross2 } from "react-icons/rx";
import { useThemeContext } from "../context/ThemeContext";
import { useAuthStore } from "../store/useAuthStore";

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { authUser } = useAuthStore();

  const { theme, toggleTheme } = useThemeContext();
  const isDark = theme === "dark";

  const menuLinks = [
    { title: "Home", href: "#" },
    { title: "Practice", href: "/practice" },
    { title: "Discuss", href: "/discuss" },
    { title: "Pricing", href: "/pricing" },
  ];

  return (
    <section className="bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/gridBackground.png')] dark:bg-black dark:text-white w-full bg-no-repeat bg-cover bg-center text-sm pb-44 font-poppins transition-colors duration-300">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-4 md:px-16 lg:px-24 xl:px-32 md:py-6 w-full">
        {/* Logo */}
        <h1 className="font-bold text-4xl">LeetCode</h1>

        {/* Nav Links */}
        <div
          id="menu"
          className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:h-full max-md:bg-white/50 dark:max-md:bg-black/60 max-md:backdrop-blur max-md:flex-col max-md:justify-center flex items-center gap-8 font-medium
            max-md:transition-all max-md:duration-300 max-md:overflow-hidden
            ${menuOpen ? "max-md:w-full" : "max-md:w-0"}`}
        >
          {menuLinks.map((item, index) => (
            <div
              key={index}
              className="font-semibold flex items-center gap-1 cursor-pointer"
              onClick={() => setMenuOpen(false)}  
            >
              <Link to={item.href}>{item.title}</Link>
            </div>
          ))}

          {/* Close Button */}
          <button
            id="close-menu"
            className="md:hidden font-semibold text-3xl cursor-pointer hover:text-[#fcdb9b] text-black dark:text-white p-2 rounded-md aspect-square transition"
            onClick={() => setMenuOpen(false)}
          >
            <RxCross2 />
          </button>
        </div>

        {/* Right-side buttons */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button onClick={toggleTheme}>
            {isDark ? (
              <MdLightMode className="text-3xl cursor-pointer hover:text-[#fcdb9b] transition duration-300" />
            ) : (
              <MdDarkMode className="text-3xl cursor-pointer hover:text-[#fcdb9b] transition duration-300" />
            )}
          </button>

          {authUser ? (
            <div className="relative">
              {/* Avatar Button */}
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className="focus:outline-none"
              >
                <img
                  src={
                    authUser?.image ||
                    "https://avatar.iran.liara.run/public/boy"
                  }
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </button>

              {/* Dropdown */}
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50 border dark:border-gray-700">
                  <ul className="py-2">
                    <li>
                      <Link
                        to="/dashboard"
                        onClick={() => setMenuOpen(false)}
                        className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/profile"
                        onClick={() => setMenuOpen(false)}
                        className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setMenuOpen(false);
                          logout();  
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-600"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link to={"/signup"}>
              <button className="hidden md:block font-semibold bg-[#fcdb9b] hover:bg-[#f9ebd0a4] cursor-pointer text-black px-6 py-3 rounded-full transition">
                Get Started
              </button>
            </Link>
          )}
        </div>

        {/* Open Menu */}
        {!menuOpen && (
          <button
            id="open-menu"
            className="md:hidden cursor-pointer hover:bg-[#fae4b7] text-white p-2 rounded-md aspect-square font-medium transition"
            onClick={() => setMenuOpen(true)}
          >
            <Menu />
          </button>
        )}
      </nav>

      {/* Announcement */}
      <div className="flex items-center gap-2 border border-slate-300 hover:border-slate-400/70 rounded-full w-max mx-auto px-4 py-2 mt-40 md:mt-32">
        <span>New announcement on your inbox</span>
        <button className="flex items-center gap-1 font-medium group transition-all">
          <span>Read more</span>
          <IoMdArrowRoundForward className="transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      </div>

      {/* Hero Title */}
      <h5 className="text-4xl md:text-7xl font-medium max-w-[850px] text-center mx-auto mt-8">
        Build apps faster with ui components
      </h5>

      {/* Description */}
      <p className="text-sm md:text-base mx-auto max-w-2xl text-center mt-6 max-md:px-2">
        Build sleek, consistent UIs without wrestling with design systems, our
        components handle the heavy lifting so you can ship faster.
      </p>

      {/* CTA Buttons */}
      <div className="mx-auto w-full flex items-center justify-center gap-3 mt-4">
        <button className="bg-[#fcdb9b] cursor-pointer hover:bg-[#fae4b7] text-black px-6 py-3 rounded-full font-semibold transition">
          Get Started
        </button>
        <button className="flex cursor-pointer items-center gap-2 border border-slate-300 hover:bg-[#fae4b7]/40 rounded-full px-6 py-3 group transition-all">
          <span className="font-semibold">Learn More</span>
          <MdKeyboardArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
};

export default Home;
