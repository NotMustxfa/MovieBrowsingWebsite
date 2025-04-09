import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails, getSimilarMovies, getMovieCredits } from '../services/api';
import { useMovieContext } from '../contexts/MovieContext';
import { useReviews } from '../contexts/ReviewsContext';
import MovieCard from '../components/MovieCard';
import ReviewForm from '../components/ReviewForm';
import '../css/MovieDetails.css';

function MovieDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [credits, setCredits] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
    const { getMovieReviews, addReview } = useReviews();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                setLoading(true);
                const [details, similar, movieCredits] = await Promise.all([
                    getMovieDetails(id),
                    getSimilarMovies(id),
                    getMovieCredits(id)
                ]);
                setMovie(details);
                setSimilarMovies(similar);
                setCredits(movieCredits);
                setReviews(getMovieReviews(id));
            } catch (err) {
                setError('Failed to load movie details');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id, getMovieReviews]);

    const handleReviewSubmit = (review) => {
        addReview(review);
        setReviews(prev => [...prev, review]);
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!movie) return <div className="not-found">Movie not found</div>;

    const favorite = isFavorite(movie.id);

    return (
        <div className="movie-details">
            <div className="movie-header">
                <button onClick={() => navigate(-1)} className="back-button">
                    ← Back
                </button>
                <div className="movie-poster">
                    <img 
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                        alt={movie.title}
                    />
                    <button
                        className={`favorite-btn ${favorite ? 'active' : ''}`}
                        onClick={() => favorite ? removeFromFavorites(movie.id) : addToFavorites(movie)}
                    >
                        {favorite ? '♥' : '♡'}
                    </button>
                </div>
                <div className="movie-info">
                    <h1>{movie.title}</h1>
                    <div className="movie-meta">
                        <span>{movie.release_date?.split('-')[0]}</span>
                        <span>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>
                        <span>{movie.vote_average?.toFixed(1)} ⭐</span>
                    </div>
                    <div className="genres">
                        {movie.genres?.map(genre => (
                            <span key={genre.id} className="genre-tag">{genre.name}</span>
                        ))}
                    </div>
                    <p className="overview">{movie.overview}</p>
                </div>
            </div>

            <div className="movie-reviews">
                <h2>Reviews</h2>
                <ReviewForm 
                    movieId={id} 
                    movieTitle={movie.title}
                    moviePoster={movie.poster_path}
                    onReviewSubmit={handleReviewSubmit} 
                />
                <div className="reviews-list">
                    {reviews.map((review, index) => (
                        <div key={index} className="review">
                            <div className="review-header">
                                <span className="review-author">{review.userName}</span>
                                <div className="review-rating">
                                    {'★'.repeat(review.rating)}
                                    {'☆'.repeat(5 - review.rating)}
                                </div>
                            </div>
                            <p className="review-comment">{review.comment}</p>
                            <span className="review-date">
                                {new Date(review.timestamp).toLocaleDateString()}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {credits && (
                <div className="cast-section">
                    <h2>Cast</h2>
                    <div className="cast-grid">
                        {credits.cast.slice(0, 6).map(actor => (
                            <div key={actor.id} className="cast-member">
                                <img 
                                    src={actor.profile_path 
                                        ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                                        : '/default-avatar.png'}
                                    alt={actor.name}
                                />
                                <span className="actor-name">{actor.name}</span>
                                <span className="character-name">{actor.character}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {similarMovies.length > 0 && (
                <div className="similar-movies">
                    <h2>Similar Movies</h2>
                    <div className="movies-grid">
                        {similarMovies.map(movie => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default MovieDetails; 