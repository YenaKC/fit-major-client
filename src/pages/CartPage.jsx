import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";


function CartPage() {
    const [cart, setCart] = useState(null);

    const token = localStorage.getItem("authToken");

    const navigate = useNavigate();

    // Get my cart from back-end server.
    const getCart = () => {
        api
            .get("/cart", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setCart(res.data);
            })
            .catch(console.log);
    };

    useEffect(() => {
        getCart();
    }, []);

    // Modificate quantity
    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) return;

        api
            .put(
                `/cart/item/${productId}`,
                { quantity },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then(() => {
                getCart();
            })
            .catch(console.log);
    };

    // Remove the product in the cart(bag)
    const deleteItem = (productId) => {
        api
            .delete(`/cart/item/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => {
                getCart();
            })
            .catch(console.log);
    };

    // Total Price
    const totalPrice = cart?.items?.reduce((total, item) => {
        return total + item.product.price * item.quantity;
    }, 0) || 0;

    // Change my cart to make an order
    const checkout = () => {
        api
            .post(
                "/stripe/create-checkout-session",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            .then((res) => {
                window.location.href = res.data.url;
            })
            .catch(console.log);
    };

    if (!cart || cart.items.length === 0) {
        return (
            <main className="page">
                <div className="container">
                    <h1>BAG</h1>
                    <p>Your bag is empty.</p>
                </div>
            </main>
        );
    }

    return (
        <main className="page">
            <div className="container">
                <h1>BAG</h1>

                <div className="cart-list">
                    {cart.items.map((item) => (
                        <div className="cart-item" key={item._id}>
                            <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="cart-image"
                            />

                            <div className="cart-info">
                                <h3>{item.product.name}</h3>
                                <p>{item.product.price}</p>

                                <div className="qty-row">
                                    <button
                                        type="button"
                                        onClick={() => updateQuantity(item.product._id, item.quantity - 1)}>
                                        -
                                    </button>

                                    <span>{item.quantity}</span>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            updateQuantity(item.product._id, item.quantity + 1)}>
                                        +
                                    </button>
                                </div>

                                <button
                                    type="button"
                                    className="remove-btn"
                                    onClick={() => deleteItem(item.product._id)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <section className="summary-card">
                    <p>Subtotal</p>
                    <h2>{totalPrice.toFixed(2)}€</h2>
                    <button
                        className="btn btn-light"
                        onClick={checkout}
                    >
                        CHECKOUT
                    </button>
                </section>

            </div>
            <FOOTER />
        </main>

    );
}

export default CartPage;