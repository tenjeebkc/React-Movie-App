import MovieCard from "../components/MovieCard";
import { Link } from "react-router-dom";

function Favorites({ favorites, setFavorites }) {
  return (
    <div className="favorite-page">
 <Link to = "/" className='back-btn'>Back</Link>
      <h1>⭐ Favorite Movies</h1>
      {favorites.length === 0 && <p>No favorites yet</p>}

      <div className="movies">
        {favorites.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;