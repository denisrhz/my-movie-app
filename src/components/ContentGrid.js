import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { posterPath } from '../utils/requestHelper';
import { getMovies } from '../redux/services/dataService';

const ContentGrid = () => {
    const movies = useSelector(state => state.data.movies);
    const dispath = useDispatch();

    useEffect(() => {
        dispath(getMovies({}));
    }, [])
  return (
    <div class="my-3">
    <div class="flex flex-wrap justify-evenly gap-1">
        {!! movies && movies.map(movie => {
            return (
                <div className="w-1/2 max-w-[180px] mb-4">
                <div className="flex flex-col gap-1">
                    <Link to={`movies/${movie.id}`} className="bg-purple-500">
                        <img src={posterPath(movie.backdrop_path)} className="hover:translate-x-1 hover:-translate-y-1 delay-50 duration-100" />
                    </Link>
        
                    <Link to={`movies/${movie.id}`} className="hover:text-purple-500 text-gray-200 font-semibold">{ movie.title }</Link>
                    
                    <a href="#" className="hover:text-purple-500 text-sm text-gray-400 -mt-1"> 78.4K viewers </a>
                    
                    <div className="flex flex-row flex-wrap gap-2">
                        <a href="#" className="hover:bg-gray-600 text-gray-300 text-xs font-semibold bg-midnight px-2 py-1 rounded-full"> Shooter </a>
                        <a href="#" className="hover:bg-gray-600 text-gray-300 text-xs font-semibold bg-midnight px-2 py-1 rounded-full"> FPS </a>
                    </div>      
                </div>
            </div>
            )
        })}
    </div>
</div>
  );
}

export default ContentGrid;