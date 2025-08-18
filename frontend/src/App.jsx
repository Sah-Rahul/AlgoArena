import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./components/Home";
import AdminHome from "./components/AdminDashboard/AdminHome";
import PracticeProblems from "./components/AdminDashboard/PracticeProblems";
import MySubmissions from "./components/AdminDashboard/MySubmissions";
import PublicSheets from "./components/AdminDashboard/publicSheets";
import SavedProblems from "./components/AdminDashboard/SavedProblems";
import FeaturedCourses from "./components/AdminDashboard/FeaturedCourses";
import Settings from "./components/AdminDashboard/Settings";
// import Layout from "./components/AdminDasboard/Layout";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* admin routes  */}
          <Route>
            <Route path="/admin/dashboard" element={<AdminHome />} />
            <Route path="/admin/practice-problems" element={<PracticeProblems />} />
            <Route path="/admin/my-submissions" element={<MySubmissions />} />
            <Route path="/admin/public-sheets" element={<PublicSheets />} />
            <Route path="/admin/saved-problems" element={<SavedProblems />} />
            <Route path="/admin/featured-courses" element={<FeaturedCourses />} />
            <Route path="/admin/settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;