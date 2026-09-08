import api from "./api";

/* Get the logged-in user's cart from the backend. */
const getCart = async () => {
    const token = localStorage.getItem("authToken");

    const response = await api.get("/cart", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

/* Add one product to the cart. */
const addCartItem = async (productId, quantity = 1) => {
    const token = localStorage.getItem("authToken");

    const response = await api.post(
        "/cart/add",
        {
            productId,
            quantity,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

/* Update the quantity of one cart item. */
const updateCartItem = async (productId, quantity) => {
    const token = localStorage.getItem("authToken");

    const response = await api.put(
        `/cart/item/${productId}`,
        { quantity },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

/* Remove one product from the cart. */
const removeCartItem = async (productId) => {
    const token = localStorage.getItem("authToken");

    const response = await api.delete(
        `/cart/item/${productId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export {
    getCart,
    addCartItem,
    updateCartItem,
    removeCartItem,
};