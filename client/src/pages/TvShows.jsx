import React, { useEffect } from 'react';
import img2 from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, fetchMovies, fetchDataByGenre, selectSelectedGenre, setSelectedGenre } from '../store'; // Make sure setSelectedGenre is imported.
import Slider from '../components/Slider';
import { onAuthStateChanged } from "firebase/auth";
import NotAvailable from '../components/NotAvailable';
import SelectGenre from '../components/SelectGenre';

const TvShows = () => {
  const navigate = useNavigate();
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const dispatch = useDispatch();
  const selectedGenre = useSelector(selectSelectedGenre);

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      if (selectedGenre) {
        dispatch(fetchDataByGenre({ genre: selectedGenre, type: "tv" }));
      } else {
        dispatch(fetchMovies({ type: "tv" }));
      }
    }
    console.log("Movies in Redux store:", movies);

  }, [genresLoaded, selectedGenre, dispatch]);


  onAuthStateChanged(firebaseAuth, (currentUser) => {
    // if (currentUser) navigate("/");
  });

  const links = [
    { name: "Home", link: "/" },
    { name: "TV Shows", link: "/tv" },
    { name: "Movies", link: "/movies" },
    { name: "My List", link: "/mylist" },
  ];

  return (
    <div>
      <nav className="bg-gray-900 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img src={img2} alt='logo' className="h-20" />
          <ul className="flex text-white text-2xl font-bold gap-16">
            {links.map(({ name, link }) => (
              <li key={name}>
                <Link to={link} className="hover:text-yellow-500">{name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <SelectGenre
          genres={genres}
          type="tv"
          setSelectedGenre={(genre) => dispatch(setSelectedGenre(genre))}
        /> {/* Pass setSelectedGenre prop. */}
        <button className="bg-red-700 text-white rounded-lg h-8 px-4 hover:bg-red-600" onClick={() => signOut(firebaseAuth)}>
          <Link to="/login">Sign Out</Link>
        </button>
      </nav>
      <div>
        {movies.length ? <Slider movies={movies} /> :
          <NotAvailable />}
      </div>
    </div>
  );
};

export default TvShows;
