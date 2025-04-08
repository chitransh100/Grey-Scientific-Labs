import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Body from './components/Body';
import Navbar from './components/Navbar';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import FloatingCart from './components/FloatingCart'; // ← Import floating cart

// App.jsx
function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <Router>
      {token && <Navbar setToken={setToken} />} {/* Pass setToken */}
      <Routes>
        <Route path="/login" element={!token ? <Login setToken={setToken} /> : <Navigate to="/" />} />
        <Route path="/signup" element={!token ? <Signup /> : <Navigate to="/" />} />
        <Route path="/" element={token ? <Body /> : <Navigate to="/login" />} />
        <Route path="/product/:id" element={token ? <ProductDetail /> : <Navigate to="/login" />} />
        <Route path="/cart" element={token ? <Cart /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={token ? "/" : "/login"} />} />
      </Routes>
      {token && <FloatingCart />}
    </Router>
  );
}


export default App;
