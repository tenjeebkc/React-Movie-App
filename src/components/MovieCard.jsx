import { Link } from "react-router-dom";

function MovieCard ({movie}) {
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
            </div>
          </Link>

    )
}

export default MovieCard;
