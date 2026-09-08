# FIT MAJOR

FIT MAJOR is a full-stack e-commerce platform for premium gymwear,
built as an individual MERN Stack project.

## Live Demo

[View FIT MAJOR](YOUR_VERCEL_URL)

## Tech Stack

### Frontend
- React
- Vite
- React Router
- Axios
- React Context API

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT Authentication

### Payments
- Stripe Checkout
- Stripe Webhooks

## Features

- User signup and login
- JWT authentication
- Product catalog
- Product search
- Category filters
- New arrivals and sale collections
- Product details
- Wishlist
- Shared wishlist state with React Context
- Shopping bag
- Shared cart state with React Context
- Live wishlist and bag counters
- Quantity updates and item removal
- Stripe Checkout
- Order creation
- Order history
- Responsive navigation

## Project Structure

The application is divided into two repositories:

- Frontend: React + Vite
- Backend: Express + MongoDB

## Highlights

Some parts I recommend reviewing:

### Frontend
- `src/context/WishlistContext.jsx`
- `src/context/CartContext.jsx`
- `src/pages/ProductDetailsPage.jsx`
- `src/components/Navbar.jsx`

These files show how I centralized wishlist and shopping bag state
and synchronized it across multiple components.

### Backend
- `src/routes/stripe.routes.js`

This route handles Stripe Checkout sessions, payment confirmation
through webhooks, order status updates, stock updates, and cart cleanup
after a confirmed payment.

## AI Tools

I used:
- ChatGPT
- GitHub Copilot
- Gemini

I used AI mainly for debugging, code review, comparing implementation
approaches, and clarifying concepts while building the project.

## Author

Yena Kim