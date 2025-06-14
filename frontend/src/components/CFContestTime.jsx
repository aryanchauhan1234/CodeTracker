import React, { useState } from "react";
import { useCfStorestemp } from "../store/useCfStorestemp";
import axios from "axios";

export default function CFContestSolveTime() {
  const { user } = useCfStorestemp();
  const [contestNumber, setContestNumber] = useState("");
  const [contestId, setContestId] = useState(null);
  const [timeTakenMap, setTimeTakenMap] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // ✅ NEW

  const fetchContestIdByNumber = async (number) => {
    try {
      const res = await axios.get("https://codeforces.com/api/contest.list");
      const contests = res.data.result.filter((c) => c.phase === "FINISHED");
      const selected = contests[number - 1];
      return selected?.id;
    } catch (err) {
      console.error("Failed to fetch contest list", err);
      return null;
    }
  };

  const fetchSolveTimes = async (contestId) => {
    try {
      const contestRes = await axios.get(
        `https://codeforces.com/api/contest.standings?contestId=${contestId}&from=1&count=1`
      );
      const contestInfo = contestRes.data.result.contest;
      const startTime = contestInfo.startTimeSeconds;
      const duration = contestInfo.durationSeconds;

      const subRes = await axios.get(
        `https://codeforces.com/api/user.status?handle=${user.cfHandle}&from=1&count=10000`
      );
      const allSubs = subRes.data.result;

      const filteredSubs = allSubs.filter(
        (sub) => sub.contestId === Number(contestId) && sub.verdict === "OK"
      );

      const earliestAccepted = {};
      for (const sub of filteredSubs) {
        const key = sub.problem.index;
        if (!earliestAccepted[key] || sub.creationTimeSeconds < earliestAccepted[key].time) {
          earliestAccepted[key] = {
            time: sub.creationTimeSeconds,
            withinContest: sub.creationTimeSeconds <= startTime + duration,
          };
        }
      }

      const timeTaken = {};
      for (const [index, { time, withinContest }] of Object.entries(earliestAccepted)) {
        timeTaken[index] = {
          minutes: Math.round((time - startTime) / 60),
          withinContest,
        };
      }

      setTimeTakenMap(timeTaken);
      setError("");
    } catch (err) {
      console.error("Error fetching solve times", err);
      setError("Could not load contest data. Please try again.");
      setTimeTakenMap({});
    }
  };

  const handleSubmit = async () => {
    setLoading(true); // ✅ Start loading
    setError("");
    setTimeTakenMap({});
    const id = await fetchContestIdByNumber(contestNumber);
    if (id) {
      setContestId(id);
      await fetchSolveTimes(id);
    } else {
      setError("Invalid contest number.");
    }
    setLoading(false); // ✅ End loading
  };

  return (
    <div className="max-w-5xl mx-auto mt-4 p-6 bg-white rounded-2xl shadow border border-gray-200">
      <h2 className="text-3xl font-semibold mb-4 text-gray-800">
        🕒 Time Taken Per Problem in Contest
      </h2>

      <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
        <input
          type="number"
          min="1"
          placeholder="Enter Contest Number (e.g., 1 = latest)"
          value={contestNumber}
          onChange={(e) => setContestNumber(e.target.value)}
          className="flex-1 border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          disabled={loading}
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`px-5 py-2 rounded-md text-white transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "⏳ Fetching..." : "Fetch Times"}
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {Object.keys(timeTakenMap).length > 0 ? (
        <ul className="space-y-2">
          {Object.entries(timeTakenMap)
            .sort((a, b) => a[0].localeCompare(b[0]))
            .map(([problem, { minutes, withinContest }]) => (
              <li
                key={problem}
                className={`flex justify-between border px-4 py-2 rounded-md ${
                  withinContest
                    ? "bg-green-100 hover:bg-green-200"
                    : "bg-red-100 hover:bg-red-200"
                }`}
              >
                <span className="font-medium text-gray-700">Problem {problem}</span>
                <span className="text-gray-700">
                  {minutes} min{" "}
                  <span className="ml-2 text-sm font-medium italic">
                    ({withinContest ? "Within Contest" : "After Contest"})
                  </span>
                </span>
              </li>
            ))}
        </ul>
      ) : (
        !error &&
        !loading && <p className="text-gray-500">Enter a contest number to view solve times.</p>
      )}
    </div>
  );
}
