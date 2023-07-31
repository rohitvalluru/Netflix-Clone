import React, { useState } from "react";
import movieTrailer from 'movie-trailer';
import { HiPlayCircle } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { BiPlus, BiCheck } from "react-icons/bi";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeFromLikedMovies } from "../store";


export default React.memo(function Card({ index, movieData }) {
    const [trailerUrl, setTrailerUrl] = useState('');
    const [email, setEmail] = useState(undefined);
    const navigate = useNavigate();
    const BASE_URL = ' ';
    const [isAddedToList, setIsAddedToList] = useState(() => {
        const storedState = localStorage.getItem("addedToListState");
        return storedState ? JSON.parse(storedState) : {};
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleButtonClick = async () => {
        setLoading(true);
        try {
            const movieId = movieData.id.toString();
            const updatedState = { ...isAddedToList };
            updatedState[movieId] = !updatedState[movieId];
            localStorage.setItem("addedToListState", JSON.stringify(updatedState));
            setIsAddedToList(updatedState);

            if (updatedState[movieId]) {
                await addToList();
            } else {
                await removeFromList();
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError("Error occurred while updating the list.");
        }
    };

    const handleTrailer = () => {
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            movieTrailer(movieData?.name || "")
                .then((url) => {
                    if (!url) {
                        alert("Trailer URL for this movie was not found.");
                        return;
                    }
                    const urlParams = new URLSearchParams(new URL(url).search);
                    const videoId = urlParams.get("v");
                    setTrailerUrl(videoId);
                    navigate(`/player?videoId=${videoId}`);
                })
                .catch((error) => console.log(error))
        }
    };

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) setEmail(currentUser.email);
        else navigate("/login");
    });

    const dispatch = useDispatch();

    const addToList = async () => {
        try {
            await axios.post(`${BASE_URL}/api/user/add`, { email, data: movieData });
        } catch (error) {
            throw new Error("Failed to add movie to list.");
        }
    };

    const removeFromList = async () => {
        try {
            await axios.put(`${BASE_URL}/api/user/delete`, { email, movieId: movieData.id });
        } catch (error) {
            throw new Error("Failed to remove movie from list.");
        }
    };

    return (
        <div className="grid relative group">
            <img
                src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
                alt="card"
                className="object-cover rounded-lg cursor-pointer"
                loading="lazy"
            />
            <h3 className='text-gray-200 text-xl text-center font-bold'>{movieData.name}</h3>
            {/* Conditionally render the "Play" button on hover */}
            <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    className="bg-transparent text-white  rounded-md flex items-center font-bold text-5xl w-24 justify-center hover:bg-white"
                    onClick={handleTrailer}
                    style={{ background: 'none' }} // Use inline style to remove the background color
                >
                    <HiPlayCircle className="mr-2" />
                </button>
                <button
                    className="bg-transparent text-white h-8 rounded-md flex items-center font-bold text-5xl w-24 justify-center hover:bg-white"
                    style={{ background: 'none' }}
                    onClick={handleButtonClick} // Use inline style to remove the background color
                >
                    {isAddedToList[movieData.id] ? <BiCheck className="mr-2" title="Remove from List" onClick={() => dispatch(removeFromLikedMovies({ movieId: movieData.id, email }))} />
                        : <BiPlus className="mr-2" title="Add to my list" onClick={addToList} />}
                </button>
            </div>

        </div>
    );
});
