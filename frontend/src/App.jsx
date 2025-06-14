import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import CodeForces from "./pages/codeForces";
import Personalization from "./pages/personlization";
import AddFreind from "./components/AddFreind"
import FriendComparison from "./pages/FreindComparison";
import { useGlobalStore } from "./store/useGlobalStore";
import GlobalLoader from "./components/GlobalLoader";

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { useEffect } from "react";

import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const isLoading = useGlobalStore((state) => state.isLoading);
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();

  console.log({ onlineUsers });

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div data-theme={theme}>
      {authUser ? <Navbar /> : ""}
      {/* <Navbar/> */}
      {isLoading && <GlobalLoader />}
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/codeforces" element={authUser ? <CodeForces /> : <Navigate to="/login" />} />
        <Route path="/Freindcomparison" element={authUser ? <FriendComparison /> : <Navigate to="/login" />} />
        <Route path="/personalization" element={authUser ? <Personalization /> : <Navigate to="/login" />} />
        <Route path="/addfreind" element={authUser ? < AddFreind /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster />
    </div>
  );
};
export default App;
