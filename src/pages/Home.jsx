import MovieCard from "../components/MovieCard"
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies, getTrendingMovies, getUpcomingMovies } from "../services/api";
import "../css/Home.css"

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeSection, setActiveSection] = useState('trending');

    useEffect(() => {
        const loadMovies = async () => {
            try {
                setLoading(true);
                const [trending, upcoming] = await Promise.all([
                    getTrendingMovies(),
                    getUpcomingMovies()
                ]);
                setTrendingMovies(trending);
                setUpcomingMovies(upcoming);
                setMovies(trending); // Default to trending movies
            } catch (err) {
                console.error(err);
                setError("Failed to load movies...");
            } finally {
                setLoading(false);
            }
        };

        loadMovies();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!searchQuery.trim()) {
            setMovies(trendingMovies);
            setActiveSection('trending');
            return;
        }

        if (loading) return;

        setLoading(true);
        try {
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults);
            setError(null);
            setActiveSection('search');
        } catch (err) {
            console.error(err);
            setError("Failed to search movies...");
        } finally {
            setLoading(false);
        }
    };

    const handleSectionChange = (section) => {
        setActiveSection(section);
        switch (section) {
            case 'trending':
                setMovies(trendingMovies);
                break;
            case 'upcoming':
                setMovies(upcomingMovies);
                break;
            default:
                setMovies(trendingMovies);
        }
    };

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input 
                    type="text" 
                    placeholder="Search Movies..." 
                    className="search-input"
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">Search</button>
            </form>

            {error && <div className="error-message">{error}</div>}

            <div className="section-tabs">
                <button 
                    className={`tab ${activeSection === 'trending' ? 'active' : ''}`}
                    onClick={() => handleSectionChange('trending')}
                >
                    Trending Now
                </button>
                <button 
                    className={`tab ${activeSection === 'upcoming' ? 'active' : ''}`}
                    onClick={() => handleSectionChange('upcoming')}
                >
                    Coming Soon
                </button>
            </div>

            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div className="movies-grid">
                    {movies.map((movie) => (
                        <MovieCard movie={movie} key={movie.id} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;