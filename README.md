# FIT MAJOR — Frontend

FIT MAJOR is a full-stack e-commerce platform for premium gymwear.

This repository contains the frontend of an individual MERN Stack project built with React and Vite.

## Live Demo

https://fit-major-client.vercel.app

## Tech Stack

- React
- Vite
- React Router
- Axios
- React Context API
- CSS
- JWT Authentication
- Stripe Checkout integration

## Main Features

- User signup and login
- Product catalog
- Product search
- Category filtering
- New Arrivals and Sale collections
- Product detail pages
- Wishlist
- Shopping bag
- Quantity updates and item removal
- Live wishlist and bag counters
- Order history
- Stripe Checkout flow
- Responsive navigation

## State Management

The application uses React Context to centralize shared state.

### WishlistContext

`src/context/WishlistContext.jsx`

Handles:

- Loading the logged-in user's wishlist
- Adding products
- Removing products
- Checking wishlist status
- Synchronizing wishlist state across ProductCard, ProductDetailsPage, WishlistPage and Navbar

### CartContext

`src/context/CartContext.jsx`

Handles:

- Loading the user's shopping bag
- Adding products
- Updating quantities
- Removing products
- Synchronizing bag data across ProductDetailsPage, CartPage and Navbar

## Files I Recommend Reviewing

### `src/context/WishlistContext.jsx`

Centralized wishlist state and synchronization between multiple components.

### `src/context/CartContext.jsx`

Centralized shopping bag state and API interaction.

### `src/pages/ProductDetailsPage.jsx`

Connects product data, wishlist actions and shopping bag actions.

### `src/components/Navbar.jsx`

Responsive navigation with authentication-aware links, search, wishlist count and bag count.

### `src/pages/ProductsPage.jsx`

Product search, category filtering and collection filtering.

## Backend

The backend is implemented separately with Node.js, Express and MongoDB.

Backend repository:

[\[BACKEND_REPOSITORY_URL\]](https://github.com/YenaKC/fit-major-server)

## Project Architecture

```text
React / Vite
     ↓
Axios API requests
     ↓
Express REST API
     ↓
MongoDB
```


Authentication is handled with JWT.

Stripe is used for the checkout flow and payment processing.

## AI Tools
AI tools were used as part of the development workflow:
- ChatGPT
- GitHub Copilot
- Gemini

I used them mainly for debugging, code review, comparing implementation approzches and clarifying technical concepts.

All implementation decisions and final code were reviewed and understood before being integrated into the project.

## Author
Yena Kim