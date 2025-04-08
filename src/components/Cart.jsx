import { useContext, useState } from "react";
import { CartContext } from "../context/CardContext";
import "./Cart.css";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cart.length === 0) return;

    setLoading(true); // Show loading
    setTimeout(() => {
      setLoading(false); // Stop loading
      setShowPopup(true); // Show success
      clearCart(); // Clear cart
      setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3s
    }, 2000); // Simulate loading delay
  };

  const total = cart
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <div className="empty-cart-message">
          <h3>Your cart is feeling lonely 🛒</h3>
          <p>
            Looks like you haven't added anything yet. <br />
            Start exploring and grab some great deals!
          </p>
          <button className="checkout-btn" onClick={() => navigate("/")}>
            Browse Products
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-card" key={item.id}>
                <img src={item.image} alt={item.title} />
                <div className="cart-info">
                  <div className="cart-details">
                    <h4>{item.title}</h4>
                    <p>${item.price}</p>
                  </div>

                  <div className="cart-actions">
                    <div className="qty-control">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Total: ${total}</h3>
            <button className="checkout-btn" onClick={handleCheckout} disabled={loading}>
              {loading ? "Processing..." : "Checkout"}
            </button>
          </div>
        </>
      )}

      {showPopup && <div className="popup">Order placed successfully!</div>}
    </div>
  );
};

export default Cart;
