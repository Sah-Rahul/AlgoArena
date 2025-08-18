import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash, FaGithub, FaTwitter } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        {
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true, // 👉 important for cookies
        }
      );

      if (res.data.success) {
        navigate("/admin/dashboard"); // redirect on success
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-700">
      <div className="w-full max-w-md p-8 rounded-lg bg-gray-900 text-white shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 text-sm text-gray-400">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-purple-400"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4 relative">
            <label htmlFor="password" className="block mb-1 text-sm text-gray-400">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-purple-400 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-400 hover:text-white"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Forgot password */}
          <div className="mb-4 text-right text-xs text-gray-400">
            <a href="#" className="hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-purple-300 text-gray-900 font-semibold py-2 rounded hover:bg-purple-400 transition"
          >
            Login
          </button>
        </form>

        {/* Social login */}
        <div className="my-6 text-center">
          <p className="text-sm text-gray-400 mb-2">Or login with</p>
          <div className="flex justify-center space-x-4">
            <button className="p-2 text-xl hover:scale-110 transition">
              <FcGoogle />
            </button>
            <button className="p-2 text-xl hover:scale-110 transition text-blue-400">
              <FaTwitter />
            </button>
            <button className="p-2 text-xl hover:scale-110 transition">
              <FaGithub />
            </button>
          </div>
        </div>

        {/* Signup link */}
        <p className="text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-purple-300 hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
