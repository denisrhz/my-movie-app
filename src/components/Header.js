import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import HeaderSearch from './HeaderSearch';
import ContentList from './ContentList';
// import ContentListElement from './ContentListElement';

const Header = () => {
  return (
    <header className="bg-night drop-shadow-md">
        <div className="flex p-2">
            <div className="flex-none my-auto">
                <button className="p-1">
                    <FontAwesomeIcon icon={faBars} size="lg" />
                </button>
            </div>
            <div className="flex-none my-auto mx-3">
                <img src="https://s2.bunnycdn.ru/assets/sites/zoro/logo.png" className="w-24" alt="logo"/>
            </div>
            <div className="grow"></div>
            <HeaderSearch v-click-away="awaySearch" v-model="searchQuery">
                <ContentList v-if="suggestionIsActive"
                className="absolute overflow-auto flex flex-col w-full py-1 bg-midnight rounded-sm top-10">
                    {/* <ContentListElement>
                    </ContentListElement> */}
                </ContentList>
            </HeaderSearch>
            <div className="flex-none my-auto mx-2 justify-self-end">
                <button className="w-full px-5 py-2 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-purple-600 rounded-md sm:mx-2 sm:order-2 sm:w-auto hover:bg-purple-500 focus:outline-none focus:ring focus:ring-purple-300 focus:ring-opacity-20">Login</button>
            </div>
        </div>
    </header>
  );
}

export default Header;