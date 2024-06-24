import React, { useState, useEffect } from 'react';
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <button onClick={toggleTheme} className=" text-white rounded-full">
      {theme === 'light' ? <FiSun className='w-9 h-5' /> : <FiMoon className='w-9 h-5'  />}
    </button>
  );
};

export default ThemeToggle;