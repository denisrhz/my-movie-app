import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { baseUrl, generateUrl, options, prepareParams } from '../utils/requestHelper';

const Movie = () => {
  const { movieId } = useParams();
  console.log(movieId);

  const [movieDetails, setMovieDetails] = useState({});
  const [movieCollection, setMovieCollection] = useState({});

  const playerLink = "https://vidsrc.to/embed/movie/" + movieId; // Assuming movieId is passed as a prop

  const posterPath = 'https://image.tmdb.org/t/p/w500/' + movieDetails.poster_path;

  const formatRuntime = () => {
    let mins = movieDetails.runtime || 0;
    return `${Math.trunc(mins / 60)} ч ${mins % 60} мин`;
  };

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=ru-RU`, options);
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error(error);
      }
    };

    const getMovieCollection = async () => {
      if (movieDetails.belongs_to_collection) {
        try {
          const response = await fetch(`https://api.themoviedb.org/3/collection/${movieDetails.belongs_to_collection.id}?language=ru-RU`, options);
          const data = await response.json();
          setMovieCollection(data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    getMovieDetails();
    // getMovieCollection(); // Uncomment this if you want to fetch movie collection data as well
  }, [movieId]);

  return (
    <div>
      <Breadcrumbs />
      <iframe
      title='movieIframe'
        src={playerLink}
        allowFullScreen
        className="w-full h-[60vw] max-h-[80vh] mb-4 focus-visible:outline-none"
      ></iframe>
      <div className="container mx-auto p-3">
        <div className="flex">
          <div className="flex-none w-64 shadow-lg">
            {posterPath && <img src={posterPath} alt={movieDetails.title} />}
          </div>
          <div className="ml-5 p-2">
            <h1 className="text-4xl">{movieDetails.title}</h1>
            <div className="my-3">
              <span className="w-full mx-1 px-2 py-1.5 text-sm tracking-wide text-white bg-purple-600 rounded-md">
                <FontAwesomeIcon icon={faStar} />
                {movieDetails.vote_average?.toFixed(1)}
              </span>
              <span className="w-full mx-1 px-2 py-1.5 text-sm tracking-wide text-white rounded-md">
                {movieDetails.release_date?.slice(0, 4)}
              </span>
              <span className="w-full mx-1 px-2 py-1.5 text-sm tracking-wide text-white rounded-md">
                {formatRuntime}
              </span>
            </div>
            {movieDetails.tagline && (
              <p className="text-primary">{movieDetails.tagline}</p>
            )}
            <p className="my-2 text-gray-300">{movieDetails.overview}</p>
            <div className="flex gap-4">
              <div className="flex flex-col">
                <div className="flex flex-col mb-3">
                  <span className="text-gray-500 mb-1">Оригинальное название:</span>
                  <span>{movieDetails.original_title || "-"}</span>
                </div>
                <div className="flex flex-col mb-3">
                  <span className="text-gray-500 mb-1">Жанры:</span>
                  {/* Render genres here */}
                  <span>{null || "-"}</span>
                </div>
                <div className="flex flex-col mb-3">
                  <span className="text-gray-500 mb-1">Страны:</span>
                  {/* Render countries here */}
                  <span>{null || "-"}</span>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-col mb-3">
                  <span className="text-gray-500 mb-1">Продолжительность:</span>
                  <span>{formatRuntime || "-"}</span>
                </div>
                <div className="flex flex-col mb-3">
                  <span className="text-gray-500 mb-1">Дата выхода:</span>
                  <span>{movieDetails.release_date || "-"}</span>
                </div>
                <div className="flex flex-col mb-3">
                  <span className="text-gray-500 mb-1">Компании:</span>
                  {/* Render production companies here */}
                  <span>{null || "-"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
