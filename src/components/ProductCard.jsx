import { useState, useEffect } from 'react';
import '../styles/shop.css';

const ProductCard = ({ product }) => {
  const {
    id,
    name,
    price,
    oldPrice,
    image,
    isNew,
    isSale,
  } = product;

  const [isFavorite, setIsFavorite] = useState(false);
  const [cartQty, setCartQty] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    const exists = stored ? JSON.parse(stored).find(item => item.id === id) : null;
    setIsFavorite(!!exists);

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const found = cart.find(item => item.id === id);
    setCartQty(found ? found.quantity : 0);
  }, [id]);

  const toggleFavorite = () => {
    const stored = localStorage.getItem('favorites');
    const current = stored ? JSON.parse(stored) : [];

    let updated;

    if (current.find(p => p.id === id)) {
      updated = current.filter(p => p.id !== id);
      setIsFavorite(false);
    } else {
      updated = [...current, product];
      setIsFavorite(true);
    }

    localStorage.setItem('favorites', JSON.stringify(updated));
    window.dispatchEvent(new Event('favoritesUpdated'));
  };

  const updateCart = (qty) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const index = cart.findIndex(item => item.id === id);

    if (qty === 0) {
      cart = cart.filter(item => item.id !== id);
    } else if (index >= 0) {
      cart[index].quantity = qty;
    } else {
      cart.push({ ...product, quantity: qty });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    setCartQty(qty);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleAdd = () => updateCart(cartQty + 1);
  const handleRemove = () => updateCart(Math.max(cartQty - 1, 0));

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

        {cartQty === 0 ? (
          <button className="add-to-cart" onClick={handleAdd}>Add to Cart</button>
        ) : (
          <div className="counter-controls">
            <button className="decrement" onClick={handleRemove}>−</button>
            <span className="quantity">{cartQty}</span>
            <button className="increment" onClick={handleAdd}>+</button>
          </div>
        )}
      </div>

      <div className="info">
        <div className="name">{name.split('#')[0].trim()}</div>
        <div className="price">
          <div className="current-price">${price}</div>
          {oldPrice && <div className="old-price">${oldPrice}</div>}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
