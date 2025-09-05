import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSignup: false,
  isLoginIn: false,
  isCheckingAuth: false,


  //   Check if user is logged in (on app load)
  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data.user });
    } catch (error) {
      console.error("Auth check failed:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // Signup user
  signup: async (formData) => {
    set({ isSignup: true });
    try {
      const res = await axiosInstance.post("/auth/register", formData);
      set({ authUser: res.data.user });
      toast.success("Signup successful!");
    } catch (error) {
      console.error("Signup failed:", error);
      toast.error(error.response?.data?.message || "Signup failed.");
      set({ authUser: null });
    } finally {
      set({ isSignup: false });
    }
  },

  // Login user
  login: async (formData) => {
    set({ isLoginIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", formData);
      set({ authUser: res.data.user });
      toast.success("Login successful!");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(error.response?.data?.message || "Login failed.");
      set({ authUser: null });
    } finally {
      set({ isLoginIn: false });
    }
  },

  // Logout user
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully.");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed.");
    }
  },
}));
