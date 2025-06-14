import { useState } from "react";
import { useCfStorestemp } from "../store/useCfStorestemp";
import { X } from "lucide-react";
import toast from "react-hot-toast";

const FriendInput = ({ comparisonRef }) => {
  const [input, setInput] = useState("");
  const [friends, setFriends] = useState([]);
  const addFriendsToDB = useCfStorestemp((state) => state.addFriends);

  const handleAddFriend = () => {
    const trimmed = input.trim();
    if (trimmed && !friends.includes(trimmed)) {
      setFriends([...friends, trimmed]);
      setInput("");
    }
  };

  const handleRemoveFriend = (friend) => {
    setFriends(friends.filter((f) => f !== friend));
  };

const handleSubmit = async () => {
  if (friends.length === 0) {
    toast.error("Add at least one friend");
    return;
  }

  const success = await addFriendsToDB(friends);
  if (success) {
    toast.success("Friends saved!");
    setFriends([]);

    // ✅ Set scroll flag in localStorage
    localStorage.setItem("scrollToComparison", "true");

    // ✅ Reload the page
    setTimeout(() => {
      window.location.reload();
    }, 300);
  } else {
    toast.error("Error saving friends");
  }
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-100 to-blue-200 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl p-8 rounded-3xl shadow-2xl bg-white/30 border border-white/20 backdrop-blur-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add Codeforces Friends
        </h2>

        <div className="flex gap-3 mb-4">
          <input
            type="text"
            placeholder="Enter CF handle"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddFriend()}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80"
          />
          <button
            onClick={handleAddFriend}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-all"
          >
            Add
          </button>
        </div>

        {friends.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {friends.map((f) => (
              <div
                key={f}
                className="bg-white/70 backdrop-blur-sm border border-gray-300 text-sm px-3 py-1 rounded-full flex items-center shadow-sm"
              >
                {f}
                <X
                  className="ml-2 w-4 h-4 cursor-pointer text-gray-600 hover:text-red-500"
                  onClick={() => handleRemoveFriend(f)}
                />
              </div>
            ))}
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-all"
        >
          Save Friends
        </button>
      </div>
    </div>
  );
};

export default FriendInput;
