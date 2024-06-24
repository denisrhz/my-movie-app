import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import ContentFilter from './ContentFilter';
import ContentGrid from './ContentGrid';
import Pagination from './Pagination';
import ContentList from './ContentList';
import { useTranslation } from 'react-i18next';
import { baseUrl, generateUrl, options, prepareParams, initFilterParams } from '../utils/requestHelper';

const Movies = () => {
  const { t, i18n } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterParams, setFilterParams] = useState(initFilterParams(t));

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
    fetchMovies(prepareParams(filterParams, currentPage, i18n.language));
  }, [currentPage, i18n.language, filterParams]);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen container mx-auto">
        <div className="flex flex-wrap lg:flex-nowrap">
          <div className="m-3">
            <h1 className="mb-3 text-primary text-3xl">{t('title')}</h1>
            <ContentFilter fetchMovies={fetchMovies} filterParams={filterParams} setFilterParams={setFilterParams} setCurrentPage={setCurrentPage} className="ml-2" />
            <ContentGrid movies={movies} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
          <div className="m-3">
            <h3 className="mb-3 text-3xl text-primary">{t('popular')}</h3>
            <ContentList className="bg-midnight p-3 shadow-lg" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Movies;