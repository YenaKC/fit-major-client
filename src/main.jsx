import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop.jsx'

import './index.css'
import App from './App.jsx'

import { WishlistProvider } from './context/WishlistContext.jsx'
import { CartProvider } from './context/CartContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      {/* WishlistProvider wraps the entire React application. Every component inside App can now access the same wishlist state without passing props through multiple components */}
      <WishlistProvider>
        {/* CartProvider makes the shared cart state available to every component inside the application. */}
        <CartProvider>
          <App />
        </CartProvider>
      </WishlistProvider>
    </BrowserRouter>
  </StrictMode>,
)