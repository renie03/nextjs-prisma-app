"use client";

import { useTheme } from "next-themes";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative flex items-center justify-center cursor-pointer"
    >
      <div className="absolute transition-all duration-300 scale-100 rotate-0 dark:scale-0 dark:-rotate-90">
        <MdDarkMode size={20} />
      </div>
      <div className="absolute transition-all duration-300 scale-0 -rotate-90 dark:scale-100 dark:rotate-0">
        <MdLightMode size={20} />
      </div>
    </button>
  );
};

export default ThemeToggle;
