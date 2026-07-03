import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    // State: Menu Open/Close
    // False: Invisible menu, true: visible menu
    const [menuOpen, setMenuOpen] = useState(false);

    const navigate = useNavigate();

    // If the user has token, it regards logged-in state.
    const token = localStorage.getItem("authToken");

    const handleLogout = () => {
        // After removing the token, send to log-in page.
        localStorage.removeItem("authToken");
        setMenuOpen(false);
        navigate("/login");
    };

    const closeMenu = () => {
        setMenuOpen(false);
    }

    return (
        <>
            <nav className="navbar">
                <Link to="/" className="navbar-logo" onClick={closeMenu}>
                    {/* <img src="products/images/fit-major-logo.png" alt="FIT MAJOR LOGO" /> */}
                    FIT MAJOR
                </Link>

                <div className="navbar-links">
                    <Link to="/products">SHOP</Link>
                    <Link to="/cart">BAG</Link>
                    <Link to="/orders">ORDERS</Link>

                    {token ? (
                        <button className="navbar-button" onClick={handleLogout}>
                            LOGOUT
                        </button>
                    ) : (
                        <Link to="/login">LOGIN</Link>
                    )}
                </div>

                <button
                    type="button"
                    className="menu-btn"
                    onClick={() => setMenuOpen(!menuOpen)} // Si está cerrado el menu se abre, y si no, cierre.
                >
                    {menuOpen ? "×" : "☰"}
                </button>
            </nav>

            {/* MOBILE MENU */}
            {/* When menuOpen is TRUE, rendering mobile-menue */}
            {menuOpen && (
                <div className="mobile-menu">
                    <Link to="/products" onClick={closeMenu}>SHOP</Link>
                    <Link to="/cart" onClick={closeMenu}>BAG</Link>
                    <Link to="/orders" onClick={closeMenu}>ORDERS</Link>

                    {/* CONDITIONAL RENDERING */}
                    {/* If the use has token, TRUE, if the user is logged-out, 'token = null'(FALSE) */}
                    {token ? (
                        <button className="mobile-menu-button" onClick={handleLogout}>
                            LOGOUT
                        </button>
                    ) : (
                        <Link to="/login" onClick={closeMenu}>LOGIN</Link>
                    )}
                </div>
            )
            }
        </>
    );
}


export default Navbar;