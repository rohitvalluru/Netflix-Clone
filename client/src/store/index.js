import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api_Key, Tmdb_Base_Url } from "../utils/constants";
import axios from "axios";

const initialState = {
    movies: [],
    genresLoaded: false,
    genres: [],
    selectedGenre: null,
};

const BASE_URL = ' ';

export const getGenres = createAsyncThunk("netflix/genres", async () => {
    const { data: { genres }, } = await axios.get(`${Tmdb_Base_Url}/genre/movie/list?api_key=${Api_Key}&language=en-US`);
    return genres;
});

const createArrayFromRawData = (array, moviesArray, genres) => {
    array.forEach((movie) => {
        const movieGenres = [];
        movie.genre_ids.forEach((genre) => {
            const name = genres.find(({ id }) => id === genre);
            if (name) movieGenres.push(name.name);
        });
        if (movie.backdrop_path) {
            moviesArray.push({
                id: movie.id,
                name: movie?.original_name ? movie.original_name : movie.original_title,
                image: movie.backdrop_path,
                genres: movieGenres.slice(0, 3),
            })
        }
    })
}

const getRawData = async (api, genres, paging) => {
    const moviesArray = [];
    for (let i = 1; moviesArray.length < 80 && i < 10; i++) {
        const { data: { results } } = await axios.get(`${api}${paging ? `&page=${i}` : ""}&language=en-US`);
        createArrayFromRawData(results, moviesArray, genres);
    }
    return moviesArray;
};

export const fetchMovies = createAsyncThunk("netflix/trending", async ({ type }, thunkApi) => {
    const {
        netflix: { genres },
    } = thunkApi.getState();
    return getRawData(`${Tmdb_Base_Url}/trending/${type}/week?api_key=${Api_Key}&language=en-US`, genres, true);
})

export const fetchDataByGenre = createAsyncThunk(
    "netflix/moviesbygenre",
    async ({ genre, type }, thunkApi) => {
        const {
            netflix: { genres },
        } = thunkApi.getState();
        return getRawData(
            `${Tmdb_Base_Url}/discover/${type}/?api_key=${Api_Key}&with_genres=${genre}`,
            genres
        );
    }
);

export const getUserLikedMovies = createAsyncThunk(
    "netflix/getLiked",
    async (email, { rejectWithValue }) => {
        try {
            const { data: { movies } } = await axios.get(`${BASE_URL}/api/user/liked/${email}`);
            return movies;
        } catch (error) {
            // Handle errors and return a rejected promise with the error message
            return rejectWithValue(error.message);
        }
    }
);

export const removeFromLikedMovies = createAsyncThunk(
    "netflix/deleteLiked",
    async ({ email, movieId }, { rejectWithValue }) => {
        try {
            const { data: { movies } } = await axios.put(`${BASE_URL}/api/user/delete`, {
                email,
                movieId
            });
            return movies;
        } catch (error) {
            // Handle errors and return a rejected promise with the error message
            return rejectWithValue(error.message);
        }
    }
);

const NetflixSlice = createSlice({
    name: "Netflix",
    initialState,
    reducers: {
        setSelectedGenre: (state, action) => {
            state.selectedGenre = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getGenres.fulfilled, (state, action) => {
            state.genres = action.payload;
            state.genresLoaded = true;
        });

        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.movies = action.payload;
        });

        builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
            state.movies = action.payload;
        });

        builder.addCase(getUserLikedMovies.fulfilled, (state, action) => {
            state.movies = action.payload;
        });

        builder.addCase(removeFromLikedMovies.fulfilled, (state, action) => {
            state.movies = action.payload;
        })
    },
});

export const { setSelectedGenre } = NetflixSlice.actions;
export const selectSelectedGenre = (state) => state.netflix.selectedGenre; // Add a selector to access the selectedGenre.
export const store = configureStore({
    reducer: { netflix: NetflixSlice.reducer },
});

