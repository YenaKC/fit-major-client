import { Link } from "react-router-dom";

function SuccessPage() {
    return (
        <main className="page">
            <div className="container auth-container">

                <h1>ORDER SUCCESS</h1>

                <p className="auth-subtitle">
                    Thank you for shopping with FIT MAJOR.
                </p>

                <Link
                    to={"/products"}
                    className="btn"
                >
                    BACK TO SHOP
                </Link>
                
            </div>
        </main>
    );
}

export default SuccessPage;