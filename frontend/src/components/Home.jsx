import React, { useState, useEffect, useRef } from 'react';
import { Code, Trophy, Users, Zap, ChevronRight, Play, Star, GitBranch, Terminal, Rocket, Github } from 'lucide-react';

const Home = () => {
  const [codeIndex, setCodeIndex] = useState(0);
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Advanced Particle System
  class Particle {
    constructor(canvas) {
      this.canvas = canvas;
      this.reset();
      this.life = Math.random() * 200 + 100;
      this.maxLife = this.life;
    }

    reset() {
      this.x = Math.random() * this.canvas.width;
      this.y = Math.random() * this.canvas.height;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.size = Math.random() * 2 + 0.5;
      this.alpha = Math.random() * 0.8 + 0.2;
      this.hue = Math.random() * 60 + 240; // Blue to purple range
      this.connections = [];
    }

    update(mouse) {
      // Mouse interaction
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        const force = (100 - distance) / 100;
        this.vx += (dx / distance) * force * 0.01;
        this.vy += (dy / distance) * force * 0.01;
      }

      this.x += this.vx;
      this.y += this.vy;

      // Boundary conditions
      if (this.x < 0 || this.x > this.canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1;

      // Keep particles in bounds
      this.x = Math.max(0, Math.min(this.canvas.width, this.x));
      this.y = Math.max(0, Math.min(this.canvas.height, this.y));

      // Damping
      this.vx *= 0.99;
      this.vy *= 0.99;

      this.life--;
      if (this.life <= 0) {
        this.reset();
        this.life = this.maxLife;
      }
    }

    draw(ctx) {
      ctx.save();
      ctx.globalAlpha = this.alpha * (this.life / this.maxLife);
      
      // Glow effect
      ctx.shadowBlur = 10;
      ctx.shadowColor = `hsl(${this.hue}, 100%, 60%)`;
      
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${this.hue}, 100%, 60%)`;
      ctx.fill();
      
      ctx.restore();
    }
  }

  // Initialize advanced particle system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particles
    particlesRef.current = [];
    const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 15000));
    
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(new Particle(canvas));
    }

    // Mouse tracking
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach(particle => {
        particle.update(mouseRef.current);
        particle.draw(ctx);
      });

      // Draw connections between nearby particles
      particlesRef.current.forEach((particle, i) => {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const other = particlesRef.current[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.save();
            ctx.globalAlpha = (120 - distance) / 120 * 0.3;
            ctx.strokeStyle = `hsl(${(particle.hue + other.hue) / 2}, 70%, 50%)`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
            ctx.restore();
          }
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const codeExamples = [
    {
      filename: "dijkstra.py",
      difficulty: "Hard",
      lines: [
        "import heapq",
        "",
        "def dijkstra(graph, start):",
        "    distances = {node: float('inf') for node in graph}",
        "    distances[start] = 0",
        "    pq = [(0, start)]",
        "    ",
        "    while pq:",
        "        current_dist, current = heapq.heappop(pq)",
        "        ",
        "        if current_dist > distances[current]:",
        "            continue",
        "            ",
        "        for neighbor, weight in graph[current].items():",
        "            distance = current_dist + weight",
        "            ",
        "            if distance < distances[neighbor]:",
        "                distances[neighbor] = distance",
        "                heapq.heappush(pq, (distance, neighbor))"
      ],
      runtime: "142ms",
      memory: "23.8MB",
      xp: 500,
      lang: "python"
    },
    {
      filename: "segment_tree.cpp",
      difficulty: "Expert",
      lines: [
        "#include <vector>",
        "#include <algorithm>",
        "",
        "class SegmentTree {",
        "private:",
        "    vector<int> tree;",
        "    int n;",
        "    ",
        "    void build(vector<int>& arr, int node, int start, int end) {",
        "        if (start == end) {",
        "            tree[node] = arr[start];",
        "        } else {",
        "            int mid = (start + end) / 2;",
        "            build(arr, 2*node, start, mid);",
        "            build(arr, 2*node+1, mid+1, end);",
        "            tree[node] = min(tree[2*node], tree[2*node+1]);",
        "        }",
        "    }"
      ],
      runtime: "89ms",
      memory: "31.2MB",
      xp: 750,
      lang: "cpp"
    },
    {
      filename: "trie_autocomplete.js",
      difficulty: "Medium",
      lines: [
        "class TrieNode {",
        "    constructor() {",
        "        this.children = {};",
        "        this.isEndOfWord = false;",
        "        this.suggestions = [];",
        "    }",
        "}",
        "",
        "class Autocomplete {",
        "    constructor() {",
        "        this.root = new TrieNode();",
        "    }",
        "    ",
        "    insert(word) {",
        "        let current = this.root;",
        "        for (let char of word) {",
        "            if (!current.children[char]) {",
        "                current.children[char] = new TrieNode();",
        "            }",
        "            current = current.children[char];",
        "            current.suggestions.push(word);",
        "        }"
      ],
      runtime: "67ms",
      memory: "18.4MB",
      xp: 300,
      lang: "javascript"
    },
    {
      filename: "neural_network.py",
      difficulty: "Expert",
      lines: [
        "import numpy as np",
        "",
        "class NeuralNetwork:",
        "    def __init__(self, layers):",
        "        self.layers = layers",
        "        self.weights = []",
        "        self.biases = []",
        "        ",
        "        for i in range(len(layers) - 1):",
        "            w = np.random.randn(layers[i], layers[i+1]) * 0.1",
        "            b = np.zeros((1, layers[i+1]))",
        "            self.weights.append(w)",
        "            self.biases.append(b)",
        "    ",
        "    def sigmoid(self, x):",
        "        return 1 / (1 + np.exp(-np.clip(x, -500, 500)))",
        "    ",
        "    def forward(self, X):",
        "        self.activations = [X]",
        "        a = X"
      ],
      runtime: "234ms",
      memory: "45.7MB",
      xp: 1000,
      lang: "python"
    }
  ];

  // Infinite code animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCodeIndex(prev => (prev + 1) % codeExamples.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentCode = codeExamples[codeIndex];

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Hard': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Expert': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden relative">
      {/* Advanced Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
        style={{ background: 'transparent' }}
      />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 z-1"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(15,23,42,0.8)_100%)] z-1"></div>

      {/* Header */}
      <header className="relative z-10 px-6 py-4">
        <nav className="flex items-center justify-between max-w-7xl mx-auto backdrop-blur-sm bg-white/5 rounded-2xl px-8 py-4 border border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center relative overflow-hidden">
              <Code className="w-6 h-6 text-white z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 animate-pulse"></div>
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              AlgoArena
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 flex items-center space-x-2">
              <Terminal className="w-4 h-4" />
              <span>Challenges</span>
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 flex items-center space-x-2">
              <Trophy className="w-4 h-4" />
              <span>Leaderboard</span>
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Community</span>
            </a>
            <button className="bg-gradient-to-r from-purple-500 to-cyan-500 px-6 py-3 rounded-xl hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 font-semibold flex items-center space-x-2 group">
              <Rocket className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
              <span>Launch</span>
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8 inline-flex items-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-8 py-3 hover:bg-white/10 transition-all duration-300 group">
            <Star className="w-4 h-4 text-yellow-400 mr-2 group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-sm text-gray-300">Trusted by 100,000+ elite developers</span>
            <div className="ml-3 flex space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-75"></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-150"></div>
            </div>
          </div>
          
          <h1 className="text-7xl md:text-9xl font-bold mb-8 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent leading-tight tracking-tight">
            Master
            <br />
            <span className="text-6xl md:text-8xl bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Algorithms
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed">
            Push your limits with advanced data structures, complex algorithms, and competitive programming challenges. 
            <br />
            <span className="text-purple-300">Join the elite tier of software engineers.</span>
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-20">
            <button className="group bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 px-10 py-5 rounded-2xl text-xl font-bold hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 flex items-center space-x-3 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
              <Play className="w-5 h-5 z-10" />
              <span className="z-10">Enter Arena</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform z-10" />
            </button>
            
            <button className="group bg-white/10 backdrop-blur-sm border border-white/20 px-10 py-5 rounded-2xl text-xl font-bold hover:bg-white/20 transition-all duration-300 flex items-center space-x-3">
              <Github className="w-5 h-5" />
              <span>View on GitHub</span>
            </button>
          </div>

          {/* Advanced Code Interface */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-slate-800/30 backdrop-blur-2xl border border-white/10 rounded-3xl p-2 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 animate-pulse"></div>
              <div className="bg-slate-900/90 rounded-2xl p-8 relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex space-x-2">
                      <div className="w-4 h-4 bg-red-500 rounded-full hover:bg-red-400 transition-colors cursor-pointer"></div>
                      <div className="w-4 h-4 bg-yellow-500 rounded-full hover:bg-yellow-400 transition-colors cursor-pointer"></div>
                      <div className="w-4 h-4 bg-green-500 rounded-full hover:bg-green-400 transition-colors cursor-pointer"></div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <Terminal className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-400 text-sm font-mono">
                        {currentCode.filename}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`text-sm px-3 py-1 rounded-full border font-semibold ${getDifficultyColor(currentCode.difficulty)}`}>
                      {currentCode.difficulty}
                    </span>
                    <div className="text-xs text-gray-500 font-mono">
                      {currentCode.lang}
                    </div>
                  </div>
                </div>
                
                <div className="text-left font-mono text-sm bg-slate-950/50 rounded-xl p-6 min-h-[400px] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 to-cyan-900/5"></div>
                  {currentCode.lines.map((line, index) => (
                    <div 
                      key={`${codeIndex}-${index}`} 
                      className="flex items-start py-1 relative z-10 group hover:bg-white/5 rounded transition-all duration-200"
                      style={{
                        animation: `slideIn 0.5s ease-out ${index * 50}ms forwards`,
                        opacity: 0,
                        transform: 'translateX(-20px)'
                      }}
                    >
                      <span className="text-gray-500 w-8 text-right mr-6 select-none">
                        {index + 1}
                      </span>
                      <span className="text-gray-300 flex-1 leading-relaxed">
                        {line || ' '}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 flex items-center justify-between border-t border-gray-700/50 pt-6">
                  <div className="flex items-center space-x-6 text-sm">
                    <span className="flex items-center space-x-2 text-green-400">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="font-semibold">Accepted</span>
                    </span>
                    <span className="text-gray-400 font-mono">
                      Runtime: <span className="text-cyan-400">{currentCode.runtime}</span>
                    </span>
                    <span className="text-gray-400 font-mono">
                      Memory: <span className="text-purple-400">{currentCode.memory}</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text">
                      +{currentCode.xp}
                    </span>
                    <span className="text-sm text-gray-400">XP</span>
                  </div>
                </div>

                {/* Enhanced Progress Bar */}
                <div className="mt-6 relative">
                  <div className="w-full bg-gray-800/50 rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full transition-all duration-5000 ease-in-out relative overflow-hidden"
                      style={{
                        width: `${((codeIndex + 1) / codeExamples.length) * 100}%`
                      }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    {codeExamples.map((_, index) => (
                      <div key={index} className={`transition-all duration-300 ${index <= codeIndex ? 'text-cyan-400' : ''}`}>
                        {index + 1}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Enhanced Features Section */}
      <section className="relative z-10 px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Elite Features
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Advanced tools and challenges designed for serious developers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 hover:bg-white/10 transition-all duration-500 hover:scale-105 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 relative z-10">
                <Code className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-6 text-white">2000+ Advanced Problems</h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                Master complex algorithms, system design, ML implementations, and competitive programming challenges used by FAANG companies.
              </p>
            </div>
            
            <div className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 hover:bg-white/10 transition-all duration-500 hover:scale-105 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 relative z-10">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-6 text-white">Global Championships</h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                Compete in monthly tournaments, weekly contests, and real-time coding battles. Earn recognition and career opportunities.
              </p>
            </div>
            
            <div className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 hover:bg-white/10 transition-all duration-500 hover:scale-105 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 relative z-10">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-6 text-white">AI-Powered Analysis</h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                Get personalized feedback, complexity analysis, and optimization suggestions powered by advanced AI models.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 px-6 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
            Join the Elite
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Transform your coding skills and join thousands of developers who landed their dream roles at top tech companies.
          </p>
          <button className="group bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 px-12 py-6 rounded-3xl text-2xl font-bold hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 flex items-center space-x-4 mx-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            <Rocket className="w-6 h-6 z-10 group-hover:rotate-12 transition-transform duration-300" />
            <span className="z-10">Start Your Journey</span>
            <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform z-10" />
          </button>
        </div>
      </section>

      <style jsx>{`
        @keyframes slideIn {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Home;