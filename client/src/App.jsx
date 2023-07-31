import React from 'react'
import { BrowserRouter, Route, Routes, } from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup.jsx';
import Netflix from './pages/Netflix';
import Player from './pages/Player';
import Movies from './pages/Movies';
import TvShows from './pages/TvShows';
import MyList from './pages/MyList';
import Gif from './pages/Gif';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='player' element={<Player />} />
        <Route exact path='/movies' element={<Movies />} />
        <Route exact path='/tv' element={<TvShows />} />
        <Route exact path='/gif' element={<Gif />} />
        <Route exact path='/mylist' element={<MyList />} />
        <Route exact path='/' element={<Netflix />} />
      </Routes>
    </BrowserRouter>
  )
}
