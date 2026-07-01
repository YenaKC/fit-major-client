import { Link } from "react-router-dom";

function Navbar() {
    return (
        <header className="navbar">
            <Link to="/" className="navbar-logo">
                FIT MAJOR
            </Link>

            <nav className="navbar-links">
                <Link to="/products">SHOP</Link>
                <Link to="/cart">BAG</Link>
                <Link to="/orders">ORDERS</Link>
                <Link to="/login">LOGIN</Link>
            </nav>
        </header>
    );
}

export default Navbar;