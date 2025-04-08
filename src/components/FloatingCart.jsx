import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CardContext';
import { ShoppingCart } from 'lucide-react'; // if you're using lucide-react or switch to emoji/icon
import './FloatingCart.css'; // we'll write this next

const FloatingCart = () => {
  const { cart } = useCart();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show on login/signup/cart pages
  const hideOnRoutes = ['/login', '/signup', '/cart'];
  if (hideOnRoutes.includes(location.pathname)) return null;

  return (
    <div className="floating-cart" onClick={() => navigate('/cart')}>
      <ShoppingCart size={20} />
      {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
    </div>
  );
};

export default FloatingCart;
