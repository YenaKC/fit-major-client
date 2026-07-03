import { useEffect, useState } from "react";
// useParams: To bring the productID from URL
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

import Footer from "../components/Footer";

function ProductDetailsPage() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    const navigate = useNavigate();

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
            .get(`/products/${productId}`) // Bring one product from the back-end server
            .then((res) => {
                setProduct(res.data); //Save at the state
            })
            .catch(console.log);
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
            </section>

            <Footer />
        </main>
    );
}

export default ProductDetailsPage;