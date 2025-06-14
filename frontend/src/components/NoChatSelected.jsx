import { Code, MousePointerClick, Brain, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const NoChatSelected = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex-1 flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-100 to-blue-200 animate-[gradientMove_8s_ease-in-out_infinite]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-md text-center space-y-6 p-8 
        bg-white/30 border border-white/30 shadow-2xl 
        rounded-3xl backdrop-blur-2xl transition-all duration-500"
      >
        {/* Animated Icon */}
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="w-16 h-16 mx-auto rounded-2xl bg-blue-100/60 flex items-center justify-center shadow-lg"
        >
          <Code className="w-8 h-8 text-blue-600 animate-pulse" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-4xl font-extrabold text-blue-700 tracking-tight"
        >
          Welcome, Coding Warrior! ⚔️
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-gray-700 text-base leading-relaxed"
        >
          Ready to explore your{" "}
          <span
            onClick={() => navigate("/codeforces")}
            className="cursor-pointer text-blue-600 hover:text-red-700 font-semibold transition-all duration-300"
          >
            coding journey
          </span>
          ?<br />
          Select a section from the sidebar to dive in.
        </motion.p>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-sm text-blue-600 mt-4 space-y-2"
        >
          {[
            {
              icon: <MousePointerClick className="w-4 h-4" />,
              text: 'Click "Insights" to view your personalized stats.',
            },
            {
              icon: <Brain className="w-4 h-4" />,
              text: "Track your weak topics and consistency.",
            },
            {
              icon: <Sparkles className="w-4 h-4" />,
              text: "Compare yourself with friends and grow faster!",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.07 }}
              className="flex items-center justify-center gap-2 hover:text-blue-800 transition-all duration-300"
            >
              {item.icon}
              <span>{item.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Smooth Background Animation */}
      <style>
        {`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-[gradientMove_8s_ease-in-out_infinite] {
            background-size: 200% 200%;
          }
        `}
      </style>
    </div>
  );
};

export default NoChatSelected;
