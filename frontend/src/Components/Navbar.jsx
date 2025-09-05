import { useState } from "react";
import { User, Code, LogOut, Menu, X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-black py-4 px-4 md:px-0">
      <div className="flex w-full justify-between items-center mx-auto max-w-4xl bg-black/15 shadow-lg shadow-neutral-600/5 backdrop-blur-lg border border-gray-200/10 p-4 rounded-2xl">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 cursor-pointer">
          <span className="text-lg md:text-2xl font-bold tracking-tight text-white">
            Leetlab
          </span>
        </Link>

        {/* Desktop Dropdown */}
        <div className="hidden md:flex items-center gap-8">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src={
                    authUser?.image ||
                    "https://avatar.iran.liara.run/public/boy"
                  }
                  alt="User Avatar"
                  className="object-cover"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 space-y-2"
            >
              <li>
                <p className="text-base font-semibold">{authUser?.name}</p>
                <hr className="border-gray-200/10" />
              </li>
              <li>
                <Link
                  to="/profile"
                  className="hover:bg-primary hover:text-white text-base font-semibold"
                >
                  <User className="w-4 h-4 mr-2" />
                  My Profile
                </Link>
              </li>
              {authUser?.role === "ADMIN" && (
                <li>
                  <Link
                    to="/add-problem"
                    className="hover:bg-primary hover:text-white text-base font-semibold"
                  >
                    <Code className="w-4 h-4 mr-1" />
                    Add Problem
                  </Link>
                </li>
              )}
              <li>
                <button
                  onClick={logout}
                  className="hover:bg-red-500 hover:text-white text-base font-semibold"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-2 bg-base-100 rounded-xl shadow-lg p-4 space-y-3 mx-2">
          <p className="text-base font-semibold">{authUser?.name}</p>
          <hr className="border-gray-200/10" />

          <Link
            to="/profile"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 text-base font-semibold"
          >
            <User className="w-4 h-4" />
            My Profile
          </Link>

          {authUser?.role === "ADMIN" && (
            <Link
              to="/add-problem"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-base font-semibold"
            >
              <Code className="w-4 h-4" />
              Add Problem
            </Link>
          )}

          <button
            onClick={() => {
              logout();
              setMenuOpen(false);
            }}
            className="flex items-center gap-2 text-red-500 font-semibold"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
