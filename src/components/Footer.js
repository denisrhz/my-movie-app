import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
  <footer>
    <div className="container py-3 mx-auto">
        <hr className="my-10 border-gray-200 dark:border-gray-700" />
        
        <div className="flex flex-col px-6 items-center sm:flex-row sm:justify-between">
            <p className="text-sm text-gray-500">© Copyright 2021. All Rights Reserved.</p>
            
            <div className="flex mt-3 -mx-2 sm:mt-0">
                <a href="#" className="mx-2 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-500 dark:hover:text-purple-600" aria-label="Reddit"> Teams </a>
                
                <a href="#" className="mx-2 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-500 dark:hover:text-purple-600" aria-label="Reddit"> Privacy </a>
                
                <a href="#" className="mx-2 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-500 dark:hover:text-purple-600" aria-label="Reddit"> Cookies </a>
            </div>
        </div>
    </div>
  </footer>
  );
}

export default Footer;