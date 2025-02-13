import { useState, useEffect } from "react";
import { Moon, Sun, Calculator } from "lucide-react";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark" || false
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode); // Toggle the dark mode state
  };

  return (
    <nav className="flex items-center justify-between px-8 sm:px-16 py-4 bg-gray-100 dark:bg-gray-900 shadow-md">
      {/* Left Icon */}
      <Calculator className="h-8 w-8 text-gray-900 dark:text-white" />

      {/* Title */}
      <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
        Calculator
      </h1>

      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors hover:bg-gray-300 dark:hover:bg-gray-600"
      >
        {darkMode ? (
          <Sun className="h-6 w-6 text-yellow-400" />
        ) : (
          <Moon className="h-6 w-6 text-gray-700" />
        )}
      </button>
    </nav>
  );
};

export default Navbar;
