import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <div className="fixed top-0 z-50 w-full bg-white/20 backdrop-blur-md shadow-md">
      <div className="w-full px-4 py-3 relative">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
            <img className="w-7" src="/logo.png" alt="Logo" />
            <h1 className="text-md font-bold flex items-center">
              <span className="text-black">Code</span>
              <span className="text-orange-500">Tracker</span>
            </h1>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-6 text-sm font-bold">
            <Link to="/" className="px-3 py-1 hover:bg-white/20 rounded transition text-black">
              Leaderboard
            </Link>

            <Link to="/events" className="px-3 py-1 hover:bg-white/20 rounded transition text-black">
              Event Tracker
            </Link>

            {/* ✅ Profile Tracker Dropdown with Increased Hover Area */}
            <div className="relative group">
              <div className="px-3 py-1 hover:bg-white/20 rounded transition text-black cursor-pointer">
                Profile Tracker
              </div>

              {/* Enlarged invisible hover zone (buffer) */}
              <div className="absolute top-full left-0 w-full h-4 group-hover:block hidden"></div>

              {/* Actual dropdown */}
              <div className="absolute top-full left-0 mt-1 w-48 bg-white shadow-lg rounded-lg hidden group-hover:flex flex-col z-50">
                <Link
                  to="/CodeForces"
                  className="px-4 py-2 text-sm text-black hover:bg-gray-100 rounded-t"
                >
                  Codeforces
                </Link>
                <Link
                  to="/portfolio"
                  className="px-4 py-2 text-sm text-black hover:bg-gray-100"
                >
                  Coding <span className="text-orange-500"> Portfolio</span>
                </Link>
                {/* <Link
                  to="/atcoder"
                  className="px-4 py-2 text-sm text-black hover:bg-gray-100 rounded-b"
                >
                  AtCoder
                </Link> */}
              </div>
            </div>

            <Link to="/Freindcomparison" className="px-3 py-1 hover:bg-white/20 rounded transition text-black">
              Friends
            </Link>

            {authUser && (
              <button
                onClick={logout}
                className="px-3 py-1 hover:bg-white/20 rounded transition text-black"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
