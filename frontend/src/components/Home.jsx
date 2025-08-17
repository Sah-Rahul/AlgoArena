import React, { useState, useEffect } from 'react';
import { Code, Trophy, Users, Zap, ChevronRight, Play, Star, GitBranch } from 'lucide-react';

const Home = () => {
  const [codeIndex, setCodeIndex] = useState(0);
  const [particles, setParticles] = useState([]);

  // Initialize particles
  useEffect(() => {
    const newParticles = [];
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
    setParticles(newParticles);
  }, []);

  // Animate particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + particle.speedX + 100) % 100,
        y: (particle.y + particle.speedY + 100) % 100,
      })));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const codeExamples = [
    {
      filename: "two_sum.py",
      difficulty: "Easy",
      lines: [
        "def two_sum(nums, target):",
        "    hash_map = {}",
        "    for i, num in enumerate(nums):",
        "        complement = target - num",
        "        if complement in hash_map:",
        "            return [hash_map[complement], i]",
        "        hash_map[num] = i",
        "    return []"
      ],
      runtime: "52ms",
      memory: "15.1MB",
      xp: 150
    },
    {
      filename: "binary_search.js",
      difficulty: "Medium",
      lines: [
        "function binarySearch(arr, target) {",
        "    let left = 0, right = arr.length - 1;",
        "    while (left <= right) {",
        "        const mid = Math.floor((left + right) / 2);",
        "        if (arr[mid] === target) return mid;",
        "        else if (arr[mid] < target) left = mid + 1;",
        "        else right = mid - 1;",
        "    }",
        "    return -1;",
        "}"
      ],
      runtime: "28ms",
      memory: "12.3MB",
      xp: 250
    },
    {
      filename: "merge_sort.cpp",
      difficulty: "Hard",
      lines: [
        "void mergeSort(vector<int>& arr, int l, int r) {",
        "    if (l < r) {",
        "        int m = l + (r - l) / 2;",
        "        mergeSort(arr, l, m);",
        "        mergeSort(arr, m + 1, r);",
        "        merge(arr, l, m, r);",
        "    }",
        "}"
      ],
      runtime: "84ms",
      memory: "18.7MB",
      xp: 400
    }
  ];

  // Infinite code animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCodeIndex(prev => (prev + 1) % codeExamples.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const currentCode = codeExamples[codeIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden relative">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-bounce"></div>
        
        {/* Moving Particles */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              transition: 'all 0.1s linear',
            }}
          />
        ))}
      </div>
      
      {/* Header */}
      <header className="relative z-10 px-6 py-4">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Code className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              AlgoArena
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Challenges</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Leaderboard</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Community</a>
            <button className="bg-gradient-to-r from-purple-500 to-cyan-500 px-6 py-2 rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
              Sign In
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8 inline-flex items-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-2">
            <Star className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-sm text-gray-300">Join 50,000+ developers worldwide</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent leading-tight">
            Code. Compete.
            <br />
            <span className="text-5xl md:text-7xl">Conquer.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Master algorithms, solve complex problems, and compete with developers globally. 
            Level up your coding skills in the ultimate programming arena.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16">
            <button className="group bg-gradient-to-r from-purple-500 to-cyan-500 px-8 py-4 rounded-2xl text-lg font-semibold hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 flex items-center space-x-2">
              <Play className="w-5 h-5" />
              <span>Start Coding</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="group bg-white/10 backdrop-blur-sm border border-white/20 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-white/20 transition-all duration-300 flex items-center space-x-2">
              <Trophy className="w-5 h-5" />
              <span>View Challenges</span>
            </button>
          </div>

          {/* Infinite Code Snippet Animation */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-3xl p-1 shadow-2xl">
              <div className="bg-slate-900/80 rounded-2xl p-6 transition-all duration-1000 ease-in-out">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-gray-400 text-sm ml-4 transition-all duration-500">
                      {currentCode.filename}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <GitBranch className="w-4 h-4" />
                    <span className={`text-sm px-2 py-1 rounded-full text-xs ${
                      currentCode.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                      currentCode.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {currentCode.difficulty}
                    </span>
                  </div>
                </div>
                
                <div className="text-left font-mono text-sm h-48 overflow-hidden">
                  {currentCode.lines.map((line, index) => (
                    <div 
                      key={index} 
                      className="flex transition-all duration-500 ease-in-out transform"
                      style={{
                        animationDelay: `${index * 100}ms`,
                        opacity: 1,
                      }}
                    >
                      <span className="text-gray-500 w-6 text-right mr-4">{index + 1}</span>
                      <span className="text-gray-300 flex-1">{line}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 flex items-center justify-between border-t border-gray-700/50 pt-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span>Accepted</span>
                    </span>
                    <span>Runtime: {currentCode.runtime}</span>
                    <span>Memory: {currentCode.memory}</span>
                  </div>
                  <div className="text-green-400 font-semibold animate-pulse">
                    +{currentCode.xp} XP
                  </div>
                </div>

                {/* Progress bar for infinite animation */}
                <div className="mt-4 w-full bg-gray-700/30 rounded-full h-1">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-cyan-500 h-1 rounded-full transition-all duration-4000 ease-linear"
                    style={{
                      width: `${((codeIndex + 1) / codeExamples.length) * 100}%`
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">1000+ Problems</h3>
              <p className="text-gray-300 leading-relaxed">
                From easy warm-ups to mind-bending challenges. Practice data structures, algorithms, and system design.
              </p>
            </div>
            
            <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Global Contests</h3>
              <p className="text-gray-300 leading-relaxed">
                Compete in weekly contests, climb the leaderboard, and showcase your skills to the world.
              </p>
            </div>
            
            <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Real-time Feedback</h3>
              <p className="text-gray-300 leading-relaxed">
                Get instant results, detailed explanations, and performance analytics to accelerate your learning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Ready to level up?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of developers who are already mastering algorithms and landing their dream jobs.
          </p>
          <button className="group bg-gradient-to-r from-purple-500 to-cyan-500 px-10 py-5 rounded-2xl text-xl font-semibold hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 flex items-center space-x-2 mx-auto">
            <span>Begin Your Journey</span>
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;