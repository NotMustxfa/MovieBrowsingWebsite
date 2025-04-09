import { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';

const ReviewsContext = createContext();

export const useReviews = () => useContext(ReviewsContext);

export const ReviewsProvider = ({ children }) => {
    const { user } = useAuth();
    const [reviews, setReviews] = useState(() => {
        const storedReviews = localStorage.getItem('movieReviews');
        return storedReviews ? JSON.parse(storedReviews) : [];
    });

    useEffect(() => {
        localStorage.setItem('movieReviews', JSON.stringify(reviews));
    }, [reviews]);

    const addReview = (review) => {
        setReviews(prev => [...prev, review]);
    };

    const getMovieReviews = (movieId) => {
        return reviews.filter(review => review.movieId === movieId);
    };

    const getUserReview = (movieId) => {
        if (!user) return null;
        return reviews.find(review => review.movieId === movieId && review.userId === user.email);
    };

    const value = {
        reviews,
        addReview,
        getMovieReviews,
        getUserReview
    };

    return (
        <ReviewsContext.Provider value={value}>
            {children}
        </ReviewsContext.Provider>
    );
}; 