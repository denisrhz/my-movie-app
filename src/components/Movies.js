import React from 'react';
import { useSelector } from 'react-redux';
import Header from './Header';
import Footer from './Footer';
import ContentFilter from './ContentFilter';
import ContentGrid from './ContentGrid';
import Pagination from './Pagination';
import ContentList from './ContentList';
import ContentListElement from './ContentListElement';

const Movies = () => {
    const currentPage = useSelector(state => state.data.currentPage);

  return (
    <div>
    <Header />
    <div className='min-h-screen container mx-auto'>
    <div className="flex flex-wrap lg:flex-nowrap">
            <div className="m-3">
                <h1 className="mb-3 text-primary text-3xl">Смотреть сериалы онлайн</h1>
                <ContentFilter className="ml-2"/>
                <ContentGrid />
                <div>
                    <h1 className="text-red-600">Loading...</h1>
                </div>
                <Pagination />
            </div>
            <div className="m-3">
                <h3 className="mb-3 text-3xl text-primary">Лучшие</h3>
                <ContentList className="bg-midnight p-3 shadow-lg">
                    <ContentListElement className="min-w-[280px]"/>
                </ContentList>
            </div>
        </div>
    </div>
    <Footer />
  </div>
  );
}

export default Movies;
