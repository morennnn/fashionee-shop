import { useState, useEffect } from 'react';
import '../styles/cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState('');
  const [isPromoValid, setIsPromoValid] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) {
      setCartItems(JSON.parse(stored));
    }
  }, []);

  const updateCart = (newCart) => {
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('cartUpdated')); 
  };

  const decrementQuantity = (id) => {
    const newCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
    );
    updateCart(newCart);
  };

  const incrementQuantity = (id) => {
    const newCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(newCart);
  };

  const removeItem = (id) => {
    const newCart = cartItems.filter(item => item.id !== id);
    updateCart(newCart);
  };

  const orderPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryPrice = cartItems.length > 0 ? 16 : 0;
  const discount = isPromoValid ? orderPrice * 0.1 : 0;
  const totalPrice = orderPrice - discount + deliveryPrice;

  const handleApplyPromo = () => {
    if (promoCode.trim().toLowerCase() === 'ilovereact') {
      setIsPromoValid(true);
    } else {
      setIsPromoValid(false);
    }
  };

  const handleCheckout = () => {
    console.log('Checkout Order:', {
      products: cartItems,
      orderPrice: orderPrice.toFixed(2),
      discount: discount.toFixed(2),
      delivery: deliveryPrice.toFixed(2),
      total: totalPrice.toFixed(2),
      promoCode: appliedPromo
    });
    alert('Checkout data has been logged to console.');
  };

  if (cartItems.length === 0) {
    return (
      <div className="container">
        <div className="content">
          <h2>Your cart is empty</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="content">
        <div className="cart">
          <div className="order-wrapper">
            <div className="product-list">
              {cartItems.map(item => (
                <div key={item.id} className="product">
                  <div className="photo">
                    <img src={item.image} alt={item.name} style={{ maxWidth: '100px' }} />
                  </div>
                  <div className="product-info">
                    <div className="title">{item.name}</div>
                    <div className="price-wrapper">
                      <div className="price-and-quantity">
                        <div className="price">
                          {item.oldPrice && <div className="old-price">${item.oldPrice}</div>}
                          <div className="current-price">${item.price.toFixed(2)}</div>
                        </div>
                        <div className="quantity">
                          <div className="count-button" onClick={() => decrementQuantity(item.id)}>-</div>
                          <div className="count">{item.quantity}</div>
                          <div className="count-button" onClick={() => incrementQuantity(item.id)}>+</div>
                        </div>
                      </div>
                      <div className="total-price">${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                    <div className="close" onClick={() => removeItem(item.id)}>X</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="order">
              <div className="title">Your Order</div>
              <div className="order-price-wrapper">
                <div className="price-row">
                  <div className="name">Order price</div>
                  <div className="price">${orderPrice.toFixed(2)}</div>
                </div>
                <div className="price-row">
                  <div className="name">Discount for promo code</div>
                  <div className="price">-${discount.toFixed(2)}</div>
                </div>
                <div className="price-row delimiter">
                  <div className="name">
                    Delivery <span className="additional">(Aug 02 at 16:00)</span>
                  </div>
                  <div className="price">${deliveryPrice.toFixed(2)}</div>
                </div>
                <div className="price-row total">
                  <div className="name">Total</div>
                  <div className="price total">${totalPrice.toFixed(2)}</div>
                </div>
              </div>
              <div className="button-wrapper">
                <button className="button" onClick={handleCheckout}>Checkout</button>
                <div className="vertical-line"></div>
              </div>
            </div>
          </div>

          <div className="cart-wrapper">
            <div className="info">
              <div className="title">You Have A Promo Code?</div>
              <div className="description">
                To receive up-to-date promotional codes, subscribe to us on social networks.
              </div>
            </div>
            <div className="entry-field">
  <input
    type="text"
    name="entry-field"
    className="input"
    placeholder="Enter promo code"
    value={promoCode}
    onChange={(e) => setPromoCode(e.target.value)}
  />
  <div className="button-wrapper">
    <button className="button" onClick={handleApplyPromo}>
      <img src="icons/button-arrow.svg" alt="Arrow Icon" />
    </button>
    <div className="vertical-line"></div>
  </div>
            </div>

            {isPromoValid === true && (
              <div className="promo-message success">Promo applied: -10%</div>
            )}
            {isPromoValid === false && (
              <div className="promo-message error">Invalid promo code</div>
            )}

            <div className="find-us">
              <div className="find-us-text">Find us here:</div>
              <div className="find-us-links">
                <div className="find-us-link"><a href="#">FB</a></div>
                <div className="line"></div>
                <div className="find-us-link"><a href="#">TW</a></div>
                <div className="line"></div>
                <div className="find-us-link"><a href="#">INS</a></div>
                <div className="line"></div>
                <div className="find-us-link"><a href="#">PT</a></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;