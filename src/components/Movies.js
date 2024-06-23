import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import ContentFilter from './ContentFilter';
import ContentGrid from './ContentGrid';
import Pagination from './Pagination';
import ContentList from './ContentList';
import { baseUrl, generateUrl, options, prepareParams } from '../utils/requestHelper';

const Movies = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
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
      checked: [{ name: "Самые новые", value: "primary_release.desc" }],
      elements: [
        { name: "Самые популярные", value: "popularity.desc" },
        { name: "Бюджет", value: "revenue.desc" },
        { name: "Самые новые", value: "primary_release.desc" },
        { name: "Средняя оценка", value: "vote_average.desc" },
        { name: "Кол-во оценок", value: "vote_count.desc" },
      ]
    },
  });

  const fetchMovies = async (params) => {
    setLoading(true);
    try {
      const url = generateUrl(`${baseUrl}/discover/movie`, params);
      const response = await fetch(url, options);
      const data = await response.json();
      setMovies(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      fetchMovies(prepareParams(filterParams, currentPage));
  }, [currentPage]);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen container mx-auto">
        <div className="flex flex-wrap lg:flex-nowrap">
          <div className="m-3">
            <h1 className="mb-3 text-primary text-3xl">Смотреть сериалы онлайн</h1>
            <ContentFilter fetchMovies={fetchMovies} filterParams={filterParams} setFilterParams={setFilterParams} setCurrentPage={setCurrentPage} className="ml-2" />
            <ContentGrid movies={movies} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
          <div className="m-3">
            <h3 className="mb-3 text-3xl text-primary">Лучшие</h3>
            <ContentList className="bg-midnight p-3 shadow-lg" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Movies;