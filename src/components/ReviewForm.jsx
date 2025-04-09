import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../css/ReviewForm.css';

function ReviewForm({ movieId, movieTitle, moviePoster, onReviewSubmit }) {
    const { user } = useAuth();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [hover, setHover] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!user) {
            alert('Please login to submit a review');
            return;
        }
        if (rating === 0) {
            alert('Please select a rating');
            return;
        }
        onReviewSubmit({
            id: `${movieId}-${user.email}-${Date.now()}`,
            movieId,
            movieTitle,
            moviePoster,
            userId: user.email,
            userName: user.name,
            rating,
            comment,
            timestamp: new Date().toISOString()
        });
        setRating(0);
        setComment('');
    };

    if (!user) {
        return (
            <div className="review-form">
                <p>Please login to submit a review</p>
            </div>
        );
    }

    return (
        <form className="review-form" onSubmit={handleSubmit}>
            <h3>Write a Review</h3>
            <div className="rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        className={`star ${star <= (hover || rating) ? 'active' : ''}`}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                    >
                        ★
                    </button>
                ))}
            </div>
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your review here..."
                rows="4"
            />
            <button type="submit" disabled={!rating}>
                Submit Review
            </button>
        </form>
    );
}

export default ReviewForm; 