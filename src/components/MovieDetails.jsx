import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

function MovieDetails() {
    const { id } = useParams();  // get movie id from URL
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchMovie() {
            const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=c443b2c5`)
            const data = await response.json();
            setMovie(data);
            setLoading(false);
        }
        fetchMovie();
    }, [id])

    if(loading) return <p>Loading...</p>

    
    return (
        <div className="detail">

        <div className='movie-details'>
            <h2>{movie.Title}</h2>
            <img src={movie.Poster} alt="movie.Title" />
            <p><strong>Year: </strong>{movie.Year}</p>
            <p><strong>Genre: </strong>{movie.Genre}</p>
            <p><strong>Plot: </strong>{movie.Plot}</p>
        </div>
        </div>
    )
}


export default MovieDetails
