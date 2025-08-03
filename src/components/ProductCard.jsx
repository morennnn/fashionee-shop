import { useMemo, useCallback } from 'react';
import { useCartFavorites } from '../context/CartFavoritesContext';

const ProductCard = ({ product }) => {
  const { id, name, price, oldPrice, image, isNew, isSale } = product;

  const {
    favorites,
    cartItems,
    toggleFavorite,
    updateCartItem
  } = useCartFavorites();

  const isFavorite = useMemo(() => favorites.some(item => item.id === id), [favorites, id]);

  const cartQty = useMemo(() => {
    const item = cartItems.find(item => item.id === id);
    return item ? item.quantity : 0;
  }, [cartItems, id]);

  const handleAdd = useCallback(() => {
    updateCartItem(product, cartQty + 1);
  }, [updateCartItem, product, cartQty]);

  const handleRemove = useCallback(() => {
    updateCartItem(product, Math.max(cartQty - 1, 0));
  }, [updateCartItem, product, cartQty]);

  const handleToggleFavorite = useCallback(() => {
    toggleFavorite(product);
  }, [toggleFavorite, product]);

  return (
    <div className="product">
      <div className="photo">
        <img src={image} alt={name} />
        <div className="top-bar">
          <div className="labels">
            {isSale && <div className="label sale">SALE</div>}
            {isNew && <div className="label new">NEW</div>}
          </div>
          <div
            className="favorites"
            onClick={handleToggleFavorite}
            role="button"
            tabIndex={0}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <img
              src={isFavorite ? '/icons/heart-filled.svg' : '/icons/heart.svg'}
              alt={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
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
          <div className="current-price">${price.toFixed(2)}</div>
          {oldPrice && <div className="old-price">${oldPrice.toFixed(2)}</div>}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
