import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getWishlist } from "../services/wishlist.service";

import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

function WishlistPage() {
    // State that stores wishlist products.
    const [wishlist, setWishlist] = useState([]);

    // The state to show 'Loading...' during waiting API.
    const [loading, setLoading] = useState(true);

    const [removingProductId, setRemovingProductId] = useState(null);

    const handleRemoveFromPage = (productId) => {
        setRemovingProductId(productId);

        setTimeout(() => {
            setWishlist((currentWishlist) =>
                currentWishlist.filter(
                    (product) => product._id !== productId
                )
            );

            setRemovingProductId(null);
        }, 300);
    };

    // Excuted once when the page opens for the first time.
    useEffect(() => {
        loadWishlist();
    }, []);

    const loadWishlist = async () => {
        try {
            // Calling wishlist.service.js
            const data = await getWishlist();

            // Save the array of wishlist to the state.
            setWishlist(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <main className="page">
            <div className="container">
                <h1>My Wishlist</h1>
                <p className="auth-subtitle">YOUR SAVED PRODUCTS</p>

                {wishlist.length === 0 ? (
                    <section className="wishlist-empty">
                        <div className="wishlist-empty-icon" aria-hidden="true">
                            ♡
                        </div>

                        <h2>Your wishlist is empty.</h2>

                        <p>Save your favorite products and find them here anytime.</p>

                        {/* The Link component sends the user back to the product catalog without reloading the entire application. */}
                        <Link to="/products" className="btn wishlist-empty-btn">
                            SHOP NOW
                        </Link>
                    </section>
                ) : (
                    <div className="product-grid">
                        {/* // wishlist.map(...): print each product */}
                        {wishlist
                            .filter((product) => product)
                            .map((product) => (
                                <div key={product._id} className={
                                    removingProductId === product._id
                                        ? "wishlist-item removing"
                                        : "wishlist-item"
                                }
                                >
                                    <ProductCard
                                        product={product}
                                        onWishlistRemove={handleRemoveFromPage}
                                    />
                                </div>
                            ))}
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}

export default WishlistPage;