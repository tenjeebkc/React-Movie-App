import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import noImage from "../assets/no-image.png"
import { Link } from 'react-router-dom';


function MovieDetails() {
    const { id } = useParams();  // get movie id from URL
    const navigate = useNavigate();

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchMovie() {
            try {
                const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=c443b2c5`)
                const data = await response.json();

                // Response and Error are API property
                if (data.Response === "False") {
                    setError(data.Error);
                } else {
                    setMovie(data);

                }
            }
            catch (err) {
                console.error(error);
                setError("Failed to load movie");
            }
            finally {
                setLoading(false);
            }
        }
        fetchMovie();
    }, [id])

    if (loading) return <p>Loading...</p>

    return (
        <>
            {/* If you want to button to go to the specific router
            <button onClick={() => navigate('/movies')}>Back to Movies</button> */}
            <div className='movie-details'>
                <Link to = "/" className='back-btn'>Back</Link>
                <h2>{movie.Title}</h2>
                <img src={movie.Poster !== "N/A" ? movie.Poster : noImage} alt={movie.Title} />
                
               <p><strong>Year: </strong>{movie.Year}</p>
                <p><strong>Genre: </strong>{movie.Genre}</p>
                <p><strong>Plot: </strong>{movie.Plot}</p>
             
            </div>
        </>
    )
}


export default MovieDetails
