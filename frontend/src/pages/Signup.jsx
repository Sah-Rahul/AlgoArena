import { FaGithub, FaTwitter } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/auth/register",
        {
          name: formData.username,
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true } 
      );
alert("signup success full")
      if (res.data.success) {
        navigate("/login"); 
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-700">
      <div className="flex items-center justify-center h-[600px] w-[800px]">
        <div className="flex items-center justify-center w-[50%]">
          <div className="w-80 rounded-xl bg-gray-900 p-8 text-gray-100">
            <p className="text-center text-2xl font-bold">Sign Up</p>
            {/* ✅ form submit connect */}
            <form className="mt-6" onSubmit={handleSubmit}>
              <div className="mt-1 text-sm">
                <label htmlFor="username" className="block text-gray-400 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-700 bg-gray-900 px-4 py-3 text-gray-100 focus:border-purple-300 outline-none"
                />
              </div>
              <div className="mt-4 text-sm">
                <label htmlFor="email" className="block text-gray-400 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-700 bg-gray-900 px-4 py-3 text-gray-100 focus:border-purple-300 outline-none"
                />
              </div>
              <div className="mb-4 text-sm">
                <label htmlFor="password" className="block text-gray-400 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-700 bg-gray-900 px-4 py-3 text-gray-100 focus:border-purple-300 outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full mt-4 bg-purple-300 py-3 text-center text-gray-900 font-semibold rounded-md cursor-pointer"
              >
                Create Account
              </button>
            </form>

            <div className="flex items-center pt-4">
              <div className="flex-1 h-px bg-gray-700" />
              <p className="px-3 text-sm text-gray-400">Or sign up with</p>
              <div className="flex-1 h-px bg-gray-700" />
            </div>

            <div className="flex justify-center mb-4 space-x-2">
              <button className="p-3 bg-transparent cursor-pointer transition-transform duration-300 ease-in-out hover:scale-125">
                <FcGoogle />
              </button>

              <button className="p-3 bg-transparent cursor-pointer transition-transform duration-300 ease-in-out hover:scale-125">
                <FaTwitter className="text-blue-400 hover:text-blue-500 transition" />
              </button>

              <button className="p-3 bg-transparent cursor-pointer transition-transform duration-300 ease-in-out hover:scale-125">
                <FaGithub />
              </button>
            </div>

            <p className="mt-2 text-center text-xs text-gray-400">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="cursor-pointer text-white hover:underline hover:text-purple-300"
              >
                Log in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
