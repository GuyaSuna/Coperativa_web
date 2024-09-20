import React, { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";
import Image from "next/image"; // assuming you're using Next.js
import logoDark from "/public/logoVisoftDark.png";
import logoLight from "/public/logoVisoftLigth.png";
const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") setDarkMode(true);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="flex items-center space-x-4">
      <div
        className="relative w-16 h-8 flex items-center dark:bg-gray-400 bg-gray-500 rounded-full cursor-pointer p-1"
        onClick={() => setDarkMode(!darkMode)}
      >
        <FaMoon className="text-white" size={18} />
        <div
          className="absolute bg-white dark:bg-medium w-6 h-6 rounded-full shadow-md transform transition-transform duration-300"
          style={darkMode ? { left: "2px" } : { right: "2px" }}
        ></div>
        <BsSunFill className="ml-auto text-yellow-400" size={18} />
      </div>
    </div>
  );
};

export default ThemeToggle;
