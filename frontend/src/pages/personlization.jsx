import React, { useEffect, useState } from "react";
import { useCfStorestemp } from "../store/useCfStorestemp";
import axios from "axios";
import dayjs from "dayjs";

export default function CFPersonalization() {
  const { user } = useCfStorestemp();
  const [topicStats, setTopicStats] = useState({});
  const [dailyActivity, setDailyActivity] = useState([]);
  const [ratingHistory, setRatingHistory] = useState([]);
  const [suggestion, setSuggestion] = useState("");
  const [todaySolved, setTodaySolved] = useState(0); // ✅ added

  useEffect(() => {
    const fetchInsights = async () => {
      if (!user?.cfHandle) return;

      const subRes = await axios.get(
        `https://codeforces.com/api/user.status?handle=${user.cfHandle}&from=1&count=5000`
      );
      const submissions = subRes.data.result;

      const dailyMap = new Map();
      const tagMap = new Map();
      const ratingTrend = [];
      const solvedSet = new Set();

      submissions.forEach((sub) => {
        if (sub.verdict === "OK") {
          const key = `${sub.problem.contestId}-${sub.problem.index}`;
          if (!solvedSet.has(key)) {
            solvedSet.add(key);

            const date = dayjs.unix(sub.creationTimeSeconds).format("YYYY-MM-DD");
            dailyMap.set(date, (dailyMap.get(date) || 0) + 1);

            (sub.problem.tags || []).forEach((tag) => {
              tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
            });

            if (sub.problem.rating) {
              ratingTrend.push({
                time: sub.creationTimeSeconds,
                rating: sub.problem.rating,
              });
            }
          }
        }
      });

      const weakTopics = Array.from(tagMap.entries())
        .filter(([_, count]) => count < 3)
        .map(([tag]) => tag);

      setTopicStats({
        weakTopics,
        totalTags: tagMap.size,
      });

      const sortedDays = Array.from(dailyMap.entries()).sort((a, b) =>
        dayjs(a[0]).isAfter(dayjs(b[0])) ? 1 : -1
      );
      setDailyActivity(sortedDays);

      const today = dayjs().format("YYYY-MM-DD"); // ✅ today's date
      const todayCount = dailyMap.get(today) || 0;
      setTodaySolved(todayCount); // ✅ store in state

      const last10 = ratingTrend.slice(-10).map((r) => r.rating);
      const growth = last10.length >= 2 && last10[last10.length - 1] > last10[0];
      setRatingHistory(ratingTrend);

      const suggest = [];
      if (weakTopics.length > 0) suggest.push("📚 Practice more in weak topics.");
      if (sortedDays.length > 5) {
        const recentDays = sortedDays.slice(-5);
        const avg = recentDays.reduce((a, b) => a + b[1], 0) / 5;
        if (avg < 2) suggest.push("⚠️ Solve more problems daily to stay consistent.");
      }
      if (todayCount < 2)
        suggest.push(`🔥 You’ve solved only ${todayCount} problem(s) today. Try solving more!`);
      if (!growth) suggest.push("📈 Try higher-rated problems to boost your skill.");

      setSuggestion(suggest.join(" "));
    };

    fetchInsights();
  }, [user?.cfHandle]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white to-blue-50  py-[7%] px-4 ">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">
          🧠 Personalized Codeforces Insights
        </h2>

        {/* ✅ Today’s Progress Section */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">🗓️ Today’s Progress</h3>
          <p className="text-sm text-gray-600">
            You've solved <strong>{todaySolved}</strong> problem{todaySolved !== 1 ? "s" : ""} today.
          </p>
        </section>

        <section className="mb-10">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">🔍 Weak Topics</h3>
          {topicStats.weakTopics?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {topicStats.weakTopics.map((tag) => (
                <span
                  key={tag}
                  className="bg-red-100 text-red-700 px-4 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No weak topics detected. You're strong across the board! 💪</p>
          )}
        </section>

        <section className="mb-10">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">📅 Recent Daily Activity</h3>
          <ul className="text-gray-600 text-sm space-y-1">
            {dailyActivity.slice(-5).map(([date, count]) => (
              <li key={date} className="flex justify-between bg-gray-100 rounded-lg px-5">
                <span className="font-bold">{date}</span>
                <span className="text-green-400 font-bold">{count} problem(s)</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">📈 Growth Insight</h3>
          <p className="text-gray-600 text-sm">
            Based on your last few submissions, you're{" "}
            {ratingHistory.length > 5 &&
            ratingHistory[ratingHistory.length - 1].rating >
              ratingHistory[0].rating
              ? "on a growth path. Keep it up! 🚀"
              : "not growing much. Try pushing your limits. ⚠️"}
          </p>
        </section>

        <section className="bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-4 rounded-xl">
          <h4 className="font-semibold text-lg mb-1">💡 Suggestions for You</h4>
          <p className="text-sm">
            {suggestion || "You're doing great! Just keep the momentum going. 🔥"}
          </p>
        </section>
      </div>
    </div>
  );
}
