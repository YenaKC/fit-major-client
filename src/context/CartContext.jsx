import { createContext, useEffect, useState } from "react";

import {
    getCart,
    addCartItem,
    updateCartItem,
    removeCartItem,
} from "../services/cart.service";

/* 
Create a shared context for the shopping cart.

CartContext allows different components to use the same cart state without fetching the cart separately in every component.
*/
const CartContext = createContext();

function CartProvider({ children }) {
    const [cart, setCart] = useState(null);
    const [cartLoading, setCartLoading] = useState(true);

    /* Load the logged-in user's cart from the backend. */
    const loadCart = async () => {
        const token = localStorage.getItem("authToken");

        if (!token) {
            setCart(null);
            setCartLoading(false);
            return;
        }

        try {
            const cartData = await getCart();
            setCart(cartData);
        } catch (error) {
            console.log("CART LOAD ERROR:", error);
            setCart(null);
        } finally {
            setCartLoading(false);
        }
    };

    const addToCart = async (productId, quantity = 1) => {
        await addCartItem(productId, quantity);
        await loadCart();
    };

    const updateQuantity = async (productId, quantity) => {
        if (quantity < 1) return;

        await updateCartItem(productId, quantity);
        await loadCart();
    };

    const removeFromCart = async (productId) => {
        await removeCartItem(productId);
        await loadCart();
    };

    /* Load the cart when CartProvider is mounted. */
    useEffect(() => {
        loadCart();
    }, []);

    return (
        <CartContext.Provider
            value={{
                cart,
                cartLoading,
                loadCart,
                addToCart,
                updateQuantity,
                removeFromCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export {
    CartContext,
    CartProvider,
};