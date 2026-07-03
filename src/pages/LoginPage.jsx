import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

import Footer from "../components/Footer";

function LoginPage() {
    // Email + Password => Loggin Backend => Save JWT Token
    // useState: Save the data from email/password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

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

                    <button className="btn"type="submit">
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