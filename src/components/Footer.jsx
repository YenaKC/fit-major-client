import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-inner">

                <div className="footer-brand">
                    <h2>FIT MAJOR</h2>
                    <p>
                        Premium gymwear designed for modern athletes.
                    </p>
                </div>

                <div className="footer-links">

                    <div>
                        <h4>SHOP</h4>
                        <Link to="/products">Products</Link>
                        <Link to="/cart">Cart</Link>
                    </div>

                    <div>
                        <h4>COMPANY</h4>
                        <Link to="/">Home</Link>
                        <Link to="/products">Shop</Link>
                    </div>

                    <div>
                        <h4>FOLLOW</h4>
                        <Link to="#">Instagram</Link>
                        <Link to="#">TikTok</Link>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© 2026 FIT MAJOR</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;