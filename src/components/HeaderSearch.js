import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faStar } from '@fortawesome/free-solid-svg-icons';
import { Link as RouterLink } from 'react-router-dom';

const HeaderSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [suggestionIsActive, setSuggestionIsActive] = useState(false);

  const sortedSearchResults = searchResults.slice(0, 7);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      setSuggestionIsActive(false);
    } else {
      getSearchResults();
    }
  }, [searchQuery]);

  const getSearchResults = () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZGNiOTBlYmY3ZDE5NmRkNWQyMjRmMzg4MWM4M2JjZCIsInN1YiI6IjY0Y2Q5NzA5NTQ5ZGRhMDExYzI3M2ZlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8hREDgRimJl9MjrwuqXNP81ptiRYyIxma3ki19xQL8Y'
      }
    };

    fetch(`https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=ru-RU&page=1`, options)
      .then(response => response.json())
      .then(response => {
        setSearchResults(response.results);
        setSuggestionIsActive(true);
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="flex-none relative my-auto mx-2">
      <input
        type="search"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search"
        aria-label="Search"
        aria-describedby="button-addon1"
        className="block w-72 p-1 text-base text-gray-600 flex-auto rounded-sm border border-solid border-gray-700 bg-clip-padding px-3 font-normal leading-[1.6] outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-gray-600 focus:text-gray-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none"
      />
      <button className="absolute right-2 top-1.5">
        <FontAwesomeIcon icon={faSearch} className="text-midnight" />
      </button>
      {suggestionIsActive && (
        <div className="absolute overflow-auto flex flex-col w-full py-1 bg-midnight rounded-sm top-10">
          {sortedSearchResults.map(movie => (
            <RouterLink to={`/movies/${movie.id}`} key={movie.id} className="flex items-start p-1 mb-1">
              <div className="flex-none w-2/6">
                <img className="w-max shadow-sm" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="" />
              </div>
              <div className="ml-4">
                <h2 className="font-semibold whitespace-pre-wrap">{movie.title}</h2>
                <p className="mt-1 text-sm text-gray-300">
                  <FontAwesomeIcon icon={faStar} size="sm" />
                  {movie.vote_average.toFixed(1)} &bull; {movie.release_date.slice(0, 4)}
                </p>
              </div>
            </RouterLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeaderSearch;