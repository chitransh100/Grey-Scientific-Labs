import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CardContext';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';
import { useState } from 'react';

const Navbar = ({ setToken }) => {
  const { cart } = useCart();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">
          <span className="brand-name">ShopHere !!</span>
        </Link>
      </div>

      <div className={`nav-right ${menuOpen ? 'open' : ''}`}>
        <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/cart" className="nav-link cart-link" onClick={() => setMenuOpen(false)}>
          Cart
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>

        <button onClick={toggleTheme} className="theme-toggle-btn">
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>

        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
      </div>
    </nav>
  );
};

export default Navbar;
