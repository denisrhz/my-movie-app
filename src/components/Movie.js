import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { baseUrl, generateUrl, options } from '../utils/requestHelper';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import Footer from './Footer';

const Movie = () => {
  const { t, i18n } = useTranslation();
  
  const { movieId } = useParams();

  const [movieDetails, setMovieDetails] = useState({});
  const [movieCollection, setMovieCollection] = useState({});

  const playerLink = "https://vidsrc.to/embed/movie/" //+ movieId;

  const posterPath = 'https://image.tmdb.org/t/p/w500/' + movieDetails.poster_path;

  const formatRuntime = () => {
    let mins = movieDetails.runtime || 0;
    return `${Math.trunc(mins / 60)} ч ${mins % 60} мин`;
  };

  useEffect(() => {
    const getMovieDetails = async (params) => {
      if (params.language === 'et') {params.language = 'en'}
      const url = generateUrl(`${baseUrl}/movie/${movieId}`, params);
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error(error);
      }
    };

    const getMovieCollection = async (params) => {
      if (movieDetails.belongs_to_collection) {
        const url = generateUrl(`${baseUrl}/collection/${movieDetails.belongs_to_collection.id}`, params);
        try {
          const response = await fetch(url, options);
          const data = await response.json();
          setMovieCollection(data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    getMovieDetails({language: i18n.language});
    // getMovieCollection({language: i18n.language});
  }, [movieId,  i18n.language]);

  console.log(movieDetails);

  return (
    <div>
      <Header />
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
                {formatRuntime()}
              </span>
            </div>
            {movieDetails.tagline && (
              <p className="text-primary">{movieDetails.tagline}</p>
            )}
            <p className="my-2 text-gray-300">{movieDetails.overview}</p>
            <div className="flex gap-4">
              <div className="flex flex-col">
                <div className="flex flex-col mb-3">
                  <span className="text-gray-500 mb-1">{t('movie_Details.originalName')}:</span>
                  <span>{movieDetails.original_title || "-"}</span>
                </div>
                <div className="flex flex-col mb-3">
                  <span className="text-gray-500 mb-1">{t('movie_Details.genres')}:</span>
                  {!! movieDetails.genres && movieDetails?.genres.map(genre => 
                    <span>{genre.name}</span>
                  ) || "-" }
                </div>
                <div className="flex flex-col mb-3">
                  <span className="text-gray-500 mb-1">{t('movie_Details.countries')}:</span>
                  {/* Render countries here */}
                  {!! movieDetails.production_countries && movieDetails?.production_countries.map(country => 
                    <span>{country.name}</span>
                  ) || "-" }
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-col mb-3">
                  <span className="text-gray-500 mb-1">{t('movie_Details.duration')}:</span>
                  <span>{formatRuntime() || "-"}</span>
                </div>
                <div className="flex flex-col mb-3">
                  <span className="text-gray-500 mb-1">{t('movie_Details.date')}:</span>
                  <span>{movieDetails.release_date || "-"}</span>
                </div>
                <div className="flex flex-col mb-3">
                  <span className="text-gray-500 mb-1">{t('movie_Details.companies')}:</span>
                  {!! movieDetails.production_companies && movieDetails?.production_companies.map(company => 
                    <span>{company.name}</span>
                  ) || "-" }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Movie;
