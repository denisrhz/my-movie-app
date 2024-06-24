import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="w-full px-5 py-2 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-purple-600 rounded-md sm:mx-2 sm:order-2 sm:w-auto hover:bg-purple-500 focus:outline-none focus:ring focus:ring-purple-300 focus:ring-opacity-20"
      >
        {i18n.language.toUpperCase()}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-md shadow-lg z-10">
          <button
            onClick={() => changeLanguage('en')}
            className="block w-full px-4 py-2 text-sm text-white hover:bg-gray-600 focus:outline-none"
          >
            ENG
          </button>
          <button
            onClick={() => changeLanguage('ru')}
            className="block w-full px-4 py-2 text-sm text-white hover:bg-gray-600 focus:outline-none"
          >
            RUS
          </button>
          <button
            onClick={() => changeLanguage('et')}
            className="block w-full px-4 py-2 text-sm text-white hover:bg-gray-600 focus:outline-none"
          >
            EST
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;