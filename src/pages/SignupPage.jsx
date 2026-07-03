import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

import Footer from "../components/Footer";

function SignupPage() {
    // Save user's data
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    // Front => Server
    const handleSubmit = (e) => {
        e.preventDefault();

        api
            .post("/auth/signup", {
                username,
                email,
                password,
            })
            // Completd signup => Move to log-in page
            .then(() => {
                navigate("/login");
            })
            .catch(console.log);
    };

    return (
        <main className="page">
            <div className="container auth-container">
                <h1>FIT MAJOR</h1>
                <p className="auth-subtitle">CREATE ACCOUNT</p>

                <form onSubmit={handleSubmit} className="auth-form">
                    <label>Username</label>
                    <input 
                        className="input"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

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
                        CREATE ACCOUNT
                    </button>
                </form>

                <Link to="/login" className="auth-link">
                    Already have an account?
                </Link>
            </div>

            <Footer />
        </main>
    );
}

export default SignupPage;