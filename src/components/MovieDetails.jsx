import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom';


function MovieDetails() {
    const { id } = useParams();  // get movie id from URL
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchMovie() {
            const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=c443b2c5`)
            const data = await response.json();
            setMovie(data);
            setLoading(false);
        }
        fetchMovie();
    }, [id])

    if (loading) return <p>Loading...</p>


    return (
        <>
            {/* If you want to button to go to the specific router
            <button onClick={() => navigate('/movies')}>Back to Movies</button> */}
            <div className='movie-details'>
            <button className='back-btn' onClick={() => navigate(-1)}>Back</button>
                <h2>{movie.Title}</h2>
                <img src={movie.Poster} alt="movie.Title" />
                <p><strong>Year: </strong>{movie.Year}</p>
                <p><strong>Genre: </strong>{movie.Genre}</p>
                <p><strong>Plot: </strong>{movie.Plot}</p>
            </div>
        </>
    )
}


export default MovieDetails
