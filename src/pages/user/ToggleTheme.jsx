import React from "react";
import { Moon, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/slices/themeSlice"; 

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === "dark";

  return (
    <>
      <button
        onClick={() => dispatch(toggleTheme())}
        className="flex items-center gap-2 px-3 py-2 rounded-lg 
                 text-gray-700 dark:text-gray-300
                 hover:bg-gray-100 dark:hover:bg-gray-800
                 transition-all duration-200"
        aria-label="Toggle theme"
      >
        {isDark ? (
          <>
            <Sun className="w-5 h-5 text-yellow-500" />
            <span className="font-medium">Light</span>
          </>
        ) : (
          <>
            <Moon className="w-5 h-5 text-blue-500" />
            <span className="font-medium">Dark</span>
          </>
        )}
      </button>

      <p>dark mode is still under develpoment so if there will be errors</p>
    </>
  );
};

export default ThemeToggle;
