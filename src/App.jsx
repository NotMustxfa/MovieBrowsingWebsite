import "./css/App.css"
import Home from "./pages/Home"
import Favorites from "./pages/Favorites";
import MovieDetails from "./pages/MovieDetails";
import UserProfile from "./pages/UserProfile";
import { Routes, Route } from "react-router-dom"
import { MovieProvider } from "./contexts/MovieContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ReviewsProvider } from "./contexts/ReviewsContext";
import { GoogleOAuthProvider } from '@react-oauth/google';
import NavBar from "./components/NavBar";

function App() {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    return (
        <ThemeProvider>
            <GoogleOAuthProvider clientId={clientId}>
                <AuthProvider>
                    <ReviewsProvider>
                        <MovieProvider>
                            <NavBar />
                            <main className="main-content">
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/favorites" element={<Favorites />} />
                                    <Route path="/movie/:id" element={<MovieDetails />} />
                                    <Route path="/profile" element={<UserProfile />} />
                                </Routes>
                            </main>
                        </MovieProvider>
                    </ReviewsProvider>
                </AuthProvider>
            </GoogleOAuthProvider>
        </ThemeProvider>
    );
}

export default App;