import React, { useState } from "react";
import { Search, BarChart3 } from "lucide-react";
// import { useAuthStore } from "../store/useAuthStore";
import { useCfStorestemp } from "../store/useCfStorestemp";  

const HandleInput = () => {
  const [handle, setHandle] = useState("");
  const { updateCfHandle } = useCfStorestemp();


  const handleSubmit = (e) => {
    e.preventDefault();
    if (handle.trim()) {
      console.log(handle)
      updateCfHandle(handle);
    }
  };

  return (
    <div className="min-h-[90vh]  flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-100 to-blue-200 animate-[gradientMove_6s_ease-in-out_infinite]  px-4">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-10 w-full max-w-xl transition-all">
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-3 group">
            <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center shadow-md group-hover:bg-indigo-200 transition-colors">
              <BarChart3 className="w-6 h-6 text-blue-700" />
            </div>
            <h1 className="text-3xl font-bold text-blue-700">CodeForces</h1>
            <p className="text-gray-500 text-sm">Track your Codeforces journey</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="text"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            placeholder="Enter your Codeforces handle"
            className="input input-bordered w-full rounded-xl px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:text-blue-700"
          />
          <button
            type="submit"
            className="btn btn-primary px-6 py-2 rounded-xl text-white bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            Analyze
          </button>
        </form>

        <div className="mt-6 text-sm text-center text-gray-400">
          Example: <span className="text-indigo-600 font-medium">tourist</span>, <span className="text-indigo-600 font-medium">benq</span>
        </div>
      </div>
    </div>
  );
};

export default HandleInput;
