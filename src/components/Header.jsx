import '../styles/header.css';
import { useEffect, useState } from 'react';


const Header = () => {
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateFavoriteCount = () => {
      const stored = localStorage.getItem('favorites');
      const favs = stored ? JSON.parse(stored) : [];
      setFavoriteCount(favs.length);
    };

    updateFavoriteCount();
    window.addEventListener('favoritesUpdated', updateFavoriteCount);
    return () => {
      window.removeEventListener('favoritesUpdated', updateFavoriteCount);
    };
  }, []);

  useEffect(() => {
    const updateCartCount = () => {
      const stored = localStorage.getItem('cart');
      const cart = stored ? JSON.parse(stored) : [];
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalItems);
    };

    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);
    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);




  return (
    <header className="header">
      <div className="header-top">
        <div className="left-side">
          <div className="logo-container">
            <div className="burger-menu">
              <input type="checkbox" id="burger-checkbox" className="burger-checkbox" />
              <label className="burger" htmlFor="burger-checkbox"></label>
            </div>
            <div className="logo">
              <img src="/icons/logo.svg" alt="logo" />
            </div>
          </div>
          <div className="menu">
            <div className="menu-item">
              <span>Home</span>
            </div>
            <div className="menu-item">
              <span>Pages</span>
              <img src="/icons/arrow.svg" className="arrow-default" alt="" />
              <img src="/icons/arrow-pink.svg" className="arrow-hover" alt="" />
            </div>
            <div className="menu-item active">
              <span>Shop</span>
              <img src="/icons/arrow.svg" className="arrow-default" alt="" />
              <img src="/icons/arrow-pink.svg" className="arrow-hover" alt="" />
            </div>
            <div className="menu-item">
              <span>Blog</span>
            </div>
            <div className="menu-item">
              <span>Contact</span>
            </div>
          </div>
        </div>
        <div className="right-side">
          <div className="header-icon">
            <img src="/icons/search.svg" alt="search" />
          </div>
          <div className="header-icon">
            <img src="/icons/profile.svg" alt="profile" />
          </div>
          <div className="header-icon">
            <img src="/icons/heart.svg" alt="favorites" />
            <div className="counter">{favoriteCount}</div>

          </div>

          <div className="header-icon">
            <img src="/icons/cart.svg" alt="cart" />
            <div className="counter">{cartCount}</div>
          </div>
        </div>
      </div>

      <div className="header-middle">
        <div className="content-and-decoration">
          <div className="content">
            <div className="title">Shop</div>
            <div className="menu">
              <div className="menu-item">
                <span>Home</span>
              </div>
              <div className="menu-item active">
                <span>Shop</span>
              </div>
            </div>
          </div>
          <div className="container-middle-line">
            <img src="/icons/header-middle-line.svg" alt="line" className="middle-line" />
          </div>
          <div className="container-points">
            <img src="/icons/points.svg" alt="points" className="points" />
          </div>
        </div>
        <div className="photo"></div>
      </div>
    </header>
  );
};

export default Header;
