import React, { useState, useEffect } from 'react';
import Dropdown from './Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { baseUrl, generateUrl, initFilterParams, options, prepareParams } from '../utils/requestHelper';
import { useTranslation } from 'react-i18next';

const ContentFilter = ({ fetchMovies, filterParams, setFilterParams, setCurrentPage }) => {
  const { t, i18n } = useTranslation();

  const getGenres = async (params) => {
    if (params.language === 'et') {params.language = 'en'}
    try {
      const url = generateUrl(`${baseUrl}/genre/movie/list`, params);
      const response = await fetch(url, options);
      const data = await response.json();
      const genres = data.genres.map(genre => ({ name: genre.name, value: genre.id }));
      setFilterParams(prev => ({
        ...prev,
        genres: {
          ...prev.genres,
          elements: genres
        }
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const getCountries = async (params) => {
    try {
      const url = generateUrl(`${baseUrl}/configuration/countries`, params);
      const response = await fetch(url, options);
      const data = await response.json();
      const countries = data.map(country => ({
        name: country.native_name,
        value: country.iso_3166_1
      }));
      setFilterParams(prev => ({
        ...prev,
        countries: {
          ...prev.countries,
          elements: countries
        }
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const onClickFilter = () => {
    setCurrentPage(1);
    fetchMovies(prepareParams(filterParams, 1));
  };

  useEffect(() => {
    setFilterParams(initFilterParams(t));

    const fetchData = async () => {
      await getGenres({ language: i18n.language });
      await getCountries({ language: i18n.language });
    };

    fetchData();
  }, [i18n.language]);

  return (
    <div>
      <div className="flex flex-wrap">
        <Dropdown filterParam={filterParams.primary_release_dates} optionKey={"primary_release_dates"} setFilterParams={setFilterParams} />
        <Dropdown filterParam={filterParams.genres} optionKey={"genres"} setFilterParams={setFilterParams} />
        <Dropdown filterParam={filterParams.countries} optionKey={"countries"} setFilterParams={setFilterParams} />
        <Dropdown filterParam={filterParams.sort_by} optionKey={"sort_by"} setFilterParams={setFilterParams} />
        <button onClick={onClickFilter} className="px-2 mx-1 py-1.5 text-sm text-start tracking-wide text-white capitalize transition-colors duration-300 transform bg-purple-700 rounded-sm hover:bg-purple-600 focus:outline-none">
          <span className="mr-1"><FontAwesomeIcon icon={faFilter} /></span>
          {t('filters.filterButton')}
        </button>
      </div>
    </div>
  );
}

export default ContentFilter;