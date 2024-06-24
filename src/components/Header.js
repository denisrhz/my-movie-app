import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import HeaderSearch from './HeaderSearch';
import LanguageSelector from './LanguageSelector';
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
            <HeaderSearch v-click-away="awaySearch" v-model="searchQuery" />
            <div className="flex-none my-auto mx-2 justify-self-end">
                <LanguageSelector />
            </div>
        </div>
    </header>
  );
}

export default Header;