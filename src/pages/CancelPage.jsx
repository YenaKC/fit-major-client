import { Link } from "react-router-dom";

function CancelPage() {
    return (
        <main className="page">
            <div className="container auth-container">
                <h1>PAYMENT CANCELLED</h1>
                <p className="auth-subtitle">
                    Your order was canceled.
                </p>

                <Link
                    to="/cart"
                    className="btn"
                >
                    RETURN TO BAG
                </Link>
            </div>
        </main>
    );
}

export default CancelPage;