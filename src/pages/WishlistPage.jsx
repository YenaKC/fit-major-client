import { useEffect, useState } from "react";
import { getWishlist, removeWishlist } from "../services/wishlist.service";

import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

function WishlistPage() {
    // State that stores wishlist products.
    const [wishlist, setWishlist] = useState([]);

    // The state to show 'Loading...' during waiting API.
    const [loading, setLoading] = useState(true);

    // handleRemoveWishlist: 
    // DELETE /users/wishlist/:productId 
    // => Delete in MongoDB
    // => Elimiete the same product from state
    // => Remove the product card without refreshing
    const handleRemoveWishlist = async (productId) => {
        try {
            await removeWishlist(productId);

            setWishlist((currentWishlist) =>
                currentWishlist.filter(
                    (product) => product._id !== productId
                )
            );
        } catch (error) {
            console.log(error);
        }
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
                    <p className="empty-text">Your wishlist is empty.</p>
                ) : (
                    <div className="product-grid">
                        {/* // wishlist.map(...): print each product */}
                        {wishlist
                            .filter((product) => product)
                            .map((product) => (
                                <div key={product._id} className="wishlist-item">
                                    <ProductCard product={product} />

                                    <button
                                        type="button"
                                        className="btn"
                                        onClick={() =>
                                            handleRemoveWishlist(product._id)
                                        }
                                    >
                                        REMOVE
                                    </button>
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