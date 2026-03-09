import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch() {
    if (!query) return;

    // Start loading & reset old data
    setLoading(true);
    setError("");
    setMovies([]);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${query}&apikey=c443b2c5`
      );

      const data = await response.json();

      // Handle movie not found
      if (data.Response === "False") {
        setError(data.Error);
      }
      else {
        setMovies(data.Search);
        localStorage.setItem("movies", JSON.stringify(data.Search))
        localStorage.setItem("query", query)
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  // Effect effect to save the query 
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

  // Debouncing search feature
  useEffect(() => {
  const timer = setTimeout(() =>{
    if(query){
      handleSearch()
    }
  }, 500)
  return () => clearTimeout(timer)
  }, [query])
  
  

  return (
        <div>
        <div className="heading">
        <h1>Movie App🎬 - Made for you.</h1>
        <h3>Search your favourite movies here.</h3>

        <input type="text"
          placeholder='Search Movie...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          />

        <button onClick={handleSearch}>Search</button>
        {loading && <p>Loading...</p>}
        {error && <p style={{color: "red"}}>{error}</p>}
          </div>

        <div className="movies">
          {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie}/>
          ))}
        </div>
      </div>
  );
}

export default Home;
