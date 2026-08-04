import { useEffect, useState } from "react";
// useParams: To bring the productID from URL
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

import Footer from "../components/Footer";
import { getWishlist, addWishlist, removeWishlist } from "../services/wishlist.service";

function ProductDetailsPage() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [isWishlisted, setIsWishlisted] = useState(false);

    const navigate = useNavigate();

    const handleWishlistToggle = async () => {
        const token = localStorage.getItem("authToken");

        if (!token) {
            navigate("/login");
            return;
        }

        try {
            if (isWishlisted) {
                await removeWishlist(product._id);
                setIsWishlisted(false);
            } else {
                await addWishlist(product._id);
                setIsWishlisted(true);
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

    useEffect(() => {
        api
            .get(`/products/${productId}`)
            .then((res) => {
                setProduct(res.data);
            })
            .catch((error) => {
                console.log("PRODUCT FETCH ERROR:", error);
            });

        const token = localStorage.getItem("authToken");

        if (!token) {
            setIsWishlisted(false);
            return
        }
    }, [productId]);

    useEffect(() => {
        const token = localStorage.getItem("authTOken");

        if (!token) {
            setIsWishlisted(false);
            return;
        }

        const checkWishlistStatus = async () => {
            try {
                const wishlistProducts = await getWishlist();

                // wishlistProducts.some(...) Find whether at least one product like current productId in the wishlist array
                const productIsSaved = wishlistProducts.some(
                    (wishlistProduct) =>
                        wishlistProduct &&
                        wishlistProduct._id === productId
                );

                setIsWishlisted(productIsSaved);
            } catch (error) {
                console.log("WISHLIST STATUS ERROR:", error);
            }
        };

        checkWishlistStatus();
    }, [productId]);

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