import { useState } from 'react'
import { Link } from 'react-router-dom';

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
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
        <div>
        <div className="heading">
        <h1>Movie App🎬 - Made for you.</h1>
        <h3>Search your favourite movies here.</h3>

        <input type="text"
          placeholder='Search Movie...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()} />

        <button onClick={handleSearch}>Search</button>
        {loading && <p>Loading...</p>}
        {error && <p style={{color: "red"}}>{error}</p>}
          </div>

        <div className="movies">
          {movies.map((movie) => (
            <Link
            to={`/movie/${movie.imdbID}`}
            key={movie.imdbID}
            style={{textDecoration:"none", color:"inherit"}}
            >
            <div className="movie-card" key={movie.imdbID}>
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : ""}
                alt={movie.Title}
                />
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
            </div>
          </Link>
          ))}
        </div>
      </div>
  );
}

export default Home;
