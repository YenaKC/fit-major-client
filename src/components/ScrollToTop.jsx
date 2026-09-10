import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/*
ScrollToTop resets the browser scroll position whenever the router changes.

React Router updates the displayed component without reloading the entire page, so the browser may keep the previous scroll position between routes.

By watching the current pathname with useLocation(), this component scrolls the window back to the top whenever a new route is opened.
*/
function ScrollToTop() {
    // When the pathname is changed, execute use Effect.
    const { pathname } = useLocation();
    
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant",
        });
    }, [pathname]);

    return null;
}

export default ScrollToTop;