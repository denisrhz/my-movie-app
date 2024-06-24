import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const Pagination = ({ maxVisibleButtons = 7, currentPage, totalPages, onPageChange }) => {
  const [pages, setPages] = useState([]);
  console.log(currentPage);

  useEffect(() => {
    const generatePages = () => {
      const halfVisibleButtons = Math.floor(maxVisibleButtons / 2);
      let startPage = 1;

      if (currentPage < halfVisibleButtons + 1) {
        startPage = 1;
      } else if (currentPage > totalPages - halfVisibleButtons) {
        startPage = totalPages - maxVisibleButtons + 1;
      } else {
        startPage = currentPage - halfVisibleButtons;
      }

      const range = [];
      for (let i = startPage; i <= Math.min(startPage + maxVisibleButtons - 1, totalPages); i++) {
        range.push({
          name: i,
          isDisabled: i === currentPage
        });
      }
      setPages(range);
    };

    generatePages();
  }, [currentPage, totalPages, maxVisibleButtons]);

  const onClickPreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const onClickPage = (page) => {
    onPageChange(page);
  };

  const onClickNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const isPageActive = (page) => {
    return currentPage === page;
  };

  return (
    <nav className="flex justify-center my-5">
      <ul className="flex">
        <li>
          <button
            onClick={onClickPreviousPage}
            disabled={currentPage === 1}
            className="bg-gray-700 hover:bg-gray-600 text-gray-300 mx-1 flex h-9 w-9 items-center justify-center text-md tracking-wide capitalize transition-colors duration-300 transform rounded-full focus:outline-none focus:ring focus:ring-purple-300 focus:ring-opacity-20"
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
        </li>
        {pages.map((page) => (
          <li key={page.name}>
            <button
              type="button"
              onClick={() => onClickPage(page.name)}
              disabled={page.isDisabled}
              className={`bg-gray-700 hover:bg-gray-600 text-gray-300 mx-1 flex h-9 w-9 items-center justify-center text-md tracking-wide capitalize transition-colors duration-300 transform rounded-full focus:outline-none focus:ring focus:ring-purple-300 focus:ring-opacity-20 ${
                isPageActive(page.name) ? 'bg-purple-600 hover:bg-purple-500' : ''
              }`}
            >
              {page.name}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={onClickNextPage}
            disabled={currentPage === totalPages}
            className="bg-gray-700 hover:bg-gray-600 text-gray-300 mx-1 flex h-9 w-9 items-center justify-center text-md tracking-wide capitalize transition-colors duration-300 transform rounded-full focus:outline-none focus:ring focus:ring-purple-300 focus:ring-opacity-20"
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;