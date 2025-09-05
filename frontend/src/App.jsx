import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  const isAuth = null

  return (
    <div className="flex flex-col items-center justify-start">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isAuth ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={!isAuth ? <Login /> : <Navigate to="/" />} />
          <Route path="/signup" element={!isAuth ? <Signup /> : <Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
