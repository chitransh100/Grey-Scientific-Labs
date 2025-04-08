import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Body from './components/Body';
import Navbar from './components/Navbar';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import FloatingCart from './components/FloatingCart'; // ← Import floating cart

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Router>
      {token && <Navbar />}
      <Routes>
        <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!token ? <Signup /> : <Navigate to="/" />} />
        <Route path="/" element={token ? <Body /> : <Navigate to="/login" />} />
        <Route path="/product/:id" element={token ? <ProductDetail /> : <Navigate to="/login" />} />
        <Route path="/cart" element={token ? <Cart /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={token ? "/" : "/login"} />} />
      </Routes>
      {token && <FloatingCart />} {/* ⬅ Add FloatingCart here */}
    </Router>
  );
}

export default App;
