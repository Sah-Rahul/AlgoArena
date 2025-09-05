import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuthStore } from "./store/useAuthStore.js";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import Layout from "./Components/Layout.jsx";
import AdminRoute from "./Components/AdminRoute.jsx";
import AddProblem from "./pages/AddProblem.jsx";

const App = () => {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start">
      <BrowserRouter>
        <Routes>
          {/* Layout route */}
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={authUser ? <Home /> : <Navigate to="/login" />}
            />
          </Route>

          {/* Public routes */}
          <Route
            path="/login"
            element={!authUser ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!authUser ? <Signup /> : <Navigate to="/login" />}
          />

          <Route element={<AdminRoute />}>
            <Route
              path="/add-problem"
              element={authUser ? <AddProblem /> : <Navigate to={"/"} />}
            />
          </Route>
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
};

export default App;
