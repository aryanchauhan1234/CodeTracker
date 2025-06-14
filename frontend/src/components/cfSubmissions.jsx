import { useEffect, useState } from "react";
import { useCfStorestemp } from "../store/useCfStorestemp";
import { useAuthStore } from "../store/useAuthStore";

export default function CFSubmissions() {
    // const { fetchCFSubmissions } from "../helpers/fetchCFSubmissions";
     const {fetchCFSubmissions,user} = useCfStorestemp();
//   const user = useAuthStore((s) => s.user);
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    if (user?.cfHandle) {
      fetchCFSubmissions(user.cfHandle).then(setSubs);
    }
  }, [user?.cfHandle]);

  // if (!subs.length) return <p className="text-gray-500">Loading submissions...</p>;

  return (
    <div className="bg-white p-4 rounded-xl shadow mt-20 mb-20 max-w-5xl mx-auto">
      <h2 className="text-4xl font-semibold mb-3">Recent Submissions</h2>
      <ul className="space-y-2">
        {subs.slice(0, 10).map((sub) => (
          <li key={sub.id} className="flex justify-between items-center p-2 border rounded hover:bg-gray-50">
            <div>
              <p className="font-medium text-sm">{sub.problem.name}</p>
              <p className="text-xs text-gray-500">{sub.problem.tags?.join(", ")}</p>
            </div>
            <span
              className={`text-sm px-2 py-1 rounded-full ${
                sub.verdict === "OK"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {sub.verdict}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
