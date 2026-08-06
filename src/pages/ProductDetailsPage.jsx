import { useContext, useEffect, useState } from "react";
// useParams: To bring the productID from URL
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

import Footer from "../components/Footer";

// Import the shared wishlist context.
// ProductDetailsPage will use the same wishlist state
// as ProductCard, Navbar, and WishlistPage.
import { WishlistContext } from "../context/WishlistContext";

function ProductDetailsPage() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    /*
    Read the shared wishlist functions from WishlistContext.

    ProductDetailsPage no longer manages its own wishlist state or makes separate wishlist requests.
    */
    const {
        isInWishlist,
        addToWishlist,
        removeFromWishlist,
    } = useContext(WishlistContext);

    const navigate = useNavigate();

    /*
    Check whether the current product already exists inside the shared wishlist.
    */
    const isWishlisted = product
        ? isInWishlist(product._id)
        : false;


    /*
    Update the shared wishlist instead of changing a local wishlist state.
    Every subscribed component updates automatically.
    */
    const handleWishlistToggle = async () => {
        const token = localStorage.getItem("authToken");

        if (!token) {
            navigate("/login");
            return;
        }

        try {
            if (isWishlisted) {
                await removeFromWishlist(product._id);
            } else {
                await addToWishlist(product._id);
            }
        } catch (error) {
            console.log("WISHLIST TOGGLE ERROR:", error);
        }
    };

    const handleAddToCart = () => {
        const token = localStorage.getItem("authToken");

        api
            .post(
                "/cart/add",
                {
                    productId: product._id,
                    quantity: 1,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then(() => {
                navigate("/cart");
            })
            .catch(console.log);
    };

    /*
    Load only the selected product.
    Wishlist status now comes from the shared WishlistContext instead of a separate API request.
    */
    useEffect(() => {
        api
            .get(`/products/${productId}`)
            .then((res) => {
                setProduct(res.data);
            })
            .catch((error) => {
                console.log("PRODUCT FETCH ERROR:", error);
            });

    }, [productId]);

    /*
     No longer needed (Remove the old useEffect).
     WishlistContext already loads and stores the user's wishlist when the application starts.
     */

    if (!product) {
        return (
            <main className="page">
                <div className="container">
                    <p>Loading product...</p>
                </div>
            </main>
        );
    }

        return (
            <main className="page">
                <img src={product.image} alt={product.name} className="pdp-image" />

                <section className="pdp-info">
                    <p className="badge">{product.category}</p>
                    <h1>{product.name}</h1>
                    <h2>{product.price}€</h2>
                    <p>{product.description}</p>

                    <button className="btn" onClick={handleAddToCart}>ADD TO BAG</button>
                    <button
                        type="button"
                        className="btn wishlist-toggle-btn"
                        onClick={handleWishlistToggle}>
                        {isWishlisted
                            ? "♥ IN YOUR WISHLIST"
                            : "♡ ADD TO WISHLIST"}
                    </button>
                </section>

                <Footer />
            </main>
        );
    }

    export default ProductDetailsPage;