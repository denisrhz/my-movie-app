import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faChevronRight } from '@fortawesome/free-solid-svg-icons'

function Breadcrumbs() {
  return (
    <div>
        <ol className="flex items-center gap-4 rounded-md px-4 py-3 shadow-md">
            <li className="inline-flex">
                <div className="flex items-center gap-2 font-medium opacity-80 transition-colors duration-300 hover:text-primary">
                    <FontAwesomeIcon icon={faHome} />
                    <a href="/">Главная</a>
                </div>
            </li>
            <li className="inline-flex">
                <div className="flex items-center gap-2 font-medium opacity-80 transition-colors duration-300 hover:text-primary">
                    <FontAwesomeIcon icon={faHome} />
                    <a href="/movies/">Фильмы</a>
                </div>
            </li>
            <li className="inline-flex">
                <div className="flex items-center gap-2 font-medium opacity-80 transition-colors duration-300 hover:text-primary">
                    <FontAwesomeIcon icon={faChevronRight} />
                    <a href="">Название</a>
                </div>
            </li>
        </ol>
    </div>
  )
}

export default Breadcrumbs
