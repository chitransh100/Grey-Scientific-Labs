// src/components/Cart.jsx
import { useContext, useState } from 'react';
import { CartContext } from "../context/CardContext";
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const [showPopup, setShowPopup] = useState(false);

  const handleCheckout = () => {
    if (cart.length === 0) return;

    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      clearCart();
    }, 4000);
  };

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  ).toFixed(2);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p className="empty">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-card" key={item.id}>
                <img src={item.image} alt={item.title} />
                <div className="cart-info">
                  <h4>{item.title}</h4>
                  <p>${item.price}</p>
                  <div className="qty-control">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Total: ${total}</h3>
            <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
          </div>
        </>
      )}

      {showPopup && (
        <div className="popup">
          Order placed successfully!
        </div>
      )}
    </div>
  );
};

export default Cart;
