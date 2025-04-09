import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

function GoogleLoginButton() {
    const { login } = useAuth();

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (response) => {
            try {
                // Fetch user profile using the access token
                const userInfo = await axios.get(
                    'https://www.googleapis.com/oauth2/v3/userinfo',
                    { headers: { Authorization: `Bearer ${response.access_token}` } }
                );
                
                // Create a token with user info
                const token = {
                    access_token: response.access_token,
                    user: userInfo.data
                };
                
                // Store the token
                login(token);
            } catch (error) {
                console.error('Login failed:', error);
            }
        },
        onError: (error) => {
            console.error('Login failed:', error);
        }
    });

    return (
        <button 
            onClick={() => handleGoogleLogin()}
            className="google-login-button"
        >
            <img 
                src="https://www.google.com/favicon.ico" 
                alt="Google" 
                className="google-icon"
            />
            Sign in with Google
        </button>
    );
}

export default GoogleLoginButton; 