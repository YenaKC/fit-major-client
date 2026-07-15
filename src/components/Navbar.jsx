import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    // State: Menu Open/Close
    // False: Invisible menu, true: visible menu
    // Supplements/Clothing Dropdown
    const [menuOpen, setMenuOpen] = useState(false);
    // State: Dropdown
    // Save each state of opened menu
    const [supplementsOpen, setSupplementsOpen] = useState(false);
    const [clothingOpen, setClothingOpen] = useState(false);
    const [search, setSearch] = useState("");

    const navigate = useNavigate();

    // If the user has token, it regards logged-in state.
    const token = localStorage.getItem("authToken");

    const closeAllMenus = () => {
        setMenuOpen(false);
        setSupplementsOpen(false);
        setClothingOpen(false);
    };

    const handleLogout = () => {
        // After removing the token, send to log-in page.
        localStorage.removeItem("authToken");
        closeAllMenus();
        navigate("/login");
    };

    const handleSearch = (event) => {
        event.preventDefault();

        const trimmedSearch = search.trim();

        // trim(): eliminate space front and backsite between letters.
        // trimmedSearch: Search keyworkd after eliminating space
        if (!trimmedSearch) {
            navigate("/products");
            closeAllMenus();
            return;
        }
    
        // encodeURICompoenent(): Inside URL, change the letter to safe form from that has something dangerous and special meaning.
        // %, &, /, ? help not to destroy URL structure
        // %20: space
        navigate(
            `/products?search=${encodeURIComponent(trimmedSearch)}`
        );

        setSearch("");
        closeAllMenus();
    };

    // When Supplements opened, close Clothing. 
    // Not opened both menu in the same time.
    const toggleSupplements = () => {
        setSupplementsOpen((currentValue) => !currentValue);
        setClothingOpen(false);
    };

    const toggleClothing = () => {
        setClothingOpen((currentValue) => !currentValue);
        setSupplementsOpen(false);
    };

    return (
        <header className="site-header">
            <nav className="navbar">
                {/* BRAND */}
                <Link
                    to="/"
                    className="navbar-logo"
                    onClick={closeAllMenus}
                >
                    FIT MAJOR
                </Link>

                {/* DESKTOP MAIN MENU */}
                <div className="navbar-main-menu">
                    <div className="nav-dropdown">
                        <button
                            type="button"
                            className="nav-dropdown-trigger"
                            onClick={toggleSupplements}
                            aria-expanded={supplementsOpen}
                        >
                            SUPPLEMENTS
                            <span className="dropdown-arrow">
                                {supplementsOpen ? "▲" : "▼"}
                            </span>
                        </button>

                        {supplementsOpen && (
                            <div className="nav-dropdown-menu">
                                <Link
                                    to="/products?category=Protein"
                                    onClick={closeAllMenus}
                                >
                                    Protein
                                </Link>

                                <Link
                                    to="/products?category=Creatine"
                                    onClick={closeAllMenus}
                                >
                                    Creatine
                                </Link>

                                <Link
                                    to="/products?category=Vitamins"
                                    onClick={closeAllMenus}
                                >
                                    Vitamins
                                </Link>

                                <Link
                                    to="/products?category=Pre%20Workout"
                                    onClick={closeAllMenus}
                                >
                                    Pre Workout
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* aria-expanded={clothingOpen}: information of accesibility */}
                    <div className="nav-dropdown">
                        <button
                            type="button"
                            className="nav-dropdown-trigger"
                            onClick={toggleClothing}
                            aria-expanded={clothingOpen}
                        >
                            CLOTHING
                            <span className="dropdown-arrow">
                                {clothingOpen ? "▲" : "▼"}
                            </span>
                        </button>
                        {clothingOpen && (
                            <div className="nav-dropdown-menu clothing-dropdown">
                                <div className="dropdown-column">
                                    <p className="dropdown-title">MEN</p>

                                    <Link
                                        to="/products?category=Oversized%20T-Shirt"
                                        onClick={closeAllMenus}
                                    >
                                        Shirts
                                    </Link>

                                    <Link
                                        to="/products?category=Shorts"
                                        onClick={closeAllMenus}
                                    >
                                        Shorts
                                    </Link>

                                    <Link
                                        to="/products?category=Hoodie"
                                        onClick={closeAllMenus}
                                    >
                                        Hoodies
                                    </Link>
                                </div>

                                <div className="dropdown-column">
                                    <p className="dropdown-title">WOMEN</p>

                                    <Link
                                        to="/products?category=Compression%20Shirt"
                                        onClick={closeAllMenus}
                                    >
                                        Tops
                                    </Link>

                                    <Link
                                        to="/products?category=Leggings"
                                        onClick={closeAllMenus}
                                    >
                                        Leggings
                                    </Link>

                                    <Link
                                        to="/products?category=Sports%20Bra"
                                        onClick={closeAllMenus}
                                    >
                                        Sports Bras
                                    </Link>
                                </div>

                                <div className="dropdown-column">
                                    <p className="dropdown-title">
                                        MORE
                                    </p>

                                    <Link
                                        to="/products?category=Accessories"
                                        onClick={closeAllMenus}
                                    >
                                        Accessories
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    <Link
                        to="/products?collection=new"
                        onClick={closeAllMenus}
                    >
                        NEW
                    </Link>

                    <Link
                        to="/products?collection=sale"
                        className="nav-sale-link"
                        onClick={closeAllMenus}
                    >
                        SALE
                    </Link>
                </div>

                {/* DESKTOP SEARCH */}
                <form
                    className="navbar-search"
                    onSubmit={handleSearch}
                >
                    <input
                        type="search"
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                        placeholder="Search products..."
                        aria-label="Search products"
                    />

                    <button
                        type="submit"
                        aria-label="Submit product search"
                    >
                        SEARCH
                    </button>
                </form>

                {/* DESKTOP ACTIONS */}
                <div className="navbar-actions">
                    <Link to="/orders">ORDERS</Link>

                    <Link to="/cart">BAG</Link>

                    {token ? (
                        <button
                            type="button"
                            className="navbar-button"
                            onClick={handleLogout}
                        >
                            LOGOUT
                        </button>
                    ) : (
                        <Link to="/login">ACCOUNT</Link>
                    )}
                </div>

                {/* MOBILE BUTTON */}
                {/* setMenuOpen: functional state update.. currentValue: false -> !false -> true, currentValue is true: true-> !true -> false */}
                <button
                    type="button"
                    className="menu-btn"
                    onClick={() =>
                        setMenuOpen((currentValue) => !currentValue)
                    }
                    aria-label={
                        menuOpen
                            ? "Close navigation menu"
                            : "Open navigation menu"
                    }
                    aria-expanded={menuOpen}
                >
                    {menuOpen ? "×" : "☰"}
                </button>
            </nav>

            {/* MOBILE MENU */}
            {menuOpen && (
                <div className="mobile-menu">
                    <form
                        className="mobile-search"
                        onSubmit={handleSearch}
                    >
                        <input
                            type="search"
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                            placeholder="Search products..."
                            aria-label="Search products"
                        />

                        <button type="submit">
                            SEARCH
                        </button>
                    </form>

                    <div className="mobile-menu-group">
                        <button
                            type="button"
                            className="mobile-dropdown-trigger"
                            onClick={toggleSupplements}
                        >
                            <span>SUPPLEMENTS</span>
                            <span>
                                {supplementsOpen ? "-" : "+"}
                            </span>
                        </button>

                        {supplementsOpen && (
                            <div className="mobile-submenu">
                                <Link
                                    to="/products?category=Protein"
                                    onClick={closeAllMenus}
                                >
                                    Protein
                                </Link>

                                <Link
                                    to="/products?category=Creatine"
                                    onClick={closeAllMenus}
                                >
                                    Creatine
                                </Link>

                                <Link
                                    to="/products?category=Vitamins"
                                    onClick={closeAllMenus}
                                >
                                    Vitamins
                                </Link>

                                <Link
                                    to="/products?category=Pre%20Workout"
                                    onClick={closeAllMenus}
                                >
                                    Pre Workout
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className="mobile-menu-group">
                        <button
                            type="button"
                            className="mobile-dropdown-trigger"
                            onClick={toggleClothing}
                        >
                            <span>CLOTHING</span>
                            {/* clothingOpen = "?" : "+" is ternary operator. If Clothing menu is opened -> -, if it's closed -> + */}
                            <span>
                                {clothingOpen ? "-" : "+"}
                            </span>
                        </button>

                        {clothingOpen && (
                            <div className="mobile-submenu">
                                <p className="mobile-submenu-title">
                                    MEN
                                </p>

                                <Link
                                    to="/products?category=Oversized%20T-Shirt"
                                    onClick={closeAllMenus}
                                >
                                    Shirts
                                </Link>

                                <Link
                                    to="/products?category=Shorts"
                                    onClick={closeAllMenus}
                                >
                                    Shorts
                                </Link>

                                <Link
                                    to="/products?category=Hoodie"
                                    onClick={closeAllMenus}
                                >
                                    Hoodies
                                </Link>

                                <p className="mobile-submenu-title">
                                    WOMEN
                                </p>

                                <Link
                                    to="/products?category=Compression%20Shirt"
                                    onClick={closeAllMenus}
                                >
                                    TOPS
                                </Link>

                                <Link
                                    to="/products?category=Leggings"
                                    onClick={closeAllMenus}
                                >
                                    Leggings
                                </Link>

                                <Link
                                    to="/products?category=Sports%20Bra"
                                    onClick={closeAllMenus}
                                >
                                    Sports Bras
                                </Link>

                                <p className="mobile-submenu-title">
                                    MORE
                                </p>

                                <Link
                                    to="/products?category=Accessories"
                                    onClick={closeAllMenus}
                                >
                                    Accessories
                                </Link>
                            </div>
                        )}
                    </div>

                    <Link
                        to="/products?collection=new"
                        onClick={closeAllMenus}
                    >
                        NEW
                    </Link>

                    <Link
                        to="/products?collection=sale"
                        className="mobile-sale-link"
                        onClick={closeAllMenus}
                    >
                        SALE
                    </Link>

                    <Link to="/products" onClick={closeAllMenus}>
                        SHOP ALL
                    </Link>

                    <Link to="/orders" onClick={closeAllMenus}>
                        ORDERS
                    </Link>

                    <Link to="/cart" onClick={closeAllMenus}>
                        BAG
                    </Link>

                    {token ? (
                        <button
                            type="button"
                            className="mobile-menu-button"
                            onClick={handleLogout}
                        >
                            LOGOUT
                        </button>
                    ) : (
                        <Link to="/login" onClick={closeAllMenus}>
                            ACCOUNT
                        </Link>
                    )}
                </div>
            )}
        </header>
    );
}

export default Navbar;