import api from "./api";

// getWishlist()
// Bring the login token from localStorage using 'get'
export const getWishlist = async () => {
    const token = localStorage.getItem("authToken");

    const response = await api.get("/users/wishlist", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    // Return the server response's data.
    return response.data;
};

// addWishlist()
export const addWishlist = async (productId) => {
    const token = localStorage.getItem("authToken");

    // JavaScript Template Literal syntax: ${}
    // Axios post() order: URL -> body(data) -> config(headers).
    // We have no body data to send, so we use an empty object {}.
    const response = await api.post(
        `/users/wishlist/${productId}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};

// removeWishlist()
export const removeWishlist = async (productId) => {
    const token = localStorage.getItem("authToken");

    // Axios delete () receives the config as its second argument,
    // so a separate empty object is not necessary.
    const response = await api.delete(
        `/users/wishlist/${productId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};