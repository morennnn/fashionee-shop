import { useState, useEffect } from 'react';
import '../styles/shop.css';

const ProductCard = ({ product }) => {
  const {
    name,
    price,
    oldPrice,
    image,
    isNew,
    isSale,
  } = product;

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('favorites')) || [];
    const exists = stored.find(item => item.id === product.id);
    setIsFavorite(!!exists);
  }, [product.id]);

  const handleAddToCart = () => {
    const stored = localStorage.getItem('cart');
    const cart = stored ? JSON.parse(stored) : [];

    const existing = cart.find(item => item.id === product.id);

    let updatedCart;

    if (existing) {
      updatedCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const toggleFavorite = () => {
    const stored = localStorage.getItem('favorites');
    const current = stored ? JSON.parse(stored) : [];

    let updated;

    if (current.find(p => p.id === product.id)) {
      updated = current.filter(p => p.id !== product.id);
      setIsFavorite(false);
    } else {
      updated = [...current, product];
      setIsFavorite(true);
    }

    localStorage.setItem('favorites', JSON.stringify(updated));
    window.dispatchEvent(new Event('favoritesUpdated'));
  };

  return (
    <div className="product">
      <div className="photo">
        <img src={image} alt={name} />
        <div className="top-bar">
          <div className="labels">
            {isSale && <div className="label sale">SALE</div>}
            {isNew && <div className="label new">NEW</div>}
          </div>
          <div className="favorites" onClick={toggleFavorite}>
            <img
              src={isFavorite ? '/icons/heart-filled.svg' : '/icons/heart.svg'}
              alt="heart icon"
            />
          </div>
        </div>
        <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
      </div>
      <div className="info">
        <div className="name">{name.split('#')[0].trim()}</div>
        <div className="price">
          <div className="current-price">${price}</div>
          {oldPrice && <div className="old-price">${oldPrice}</div>}{/*сделать для мобилки*/}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
