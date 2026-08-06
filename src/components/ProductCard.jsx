// useState stores whether the current product is in the wishlist.
// useEffect runs the wishlist check when the product card is rendered. 
import { useContext } from "react";
import { Link } from "react-router-dom";

import { WishlistContext } from "../context/WishlistContext";

function ProductCard({ product, onWishlistRemove }) {
    /* 
    Read the shared wishlist functions from WishlistContext.

    ProductCard does not manage its own wishlist state anymore.
    It uses the central wishlist state provided by WishlistProvider.
    */
    const {
        isInWishlist,
        addToWishlist,
        removeFromWishlist,
    } = useContext(WishlistContext);

    /*
    Check whether the current product exists in the shared wishlist.

    The result is recalculated whenever the Context wishlist changes, so the heart icon updates automatically.
    */
    const isWishlisted = isInWishlist(product._id);

    const handleWishlistToggle = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        const token = localStorage.getItem("authToken");

        if (!token) {
            return;
        }

        try {
            if (isWishlisted) {
                await removeFromWishlist(product._id);

                if (onWishlistRemove) {
                    onWishlistRemove(product._id);
                }
            } else {
                await addToWishlist(product._id);
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