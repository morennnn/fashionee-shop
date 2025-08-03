import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/reset.css';
import './styles/commons.css';
import './styles/header.css';
import './styles/footer.css';
import './styles/shop.css';
import './styles/cart.css';
import App from './App';
import { CartFavoritesProvider } from './context/CartFavoritesContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartFavoritesProvider>
      <App />
    </CartFavoritesProvider>
  </React.StrictMode>
);
