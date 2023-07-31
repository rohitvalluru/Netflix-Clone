import { onAuthStateChanged } from 'firebase/auth';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { firebaseAuth } from '../utils/firebase-config';
import { useEffect, useState } from 'react';
import img2 from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import Card from '../components/Card';
import { getUserLikedMovies } from "../store";

const MyList = () => {
    const movies = useSelector((state) => state.netflix.movies);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState(undefined);
    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) setEmail(currentUser.email);
        else navigate("/login")
    });

    useEffect(() => {
        if (email) {
            dispatch(getUserLikedMovies(email));
        }
    }, [email])

    const links = [
        { name: "Home", link: "/" },
        { name: "TV Shows", link: "/tv" },
        { name: "Movies", link: "/movies" },
        { name: "My List", link: "/mylist" },
    ];
    return (
        <div className='bg-black' style={{ background: 'black' }}>
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
                <button className="bg-red-700 text-white rounded-lg h-8 px-4 hover:bg-red-600" onClick={() => signOut(firebaseAuth)}>
                    <Link to="/login">Sign Out</Link>
                </button>
            </nav>
            <div className='grid grid-cols-4 gap-5 px-3 mt-5' style={{ flexWrap: 'wrap' }}>
                {movies.map((movie, index) => {
                    return <Card movieData={movie} index={index} key={movie.id} style={{ flexBasis: '25%' }} />
                })}
            </div>

        </div>
    )
}

export default MyList