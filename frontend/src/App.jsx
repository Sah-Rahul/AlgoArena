import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";


import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuthStore } from "./store/useAuthStore.js";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import AdminRoute from "./Components/AdminRoute.jsx";
import AddProblem from "./pages/AddProblem.jsx";
import DashBoard from "./Components/userDashboard/DashBoard.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import Practice from "./pages/Practice.jsx";

const App = () => {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Home Page */}
        <Route path="/" element={<Home />} />

        {/* Login Route */}
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/dashboard" />}
        />

        {/* Signup Route */}
        <Route
          path="/signup"
          element={!authUser ? <Signup /> : <Navigate to="/login" />}
        />

        {/* Dashboard (Protected Route) */}
        <Route
          path="/dashboard"
          element={
            authUser ? (
              <ProtectedRoute>
                {" "}
                <DashBoard />{" "}
              </ProtectedRoute>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Admin Only Route */}
        <Route element={<AdminRoute />}>
          <Route path="/add-problem" element={<AddProblem />} />
        </Route>
          <Route path="/practice" element={<Practice />} />
      </Routes>

      <Toaster />
    </BrowserRouter>
  );
};

export default App;
