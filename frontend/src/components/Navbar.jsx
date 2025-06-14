import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, Code, Settings, User, BarChart3, Brain } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header
      className="fixed top-0 z-50 w-full border-b border-white/10 bg-white/20 backdrop-blur-md shadow-md"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Code className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold text-black drop-shadow">CodeTracker</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/codeforces" className="btn btn-sm gap-2 transition-colors bg-white/10 hover:bg-white/20 backdrop-blur rounded">
              <BarChart3 className="w-5 h-5 text-primary" />
              <span className="hidden sm:inline text-blue-600">Codeforces</span>
            </Link>

            <Link to="/Freindcomparison" className="btn btn-sm gap-2 transition-colors bg-white/10 hover:bg-white/20 backdrop-blur rounded">
              <Brain className="w-5 h-5 text-red-400" />
              <span className="hidden sm:inline text-red-400">Friends</span>
            </Link>

            <Link to="/settings" className="btn btn-sm gap-2 transition-colors bg-white/10 hover:bg-white/20 backdrop-blur rounded">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link to="/profile" className="btn btn-sm gap-2 transition-colors bg-white/10 hover:bg-white/20 backdrop-blur rounded">
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button onClick={logout} className="btn btn-sm gap-2 transition-colors bg-white/10 hover:bg-white/20 backdrop-blur rounded">
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
