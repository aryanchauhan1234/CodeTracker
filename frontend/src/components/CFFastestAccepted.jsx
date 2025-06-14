import React, { useEffect, useState } from "react";
import { useCfStorestemp } from "../store/useCfStorestemp";

export default function CFFastestAccepted() {
  const { user, fetchCFSubmissions } = useCfStorestemp();
  const [fastestSubmissions, setFastestSubmissions] = useState([]);

  useEffect(() => {
    const load = async () => {
      const submissions = await fetchCFSubmissions(user?.cfHandle, 3000);

      const accepted = submissions.filter(sub => sub.verdict === "OK");

      // Map for fastest per problem
      const bestMap = new Map();

      for (const sub of accepted) {
        const key = `${sub.problem.contestId}-${sub.problem.index}`;
        const time = sub.timeConsumedMillis || sub.executionTime || 0;
        const existing = bestMap.get(key);

        if (!existing || time < existing.executionTime) {
          bestMap.set(key, {
            id: key,
            name: sub.problem.name,
            rating: sub.problem.rating || "Unrated",
            executionTime: time,
            contestId: sub.contestId,
            index: sub.problem.index,
          });
        }
      }

      const sorted = Array.from(bestMap.values())
        .sort((a, b) => a.executionTime - b.executionTime)
        .slice(0, 10); // Top 10

      setFastestSubmissions(sorted);
    };

    if (user?.cfHandle) load();
  }, [user?.cfHandle]);

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-xl shadow border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        ⚡ Fastest Accepted Solutions (with Ratings)
      </h2>
      <ul className="divide-y divide-gray-100">
        {fastestSubmissions.map((sub, idx) => (
          <li key={sub.id} className="py-2 flex justify-between items-center">
            <a
              href={`https://codeforces.com/contest/${sub.contestId}/problem/${sub.index}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline w-2/3"
            >
              {idx + 1}. {sub.name}
              <span className="ml-2 text-sm text-gray-500">[{sub.rating}]</span>
            </a>
            <span className="text-sm text-gray-700">{sub.executionTime} ms</span>
          </li>
        ))}
        {fastestSubmissions.length === 0 && (
          <p className="text-gray-500 text-sm">No data found.</p>
        )}
      </ul>
    </div>
  );
}
