import MovieCard from "../components/MovieCard";

function Favorites({ favorites, setFavorites }) {
  return (
    <div>
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