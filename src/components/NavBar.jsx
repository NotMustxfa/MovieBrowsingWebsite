import { Link } from "react-router-dom";
import "../css/Navbar.css"
import "../css/GoogleLoginButton.css"
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import GoogleLoginButton from "./GoogleLoginButton";

function NavBar() {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">Movie App</Link>
            </div>
            <div className="navbar-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/favorites" className="nav-link">Favorites</Link>
                <button className="theme-toggle" onClick={toggleTheme}>
                    {theme === 'light' ? '🌙' : '☀️'}
                </button>
                {user ? (
                    <div className="user-info">
                        <Link to="/profile" className="profile-link">
                            <img 
                                src={user.picture} 
                                alt={user.name} 
                                className="user-avatar"
                                referrerPolicy="no-referrer"
                            />
                            <div className="user-details">
                                <span className="user-name">{user.name}</span>
                                <span className="user-email">{user.email}</span>
                            </div>
                        </Link>
                        <button onClick={logout} className="logout-button">Logout</button>
                    </div>
                ) : (
                    <GoogleLoginButton />
                )}
            </div>
        </nav>
    );
}

export default NavBar;