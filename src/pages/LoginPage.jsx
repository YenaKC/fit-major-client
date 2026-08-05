import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

import Footer from "../components/Footer";

function LoginPage() {
    // Email + Password => Loggin Backend => Save JWT Token
    // useState: Save the data from email/password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Store the authentication-related message that should be shown to the user.
    // The initial value is an empty string because there is no message by default.
    const [authMessage, setAuthMessage] = useState("");

    const navigate = useNavigate();

    // Runt once when the Login page is rendered.
    // Read the temporary authentication message from sessionStorage.
    // If a message exists: 
    // 1. Save it in React state. 
    // 2. Remove it from sessionStorage so it is displayed only once.
    useEffect(() => {
        const message = sessionStorage.getItem("authMessage");

        if (message) {
            setAuthMessage(message);
            // Remove the message after reading it so it does not appear again when the user revisits or refreshes the Login page later.
            sessionStorage.removeItem("authMessage");
        }
    }, []);

    // To not to execute refresh when the form is submitted
    const handleSubmit = (e) => {
        e.preventDefault();

        api
            .post("/auth/login", { email, password })
            .then((res) => {
                // Save authToken to localStorage
                localStorage.setItem("authToken", res.data.authToken);
                // Move to /products
                navigate("/products");
            })
            .catch(console.log);
    };

    return (
        <main className="page">
            <div className="container auth-container">
                <h1>FIT MAJOR</h1>
                <p className="auth-subtitle">LOGIN</p>

                {/* Render the message only when authMessage contains a value. */}
                {/* If authMessage is an empty string, React renders nothing. */}
                {/* If authMessage contains a message, React displays it above the login form. */}
                {authMessage && (
                    <p className="auth-message">
                        {authMessage}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    <label>Email</label>
                    <input 
                        className="input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label>Password</label>
                    <input 
                        className="input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className="btn" type="submit">
                        LOGIN
                    </button>
                </form>

                <Link to="/signup" className="auth-link">
                    Create account
                </Link>
            </div>

            <Footer />
        </main>
    );
}

export default LoginPage;