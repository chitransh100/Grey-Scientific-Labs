// src/components/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('johnd');
  const [password, setPassword] = useState('m38rmF$');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        setError('Invalid credentials!');
      }
    } catch (err) {
      setError('Something went wrong!');
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleLogin}>
        <h2>Welcome Back 👋</h2>
        <p className="subhead">Please login to continue</p>
        {error && <p className="error">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Log In</button>
        <p className="signup-link">
          Don't have an account?{' '}
          <span onClick={() => navigate('/signup')}>Sign up here</span>.
        </p>
      </form>
    </div>
  );
};

export default Login;
