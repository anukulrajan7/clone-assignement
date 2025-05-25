import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  };

  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;

    // Tailwind expects the `dark` class on <html>, not <body>
    if (isDarkMode) {
      root.classList.add("dark");
      root.classList.remove("light");
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
      document.body.classList.remove("dark-theme");
      document.body.classList.add("light-theme");
    }

    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
