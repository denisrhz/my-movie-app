import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const HeaderSearch = () => {
    return (
    <div className="flex-none relative my-auto mx-2">
        <input
        type="search"
        placeholder="Search"
        aria-label="Search"
        aria-describedby="button-addon1"
        className="block w-72 p-1 text-base text-gray-600 flex-auto rounded-sm border border-solid border-gray-700 bg-clip-padding px-3 font-normal leading-[1.6] outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-gray-600 focus:text-gray-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none" />
        <button className="absolute right-2 top-1.5"><FontAwesomeIcon className="text-midnight" icon={faSearch}/></button>
        <slot></slot>
    </div>
    );
}

export default HeaderSearch;