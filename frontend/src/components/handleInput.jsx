import React, { useState } from "react";
import { Lock, Search } from "lucide-react";
import { useCfStorestemp } from "../store/useCfStorestemp";
import { useLeetCodeStore } from "../store/useLeetCodeStore";
import { useAuthStore } from "../store/useAuthStore";

const HandleInput = () => {
  const [cfHandle, setCfHandle] = useState("");
  const [leetHandle, setLeetHandleInput] = useState("");
  const { updateCfHandle } = useCfStorestemp();
  const { updateLeetHandle } = useLeetCodeStore();
  const { token } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cfHandle.trim()) {
      updateCfHandle(cfHandle);
    }

    if (leetHandle.trim()) {
      const result = await updateLeetHandle(leetHandle, token);
      if (!result.success) {
        alert(result.message);
      }
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center px-4 relative"
      style={{
        backgroundImage: `url('/blur.png')`,
      }}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      <div className="relative z-10 w-full max-w-xl p-10 rounded-2xl bg-white/90 backdrop-blur-lg shadow-xl">
        {/* 🏷️ Section Tag */}
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Complete your details
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          {/* Codeforces Handle */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400 w-5 h-5" />
            <input
              type="text"
              value={cfHandle}
              onChange={(e) => setCfHandle(e.target.value)}
              placeholder="Enter your Codeforces handle"
              className="pl-10 pr-4 py-2 w-full rounded-xl border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm text-gray-700"
            />
          </div>

          {/* LeetCode Handle */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400 w-5 h-5" />
            <input
              type="text"
              value={leetHandle}
              onChange={(e) => setLeetHandleInput(e.target.value)}
              placeholder="Enter your LeetCode handle"
              className="pl-10 pr-4 py-2 w-full rounded-xl border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm text-gray-700"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-xl flex items-center gap-2 transition self-center"
          >
            <Lock className="w-4 h-4" />
            Unlock
          </button>
        </form>
      </div>
    </div>
  );
};

export default HandleInput;
