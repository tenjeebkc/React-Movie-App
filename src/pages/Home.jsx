import { useState, useEffect } from 'react'
import MovieCard from '../components/MovieCard';
import { Link } from 'react-router-dom';

function Home({ favorites, setFavorites }) {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch() {
    if (!query) return;

    // Start loading & reset old data
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${query}&apikey=c443b2c5`
      );

      const data = await response.json();

      // Handle movie not found
      if (data.Response === "False") {
        setError(data.Error);
        setMovies([]); // Clear old results if search fails
      }
      else {
        localStorage.setItem("movies", JSON.stringify(data.Search))
        localStorage.setItem("query", query)
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  // Effect  to save the query 
  useEffect(() => {
    const savedMovies = localStorage.getItem("movies")
    const savedQuery = localStorage.getItem("query")

    if(savedMovies){
      setMovies(JSON.parse(savedMovies))
    }
    if(savedQuery){
      setQuery(savedQuery)
    }
  }, [])

  return (
        <div>
        <div className="heading">
        <h1>Movie App🎬 - Made for you.</h1>
        <h3>Search your favourite movies here.</h3>
    <Link to="/favorites" className='favorites-link'>⭐ Favorites</Link> 
        <input type="text"
          placeholder='Search Movie...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />

        <button className='search' onClick={handleSearch}>Search</button>
        {loading && <p>Loading...</p>}
        {error && <p style={{color: "red"}}>{error}</p>}
          </div>

        <div className="movies">
          {movies.map((movie) => (
          <MovieCard 
          key={movie.imdbID} 
          movie={movie}
          favorites = {favorites}
          setFavorites = {setFavorites}/>
          ))}
        </div>
      </div>
  );
}

export default Home;
