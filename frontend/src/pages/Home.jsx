const Home = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1e1e2f] to-[#161622] text-white">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Welcome to <span className="text-orange-500">LeetLab</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10">
          Practice coding problems, compete in challenges, and improve your DSA
          skills – all in one place.
        </p>
        <a
          href="/problems"
          className="px-6 py-3 rounded-lg bg-orange-500 text-white font-semibold text-lg hover:bg-orange-600 transition"
        >
          Start Solving
        </a>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-10 text-center">
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h3 className="text-xl font-bold mb-2">DSA Questions</h3>
          <p className="text-gray-400">
            Practice real interview-level problems with editor and test cases.
          </p>
        </div>
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h3 className="text-xl font-bold mb-2">Live Leaderboard</h3>
          <p className="text-gray-400">
            Compete with peers and track your problem-solving performance.
          </p>
        </div>
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h3 className="text-xl font-bold mb-2">Code Editor</h3>
          <p className="text-gray-400">
            Built-in Monaco editor with multiple languages and theme support.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
