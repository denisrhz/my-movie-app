import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { posterPath } from '../utils/requestHelper';
import { baseUrl, generateUrl, options } from '../utils/requestHelper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';


const ContentList = () => {
  const { t, i18n } = useTranslation();

  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPopularMovies = async (params) => {
    setLoading(true);
    try {
      const url = generateUrl(`${baseUrl}/movie/popular`, params);
      const response = await fetch(url, options);
      const data = await response.json();
      setPopularMovies(data.results);
    } catch (error) {
      console.error('Error fetching popular movies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularMovies({ language: i18n.language, sort_by: "popularity.desc" });
  }, [i18n.language]);

  return (
    <div className="flex flex-col">
      {loading ? (
        <p>Loading...</p>
      ) : (
        popularMovies.map(movie => (
          <Link to={`movies/${movie.id}`} className="flex items-start p-1 mb-1" key={movie.id}>
            <div className="flex-none w-2/6">
              <img className="w-max shadow-sm" src={posterPath(movie.poster_path)} alt={movie.title} />
            </div>
            <div className="ml-4">
              <h2 className="font-semibold whitespace-pre-wrap">{movie.title}</h2>
              <p className="mt-1 text-sm text-gray-300">
                <FontAwesomeIcon icon={faStar} size="sm" />
                {movie.vote_average.toFixed(1)} &bull; {movie.release_date.slice(0, 4)}
              </p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default ContentList;