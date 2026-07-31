import { useEffect, useState } from "react";
import { getWishlist } from "../services/wishlist.service";

import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

function WishlistPage() {
    // State that stores wishlist products.
    const [wishlist, setWishlist] = useState([]);

    // The state to show 'Loading...' during waiting API.
    const [loading, setLoading] = useState(true);

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
                    <p className="empty-text">Your wishlist is empty.</p>
                ) : (
                    <div className="product-grid">
                        {/* // wishlist.map(...): print each product */}
                        {wishlist
                            .filter((product) => product)
                            .map((product) => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                />
                            ))}
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}

export default WishlistPage;