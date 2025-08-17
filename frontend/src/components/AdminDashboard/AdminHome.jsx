import Layout from "./Layout";

const AdminHome = () => {
  return (
    <>
      <Layout>
        <div className="min-h-screen bg-[#ffffff]">
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 p-6">
      {/* User Profile Section (New Design) */}
      <div className="bg-white rounded-2xl p-4 shadow-lg flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold text-gray-600">
            R
          </div>
          <div>
            <h2 className="text-xl font-semibold">sahfamilyv06</h2>
            <p className="text-gray-500">Language Used: Javascript</p>
          </div>
        </div>
        <button className="mt-2 md:mt-0 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
          Edit Profile
        </button>
      </div>

      {/* Stats Section */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <h3 className="text-gray-500">Current POTD Streak</h3>
          <div className="mt-2 flex items-center justify-center gap-2">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 font-semibold">00/1476</span>
            </div>
            <span className="text-gray-700 font-medium">days</span>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <h3 className="text-gray-500">Coding Score</h3>
          <p className="mt-2 text-2xl font-bold text-gray-700">5</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <h3 className="text-gray-500">Problem Solved</h3>
          <p className="mt-2 text-2xl font-bold text-gray-700">2</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <h3 className="text-gray-500">Contest Rating</h3>
          <p className="mt-2 text-2xl font-bold text-gray-700">-</p>
        </div>
      </div>

      {/* Custom Gradient Section */}
      <div className="mt-6 h-[350px] rounded-3xl bg-gradient-to-r from-red-500 to-red-700"></div>

      {/* New Additions */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Progress Card */}
        <div className="bg-gray-800 rounded-3xl p-6 shadow-lg text-white">
          <h3 className="text-lg font-semibold">Progress</h3>
          <div className="mt-4">
            <div className="w-full bg-gray-700 h-4 rounded-full">
              <div className="bg-green-500 h-4 rounded-full" style={{ width: "25%" }}></div>
            </div>
            <p className="mt-2 text-sm">25% Completed</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-800 rounded-3xl p-6 shadow-lg text-white">
          <h3 className="text-lg font-semibold">Recent Activity</h3>
          <ul className="mt-4 space-y-2">
            <li className="text-sm">Submitted Problem #45 - 2 hrs ago</li>
            <li className="text-sm">Joined Coding Challenge - 1 day ago</li>
          </ul>
        </div>

        {/* Leaderboard Snippet */}
        <div className="bg-gray-800 rounded-3xl p-6 shadow-lg text-white">
          <h3 className="text-lg font-semibold">Leaderboard</h3>
          <p className="mt-2 text-sm">You're in the Top 10%!</p>
        </div>
      </div>
    </div>
        </div>
      </Layout>
    </>
  );
};

export default AdminHome;
