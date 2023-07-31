import React, { useEffect } from 'react';
import homeimg from '../assets/home1.avif';
import img2 from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, fetchMovies } from '../store';
import Slider from '../components/Slider';
import { createSelector } from 'reselect';
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import YouTube from 'react-youtube';

const Netflix = () => {
    const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
    const selectMovies = createSelector(
        (state) => state.netflix.movies,
        (movies) => {
            // Add any data transformation or filtering here, if required
            return movies;
        }
    );

    // In the Netflix component, use the memoized selector
    const movies = useSelector(selectMovies);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGenres());
    }, []);

    useEffect(() => {
        if (genresLoaded) dispatch(fetchMovies({ type: "all" }));
    }, [genresLoaded])
    const links = [
        { name: "Home", link: "/" },
        { name: "TV Shows", link: "/tv" },
        { name: "Movies", link: "/movies" },
        { name: "My List", link: "/mylist" },
    ];

    const navigate = useNavigate();

    const handlePlay = () => {
        navigate(`/player?videoId=${"mZsPXkbGVKk"}`);
    }

    const handleGif = () => {
        navigate(`/gif`)
    }

    return (
        <div>
            <img src={homeimg} alt='himg' className="object-cover w-screen h-screen opacity-95 brightness-90" />
            <img src={img2} alt='logo' className="absolute h-20 left-5 top-7" />
            <div>
                <ul className="flex flex-row absolute text-gray-100 tracking-wide font-bold text-2xl h-20 top-14 left-72 gap-16">
                    {links.map(({ name, link }) => (
                        <li key={name}>
                            <Link to={link} className='hover:text-red-600'>{name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            {/* searchbox */}

            <div className="flex absolute h-20 top-14 right-20 gap-5">
                <div className="mb-3">
                    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                        <input
                            type="search"
                            className="relative m-0 block w-[400px] flex-auto rounded-full bg-slate-200 bg-opacity-80"
                            placeholder="Search"
                            aria-label="Search"
                            aria-describedby="button-addon2"
                            style={{ paddingLeft: '20px' }} />

                        {/* Search Icon */}
                        <button
                            className="input-group-text flex items-center whitespace-nowrap rounded-full px-3 py-1.5 text-center text-base font-normal text-black dark:text-white"
                            id="button-addon2"
                            style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="black"
                                className="h-5 w-5"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
                <button className="bg-red-700 text-white rounded-lg h-8 w-20 hover:bg-red-600" onClick={() => signOut(firebaseAuth)}>
                    <Link to="/login">Sign Out</Link>
                </button>
            </div>
            <h1 className="flex absolute text-7xl font-extrabold top-56 left-20 ">Jujutsu Kaisen</h1>
            <p className='w-2/5 h-1/6 flex absolute text-ellipsis text-xl text-justify font-semibold text-gray-100 left-20 top-80'>
                Satoru Gojo and Geto have been assigned a mission to escort the Star Plasma Vessel to Master Tengen. When they’re ambushed by Toji Fushiguro, a mercenary known as the Sorcerer Killer, will Gojo and Geto survive? And will this be the turning point where Gojo becomes the world’s strongest exorcist while Geto embraces a life of ruin and rebellion?
            </p>
            <h1 className="flex absolute border-l-8 border-white w-48 right-0 bottom-1/4 text-2xl font-bold bg-black shadow-5xl shadow-slate-800 bg-opacity-80 text-white px-8">U/A 16+</h1>
            <button className='flex items-center absolute bg-white rounded-md w-28 justify-center h-15 text-2xl font-semibold bottom-36 left-20 gap-2' onClick={handlePlay}>
                <span><FaPlay className='text-xl h-4' /></span>
                Play
            </button>
            <button className='flex items-center absolute bg-white bg-opacity-40 rounded-md w-44 left-60 justify-center h-15 text-2xl font-semibold bottom-36 gap-2' onClick={handleGif}>
                <span><AiOutlineInfoCircle className='text-2xl h-6' /></span>
                More Info
            </button>

            <Slider movies={movies} />
        </div>

    );
};

export default Netflix;
