import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// Run after receiving an error response from the server.
// Every API response passes through this interceptor.
// Successful responses continue normally.
// Failed responses are inspected before reaching the component.
api.interceptors.response.use(
    // If the response is successful, return it without changes.
    (response) => response,

    // Handle failed responses.
    (error) => {
        // Check whether the server rejected the request because the user is unauthorized.
        // This usually means that the JWT is missing, invalid or expired.
        if (error.response?.status ===401) {
            // Remove the expired or invalid token.
            // Remove the expired token so the Navbar no longer treats the user as logged in.
            localStorage.removeItem("authToken");

            // Save a message temporarily so the Login page can display it.
            // Store the session-expired message until the Login page reads it.
            // sessionStorage survives navigation but is cleared when the browser tab closes.
            sessionStorage.setItem(
                "authMessage",
                "Your session has expired. Please log in again."
            );

            // Redirect the user to the Login page.
            window.location.href = "/login";
        }

        // Return the error so the component's catch block can still handle it.
        return Promise.reject(error);
    }
);

export default api;