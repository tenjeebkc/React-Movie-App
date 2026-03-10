import { Link } from "react-router-dom";

function MovieCard ({ movie, favorites, setFavorites }) {

  const isFavorite = favorites.some(
    fav => fav.imdbID === movie.imdbID
  )

  function toogleFavorite(e){
    e.preventDefault()   // prevent link navigation

    if(isFavorite){
      setFavorites(
        favorites.filter(fav => fav.imdbID !== movie.imdbID)
      )
    } else {
      setFavorites([...favorites, movie])
    }

  }

    return (
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

              <button onClick={toogleFavorite}>
            {isFavorite ? "❤️ Remove" : "🤍 Favorite"}
              </button>
            </div>
          </Link>

    )
}

export default MovieCard;
