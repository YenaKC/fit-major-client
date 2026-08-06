import { createContext, useEffect, useState } from "react";
import {
    getWishlist,
    addWishlist,
    removeWishlist
} from "../services/wishlist.service";

/* Create a shared React context for wishlist data.
Components inside the providerwill be able to access thes same wishlist state. */
const WishlistContext = createContext();

function WishlistProvider({ children }) {
    /* Store the logged-in user's wishlist in one central place instead of loading it separately inside every ProductCard. */
    const [wishlist, setWishlist] = useState([]);
    const [wishlistLoading, setWishlistLoading] = useState(true);

    const token = localStorage.getItem("authToken");

    /*
    Load the logged-in user's wishlist once and store it in the central Context state.
    */
    const loadWishlist = async () => {
        if (!token) {
            setWishlist([]);
            setWishlistLoading(false);
            return;
        }

        try {
            const data = await getWishlist();
            setWishlist(data.filter((product) => product));
        } catch (error) {
            console.log("WISHLIST CONTEXT LOAD ERROR:", error);
            setWishlist([]);
        } finally {
            setWishlistLoading(false);
        }
    };

    /* 
    Check whther a product already exists in the shared wishlist array.

    Return true when a product with the same ID is found.
    Otherwise, return false.
    */
    const isInWishlist = (productId) => {
        return wishlist.some(
            (product) =>
                product &&
                product._id === productId
        );
    };

    /*
    Send the product ID to the backend and receive the updated wishlist.

    Store the returned wishlist in Context so every subscribed component updates immediately without refreshing the page.
    */
    const addToWishlist = async (productId) => {
        const response = await addWishlist(productId);

        const updatedWishlist = response.wishlist || [];

        setWishlist(
            updatedWishlist.filter((product) => product)
        );

        return updatedWishlist;
    }; 

    /*
    Remove the product from the backend wishlist.

    Store the remaining products in Context so ProductCard, WishlistPage and other components stay synchronized.
    */
    const removeFromWishlist = async (productId) => {
        const response = await removeWishlist(productId);

        const updatedWishlist = response.wishlist || [];

        setWishlist(
            updatedWishlist.filter((product) => product)
        );

        return updatedWishlist;
    };

    useEffect(() => {
        loadWishlist();
    }, []);

    return (
        // Expose the wishlist state to all child components wrapped by WishlistProvider.
        <WishlistContext.Provider
            value={{
                wishlist,
                wishlistLoading,
                isInWishlist,
                addToWishlist,
                removeFromWishlist,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
}

export {
    WishlistContext,
    WishlistProvider,
};