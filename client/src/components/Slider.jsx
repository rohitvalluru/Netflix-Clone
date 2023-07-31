
import React from 'react';
import { useLocation } from 'react-router-dom';
import CardSlider from './CardSlider';

const Slider = ({ movies }) => {
    const location = useLocation();
    const getMoviesFromRange = (from, to) => {
        return movies.slice(from, to);
    };

    const sliders = [
        { title: 'Trending Now', data: getMoviesFromRange(0, 10) },
        { title: 'New Releases', data: getMoviesFromRange(10, 20) },
        { title: 'Popular on Netflix', data: getMoviesFromRange(20, 30) },
        { title: 'Binge Worthy', data: getMoviesFromRange(30, 40) },
        { title: 'Hidden Gems For You', data: getMoviesFromRange(40, 50) },
        { title: 'Drama', data: getMoviesFromRange(50, 60) },
        { title: 'Classics', data: getMoviesFromRange(60, 70) },
    ];

    const isMoviesPage = location.pathname === '/movies';
    const isTvShowsPage = location.pathname === '/tv';

    return (
        <div>
            {/* Render the sliders based on the current location */}
            {sliders.map((slider, index) => {
                if ((isMoviesPage || isTvShowsPage) && index < 2) {
                    // For Movies and TV Shows pages, render the first two sliders
                    return <CardSlider key={slider.title} title={slider.title} data={slider.data} />;
                } else if (location.pathname === '/') {
                    // For Home page, render all sliders except the first two
                    return <CardSlider key={slider.title} title={slider.title} data={slider.data} />;
                } else {
                    return null; // Render nothing for other pages (My List, etc.)
                }
            })}
        </div>
    );
};

export default Slider;

