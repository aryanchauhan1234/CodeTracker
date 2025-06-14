import { useEffect, useState } from "react";
import { useCfStorestemp } from "../store/useCfStorestemp";

export default function CodeforcesDashboard() {
  const { fetchCFData, user } = useCfStorestemp();
  const [cfData, setCfData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      if (user?.cfHandle) {
        try {
          const data = await fetchCFData(user.cfHandle);
          setCfData(data);
        } catch (err) {
          console.error("Fetch failed:", err);
        }
      }
    };
    getData();
  }, [user?.cfHandle]);

  if (!cfData) return null;

  return (
    <div className="max-w-5xl mx-auto my-10 px-6 mt-20 mb-20">
      <div className="bg-gradient-to-r from-blue-100/50 via-white/50 to-purple-100/50 backdrop-blur-xl border border-gray-200 shadow-xl rounded-3xl p-8 md:flex md:items-center md:justify-between space-y-6 md:space-y-0">
        
        {/* Left - Avatar + Info */}
        <div className="flex items-center gap-6">
          <img
            src={cfData.avatar}
            alt="Avatar"
            className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-blue-500 shadow-lg"
          />
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold text-gray-800 tracking-tight">
              {cfData.handle}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 capitalize mt-1">
              {cfData.rank}
            </p>
            <a
              href={`https://codeforces.com/profile/${cfData.handle}`}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-4 px-5 py-2 text-sm md:text-base font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-600 hover:to-blue-600 rounded-full shadow-md transition"
            >
              View Profile
            </a>
          </div>
        </div>

        {/* Right - Stats */}
        <div className="grid grid-cols-2 gap-6 md:gap-10 text-center md:text-left w-full md:max-w-xl">
          <div className="bg-white/60 backdrop-blur-md p-4 rounded-xl shadow hover:shadow-lg transition">
            <div className="text-gray-700 text-sm font-medium">Current Rating</div>
            <div className="text-2xl font-bold text-blue-600">{cfData.rating}</div>
          </div>
          <div className="bg-white/60 backdrop-blur-md p-4 rounded-xl shadow hover:shadow-lg transition">
            <div className="text-gray-700 text-sm font-medium">Max Rating</div>
            <div className="text-2xl font-bold text-green-600">{cfData.maxRating}</div>
          </div>
          <div className="bg-white/60 backdrop-blur-md p-4 rounded-xl shadow hover:shadow-lg transition">
            <div className="text-gray-700 text-sm font-medium">Contribution</div>
            <div className="text-2xl font-bold text-purple-600">{cfData.contribution}</div>
          </div>
          <div className="bg-white/60 backdrop-blur-md p-4 rounded-xl shadow hover:shadow-lg transition">
            <div className="text-gray-700 text-sm font-medium">Friend Of</div>
            <div className="text-2xl font-bold text-pink-600">{cfData.friendOfCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
