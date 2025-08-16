import { FaGithub, FaTwitter } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-slate-700 ">
        <div className="   flex items-center justify-center h-[600px] w-[800px]">
          <div className="  flex items-center justify-center w-[50%]">
            <div className="w-80 rounded-xl bg-gray-900 p-8 text-gray-100">
              <p className="text-center text-2xl font-bold">Login</p>
              <form className="mt-6">
                <div className="mt-1 text-sm">
                  <label
                    htmlFor="username"
                    className="block text-gray-400 mb-1"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder=""
                    className="w-full rounded-md border border-gray-700 bg-gray-900 px-4 py-3 text-gray-100 focus:border-purple-300 outline-none"
                  />
                </div>
                <div className="mt-4 text-sm">
                  <label
                    htmlFor="password"
                    className="block text-gray-400 mb-1"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder=""
                    className="w-full rounded-md border border-gray-700 bg-gray-900 px-4 py-3 text-gray-100 focus:border-purple-300 outline-none"
                  />
                  <div className="flex justify-end text-xs text-gray-400 mt-2 mb-3">
                    <a
                      href="#"
                      className="text-white hover:underline hover:text-purple-300"
                    >
                      Forgot Password?
                    </a>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full cursor-pointer bg-purple-300 py-3 text-center text-gray-900 font-semibold rounded-md"
                >
                  Sign in
                </button>
              </form>

              <div className="flex items-center pt-4">
                <div className="flex-1 h-px bg-gray-700" />
                <p className="px-3 text-sm text-gray-400">
                  Login with social accounts
                </p>
                <div className="flex-1 h-px bg-gray-700" />
              </div>

              <div className="flex justify-center mt-4 space-x-2">
                {/* Google */}
                <button
                  aria-label="Log in with Google"
                  className="p-3 bg-transparent cursor-pointer   transition-transform duration-300 ease-in-out hover:scale-125"
                >
                  <FcGoogle />
                </button>

                {/* Twitter */}
                <button
                  aria-label="Log in with Twitter"
                  className="p-3 bg-transparent cursor-pointer   transition-transform duration-300 ease-in-out hover:scale-125"
                >
                  <FaTwitter className="text-blue-400   hover:text-blue-500 transition" />
                </button>

                {/* GitHub */}
                <button
                  aria-label="Log in with GitHub"
                  className="p-3 bg-transparent cursor-pointer   transition-transform duration-300 ease-in-out hover:scale-125"
                >
                  <FaGithub />
                </button>
              </div>

              <p className="mt-4 text-center text-xs text-gray-400">
                Don't have an account?{" "}
                <button
                  onClick={() => navigate("/signup")}
                  className="cursor-pointer text-white hover:underline hover:text-purple-300"
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
          {/* <div className="  flex items-center justify-center w-[50%]"></div> */}
        </div>
      </div>
    </>
  );
};

export default Login;
