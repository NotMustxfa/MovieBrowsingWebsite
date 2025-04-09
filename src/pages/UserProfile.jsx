import { useAuth } from "../contexts/AuthContext";
import { useMovieContext } from "../contexts/MovieContext";
import { useReviews } from "../contexts/ReviewsContext";
import "../css/UserProfile.css";
import MovieCard from "../components/MovieCard";

function UserProfile() {
    const { user } = useAuth();
    const { favorites } = useMovieContext();
    const { reviews } = useReviews();

    if (!user) {
        return <div className="profile-error">Please log in to view your profile</div>;
    }

    const userReviews = reviews.filter(review => review.userId === user.email);
    const totalRatings = userReviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = userReviews.length > 0 ? (totalRatings / userReviews.length).toFixed(1) : 0;

    return (
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-avatar">
                    <img src={user.picture} alt={user.name} referrerPolicy="no-referrer" />
                </div>
                <div className="profile-info">
                    <h1>{user.name}</h1>
                    <p className="profile-email">{user.email}</p>
                    <div className="profile-stats">
                        <div className="stat">
                            <span className="stat-value">{favorites.length}</span>
                            <span className="stat-label">Favorites</span>
                        </div>
                        <div className="stat">
                            <span className="stat-value">{userReviews.length}</span>
                            <span className="stat-label">Reviews</span>
                        </div>
                        <div className="stat">
                            <span className="stat-value">{averageRating}</span>
                            <span className="stat-label">Avg Rating</span>
                        </div>
                        <div className="stat">
                            <span className="stat-value">{new Date(user.createdAt).toLocaleDateString()}</span>
                            <span className="stat-label">Member Since</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="profile-sections">
                <div className="profile-section">
                    <h2>Favorite Movies</h2>
                    {favorites.length > 0 ? (
                        <div className="movies-grid">
                            {favorites.map(movie => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </div>
                    ) : (
                        <div className="empty-message">No favorite movies yet</div>
                    )}
                </div>
                <div className="profile-section">
                    <h2>My Reviews</h2>
                    {userReviews.length > 0 ? (
                        <div className="reviews-list">
                            {userReviews.map(review => (
                                <div key={review.id} className="review-card">
                                    <div className="review-movie">
                                        <img 
                                            src={`https://image.tmdb.org/t/p/w200${review.moviePoster}`} 
                                            alt={review.movieTitle}
                                            className="review-poster"
                                        />
                                        <div className="review-movie-info">
                                            <h3>{review.movieTitle}</h3>
                                            <div className="review-rating">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <span key={i} className={i < review.rating ? "filled" : ""}>
                                                        {i < review.rating ? "★" : "☆"}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="review-content">
                                        <p className="review-comment">{review.comment}</p>
                                        <div className="review-footer">
                                            <span className="review-date">
                                                Reviewed on {new Date(review.timestamp).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="empty-message">No reviews yet</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserProfile; 