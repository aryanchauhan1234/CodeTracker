import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { useCfStorestemp } from "../store/useCfStorestemp";

export default function CFProblemSolved() {
  const { user, fetchCFSubmissions } = useCfStorestemp();
  const [distribution, setDistribution] = useState([]);

  useEffect(() => {
    const loadDistribution = async () => {
      const submissions = await fetchCFSubmissions(user?.cfHandle, 5000);

      // Filter only successful submissions
      const solvedSet = new Set();
      const solved = submissions.filter((sub) => {
        const key = `${sub.problem.contestId}-${sub.problem.index}`;
        if (sub.verdict === "OK" && !solvedSet.has(key)) {
          solvedSet.add(key);
          return true;
        }
        return false;
      });

      const freqMap = new Map();
      for (const sub of solved) {
        const rating = sub.problem.rating;
        if (rating) {
          freqMap.set(rating, (freqMap.get(rating) || 0) + 1);
        }
      }

      // Convert to sorted array
      const chartData = Array.from(freqMap.entries())
        .sort((a, b) => a[0] - b[0])
        .map(([rating, count]) => ({ rating, count }));

      setDistribution(chartData);
    };

    if (user?.cfHandle) loadDistribution();
  }, [user?.cfHandle]);

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow border border-gray-200">
      <h2 className="text-4xl font-semibold mb-4 text-gray-800">
        🧠 Problem Rating Distribution
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={distribution}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="rating" />
          <YAxis />
          <Tooltip
            formatter={(value) => [`${value} solved`, "Count"]}
            labelFormatter={(label) => `Rating: ${label}`}
          />
          <Bar dataKey="count" fill="#3b82f7" radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
