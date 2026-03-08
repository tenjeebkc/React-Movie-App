import './App.css'
import { Route, Routes } from 'react-router-dom';
import MovieDetails from './pages/MovieDetails';
import  Home  from './pages/Home';

function App() {
  return (
    // <Routes> = Here are all the pages of my app
    // <Route path = "/" element = {...} /> = When url is /, Show this UI
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/movie/:id' element={<MovieDetails />} />
    </Routes>
  );
}

export default App;