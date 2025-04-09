import "../css/Favorites.css"
import { useMovieContext } from "../contexts/MovieContext"
import MovieCard from "../components/MovieCard"


function Favorites() {

    const {favorites} = useMovieContext();

    if (favorites){
        return ( 
            <div className="favorites">
                <h2>My Favorites</h2>
                <div className="movies-grid">
                    {favorites.map((movie) => (
                        <MovieCard movie={movie} key={movie.id}/>
                    ))}
                </div>
            </div>
        );
    }

    return <div className="favorites-empty">
        <h2>No Favorites Yet</h2>
        <p>Add some movies to your favorites by clicking on the "Add to Favorites" button.</p>
    </div>
}

export default Favorites;