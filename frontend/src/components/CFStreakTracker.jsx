import React, { useEffect, useState } from "react";
import { useCfStorestemp } from "../store/useCfStorestemp";
import dayjs from "dayjs";

export default function CFStreakTracker() {
  const { user, fetchCFSubmissions } = useCfStorestemp();
  const [currentStreak, setCurrentStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  useEffect(() => {
    const load = async () => {
      const submissions = await fetchCFSubmissions(user?.cfHandle, 5000);

      // Group submissions by date
      const datesSet = new Set();
      submissions.forEach((sub) => {
        if (sub.verdict === "OK") {
          const dateStr = dayjs.unix(sub.creationTimeSeconds).format("YYYY-MM-DD");
          datesSet.add(dateStr);
        }
      });

      const sortedDates = Array.from(datesSet).sort();
      let currStreak = 1;
      let maxStreakFound = 1;

      for (let i = 1; i < sortedDates.length; i++) {
        const prev = dayjs(sortedDates[i - 1]);
        const curr = dayjs(sortedDates[i]);
        if (curr.diff(prev, "day") === 1) {
          currStreak++;
        } else {
          currStreak = 1;
        }
        maxStreakFound = Math.max(maxStreakFound, currStreak);
      }

      // Check for current streak
      let today = dayjs().format("YYYY-MM-DD");
      let yesterday = dayjs().subtract(1, "day").format("YYYY-MM-DD");
      let count = 0;
      while (datesSet.has(today) || datesSet.has(yesterday)) {
        if (datesSet.has(today)) count++;
        else break;
        today = dayjs(today).subtract(1, "day").format("YYYY-MM-DD");
      }

      setCurrentStreak(count);
      setMaxStreak(maxStreakFound);
    };

    if (user?.cfHandle) load();
  }, [user?.cfHandle]);

  return (
    <div className="max-w-4xl mx-auto mt-4 p-6 bg-white rounded-xl shadow border border-gray-200">
      <h2 className="text-4xl font-semibold mb-3 text-gray-800">
        🔥 Streak Tracker
      </h2>
      <div className="flex justify-between items-center text-gray-700 text-lg">
        <div>
          <p className="text-gray-500 text-sm">Current Streak</p>
          <p className="text-blue-600 font-bold text-2xl">{currentStreak} 🔁</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Longest Streak</p>
          <p className="text-green-600 font-bold text-2xl">{maxStreak} 🏆</p>
        </div>
      </div>
    </div>
  );
}
