import './App.css'
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import MovieDetails from './pages/MovieDetails';
import Home from './pages/Home';
import Favorites from './pages/Favorites';


function App() {

  const [favorites, setFavorites] = useState([])

  return (
    // <Routes> = Here are all the pages of my app
    // <Route path = "/" element = {...} /> = When url is /, Show this UI
    <Routes>
      <Route path='/' element={<Home favorites={favorites} setFavorites={setFavorites} />} />
      <Route path='/movie/:id' element={<MovieDetails />} />
      <Route path='/favorites' element={<Favorites favorites={favorites} setFavorites={setFavorites} />} />
    </Routes>
  );
}

export default App;