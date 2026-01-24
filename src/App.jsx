import { useState } from 'react'
import './App.css'

function App() {
const [query, setQuery] = useState("");
const [movies, setMovies] = useState([])

async function handleSearch(){
  if(!query) return;

  const response = await fetch(
     `https://www.omdbapi.com/?s=${query}&apikey=c443b2c5`
  );
  const data = await response.json();
  setMovies(data.Search || []);
}

  return (
    <>
    <div>
      <h1>Movie App 🎬</h1>

      <input type="text"
      placeholder='Search Movie...'
      value={query}
      onChange={(e)=> setQuery(e.target.value)} />

      <button onClick={handleSearch}>Search</button>

      <div className="movies">
        {movies.map((movie) =>(
          <div className="movie-card" key={movie.imdbID}>
            <img 
            src= {movie.Poster !== "N/A" ? movie.Poster : ""} 
            alt={movie.Title}
            />
            <h3>{movie.Title}</h3>
            <p>{movie.year}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default App
