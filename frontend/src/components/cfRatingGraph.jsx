import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useCfStorestemp } from "../store/useCfStorestemp";
import dayjs from "dayjs";

export default function CFRatingGraph() {
  const { user, fetchCFUserRating } = useCfStorestemp();
  const [ratingData, setRatingData] = useState([]);

  useEffect(() => {
    const loadRating = async () => {
      const data = await fetchCFUserRating(user?.cfHandle);
      const transformed = data.map((entry) => ({
        name: dayjs.unix(entry.ratingUpdateTimeSeconds).format("MMM YYYY"),
        rating: entry.newRating,
      }));
      setRatingData(transformed);
    };

    if (user?.cfHandle) loadRating();
  }, [user?.cfHandle]);

  return (
    <div className="max-w-5xl  mx-auto p-6 mt-20 mb-20 bg-white border border-gray-200 rounded-2xl shadow-sm">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        📈 Rating History
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={ratingData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" minTickGap={20} />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip
            formatter={(value) => [`Rating: ${value}`, ""]}
            labelFormatter={(label) => `Date: ${label}`}
          />
          <Line
            type="monotone"
            dataKey="rating"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
