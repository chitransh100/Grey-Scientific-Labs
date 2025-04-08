// src/components/FloatingCart.jsx
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CardContext';
import { useEffect, useState } from 'react';
import './FloatingCart.css';

const FloatingCart = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Re-check on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const hideRoutes = ['/login', '/signup', '/cart'];
  if (hideRoutes.includes(location.pathname) || !isMobile) return null;

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="floating-cart" onClick={() => navigate('/cart')}>
      🛒
      {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
    </div>
  );
};

export default FloatingCart;
