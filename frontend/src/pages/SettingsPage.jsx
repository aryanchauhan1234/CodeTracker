import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="h-screen pt-20 px-4 mx-auto max-w-5xl">
      <div className="space-y-8">
        {/* Theme Heading */}
        <div>
          <h2 className="text-2xl font-semibold">🎨 Theme Customization</h2>
          <p className="text-sm text-base-content/70 mt-1">
            Select a theme to personalize your chat experience.
          </p>
        </div>

        {/* Theme Selector Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-3">
          {THEMES.map((t) => (
            <button
              key={t}
              className={`group rounded-xl p-2 transition-colors border shadow-sm ${
                theme === t
                  ? "bg-base-200 border-blue-400 ring-2 ring-blue-300"
                  : "hover:bg-base-200/70 border-transparent"
              }`}
              onClick={() => setTheme(t)}
            >
              <div className="relative h-8 w-full rounded-md overflow-hidden" data-theme={t}>
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="rounded bg-primary"></div>
                  <div className="rounded bg-secondary"></div>
                  <div className="rounded bg-accent"></div>
                  <div className="rounded bg-neutral"></div>
                </div>
              </div>
              <span className="text-[11px] font-medium truncate w-full text-center mt-1 text-base-content/80">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
