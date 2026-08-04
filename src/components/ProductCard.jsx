// useState stores whether the current product is in the wishlist.
// useEffect runs the wishlist check when the product card is rendered. 
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    getWishlist,
    addWishlist,
    removeWishlist,
} from "../services/wishlist.service";

function ProductCard({ product }) {
    // isWishlisted stores the wishlist status of the current product.
    // false: The product is not saved in the wishlist.
    // true: The product is already saved in the wishlist.
    const [isWishlisted, setIsWishlisted] = useState(false);

    // This effect checks the wishlist status when the ProductCard is rendered or when the product ID changes.
    useEffect(() => {
        const token = localStorage.getItem("authToken");

        // Get the authentication token from localStorage.
        // The wishlist belongs to the currently logged-in user.
        if (!token) {
            setIsWishlisted(false);
            return;
        }

        const checkWishlistStatus = async () => {
            try {
                // Call the wishlist service and retrieve the logged-in user's saved products.
                const wishlistProducts = await getWishlist();

                // Use Array.some() to check whether at least one wishlist product has the same ID as the current ProductCard product.
                // some() returns true when it finds a matching product. Otherwise, it returns false.
                const productIsSaved = wishlistProducts.some(
                    (wishlistProduct) =>
                        wishlistProduct &&
                        // Make sure the wishlist product exists before reading its _id property. This prevents an error if the array contains a null value.
                        // Compare the ID of each wishlist product with the ID of the current product.
                        wishlistProduct._id === product._id
                );

                // Save the result in React state.
                // The state will later decide whether the card shows an empty heart or a filled heart.
                setIsWishlisted(productIsSaved);
            } catch (error) {
                console.log("PRODUCT CARD WISHLIST ERROR:", error);
            }
        };

        checkWishlistStatus();
        // Run this effect again only when the current product ID changes.
    }, [product._id]);

    const handleWishlistToggle = async (event) => {
        // Prevent the Link component from navigating
        // to the Product Details page when clicking
        // the wishlist button.
        event.preventDefault();
        event.stopPropagation();

        const token = localStorage.getItem("authToken");

        // Do not allow wishlist actions when the user is not logged in.
        if (!token) {
            return;
        }

        try {
            // If the product is already saved, remove it from the wishlist.
            if (isWishlisted) {
                await removeWishlist(product._id);
                // Update the React state immediately without refreshing the page.
                setIsWishlisted(false);
            } else {
                // Save the product to the wishlist and immediately update the UI.
                await addWishlist(product._id);
                setIsWishlisted(true);
            }
        } catch (error) {
            console.log(
                "PRODUCT CARD WISHLIST TOGGLE ERROR:",
                error
            );
        }
    };

    return (

        <Link to={`/products/${product._id}`} className="product-card card">

            <div className="product-image-wrapper">
                <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                />

                <button
                    type="button"
                    className={
                        isWishlisted
                            ? "wishlist-icon active"
                            : "wishlist-icon"
                    }
                    onClick={handleWishlistToggle}
                    aria-label={
                        isWishlisted
                            ? `Remove ${product.name} from wishlist`
                            : `Add ${product.name} to wishlist`
                    }
                >
                    {isWishlisted ? "♥" : "♡"}
                </button>
            </div>

            <h3>{product.name}</h3>
            <p>{product.price} €</p>
        </Link>
    );
}

export default ProductCard;