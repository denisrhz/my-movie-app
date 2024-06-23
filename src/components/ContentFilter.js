import React, { useState, useEffect } from 'react';
import Dropdown from './Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getMovies } from '../redux/services/dataService';

const ContentFilter = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector(state => state.data.currentPage);
  const [filterParams, setFilterParams] = useState({
    genres: {
        name: "Жанры", 
        type: "checkbox", 
        checked: [],
        elements: []
    },
    countries: {
        name: "Страны", 
        type: "checkbox", 
        checked: [],
        elements: []
    },
    primary_release_dates: {
        name: "Год", 
        type: "radio",
        checked: [],
        elements: Array.from({ length: 24 }, (_, i) => {
            return { name: `${2000 + i}`, value: { gte: `${2000 + i}-01-01`, lte: `${2000 + i}-12-31`} }
        })
    },
    sort_by: {
        name: "Сортировать по", 
        type: "radio", 
        checked: [{ name: "Самые популярные", value: "popularity.desc" }],
        elements: [
        { name: "Самые популярные", value: "popularity.desc" },
        { name: "Бюджет", value: "revenue.desc" },
        { name: "Самые новые", value: "primary_release.desc" },
        { name: "Средняя оценка", value: "vote_average.desc" },
        { name: "Кол-во оценок", value: "vote_count.desc" },
        ]
    },
  });

  const getGenres = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZGNiOTBlYmY3ZDE5NmRkNWQyMjRmMzg4MWM4M2JjZCIsIm5iZiI6MTcxOTExNzQ5Ny40MjYxMywic3ViIjoiNjRjZDk3MDk1NDlkZGEwMTFjMjczZmU5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.O4s8B-89ba9zJjFyLy1lEI-I9cG8zsoPJABkZ4LpxcM'
      }
    };

    try {
      const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=ru', options);
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

  const getCountries = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZGNiOTBlYmY3ZDE5NmRkNWQyMjRmMzg4MWM4M2JjZCIsIm5iZiI6MTcxOTExNzQ5Ny40MjYxMywic3ViIjoiNjRjZDk3MDk1NDlkZGEwMTFjMjczZmU5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.O4s8B-89ba9zJjFyLy1lEI-I9cG8zsoPJABkZ4LpxcM'
      }
    };

    try {
      const response = await fetch('https://api.themoviedb.org/3/configuration/countries?language=ru-RU', options);
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
    const params = {
      include_adult: 'false',
      include_video: 'false',
      language: 'ru-RU',
      page: currentPage,
      sort_by: filterParams.sort_by.checked[0].value,
      with_origin_country: filterParams?.countries?.checked.join("|"),
      with_genres: filterParams?.genres?.checked.join("|"),
      ...(filterParams.primary_release_dates) && { 'primary_release_date.gte': filterParams.primary_release_dates?.checked[0]?.value?.gte },
      ...(filterParams.primary_release_dates) && { 'primary_release_date.lte': filterParams.primary_release_dates?.checked[0]?.value?.lte },
    };
    dispatch(getMovies(params))
  };

  useEffect(() => {
    const fetchData = async () => {
      await getGenres();
      await getCountries();
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="flex flex-wrap">
      <Dropdown filterParam={filterParams.primary_release_dates} optionKey={"primary_release_dates"}setFilterParams={setFilterParams} />
      <Dropdown filterParam={filterParams.genres} optionKey={"genres"} setFilterParams={setFilterParams} />
      <Dropdown filterParam={filterParams.countries} optionKey={"countries"} setFilterParams={setFilterParams} />
      <Dropdown filterParam={filterParams.sort_by} optionKey={"sort_by"} setFilterParams={setFilterParams} />
      <button onClick={onClickFilter} className="px-2 mx-1 py-1.5 text-sm text-start tracking-wide text-white capitalize transition-colors duration-300 transform bg-purple-700 rounded-sm hover:bg-purple-600 focus:outline-none">
            <span className="mr-1"><FontAwesomeIcon icon={faFilter}/></span>
            Filter
        </button>
      </div>
    </div>
  );
}

export default ContentFilter;