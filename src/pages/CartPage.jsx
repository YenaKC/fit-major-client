import { useContext } from "react";
import api from "../services/api";

import { CartContext } from "../context/CartContext.jsx";
import Footer from "../components/Footer.jsx";

function CartPage() {
    const {
        cart,
        cartLoading,
        updateQuantity,
        removeFromCart,
    } = useContext(CartContext);

    // Total Price
    const totalPrice = cart?.items?.reduce((total, item) => {
        return total + item.product.price * item.quantity;
    }, 0) || 0;

    // Change my cart to make an order
    const checkout = () => {
        const token = localStorage.getItem("authToken");

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

    if (cartLoading) {
        return (
            <main className="page">
                <div className="container">
                    <p>Loading bag...</p>
                </div>
            </main>
        );
    }

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
                                    onClick={() => removeFromCart(item.product._id)}
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
            <Footer />
        </main>

    );
}

export default CartPage;