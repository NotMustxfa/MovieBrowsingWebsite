import { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./AuthContext";

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({children}) => {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState(() => {
        if (!user) return [];
        // Initialize from localStorage using user's email as key
        const storedFavorites = localStorage.getItem(`favorites_${user.email}`);
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    })

    // Update favorites when user changes
    useEffect(() => {
        if (user) {
            const storedFavorites = localStorage.getItem(`favorites_${user.email}`);
            setFavorites(storedFavorites ? JSON.parse(storedFavorites) : []);
        } else {
            setFavorites([]);
        }
    }, [user]);

    // Save to localStorage whenever favorites change
    useEffect(() => {
        if (user) {
            localStorage.setItem(`favorites_${user.email}`, JSON.stringify(favorites));
        }
    }, [favorites, user]);

    const addToFavorites = (movie) => {
        if (!user) {
            alert("Please login to add favorites");
            return;
        }
        setFavorites(prev => [...prev, movie])
    }

    const removeFromFavorites = (movieId) => {
        if (!user) return;
        setFavorites(prev => prev.filter(movie => movie.id !== movieId))
    }

    const isFavorite = (movieId) => {
        if (!user) return false;
        return favorites.some(movie => movie.id === movieId)
    }

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }

    return <MovieContext.Provider value = {value}>
        {children}
    </MovieContext.Provider>
}