const API_KEY = "0b44f8161e06153e392c56e8cfdb15f6";
const BASE_URL = "https://api.themoviedb.org/3"

export const getPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
};

export const searchMovies = async (query) => {
    const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    return data.results;
};

export const getMovieDetails = async (movieId) => {
    const response = await fetch(
        `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos`
    );
    const data = await response.json();
    return data;
};

export const getSimilarMovies = async (movieId) => {
    const response = await fetch(
        `${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}`
    );
    const data = await response.json();
    return data.results;
};

export const getMovieCredits = async (movieId) => {
    const response = await fetch(
        `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
    );
    const data = await response.json();
    return data;
};

export const getTrendingMovies = async () => {
    const response = await fetch(
        `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`
    );
    const data = await response.json();
    return data.results;
};

export const getUpcomingMovies = async () => {
    const response = await fetch(
        `${BASE_URL}/movie/upcoming?api_key=${API_KEY}`
    );
    const data = await response.json();
    return data.results;
};