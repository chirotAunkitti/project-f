import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = {
      email: email,
      password: password,
    };
  
    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('Login successful:', result);
        Swal.fire({
          icon: 'success',
          title: 'success',
          text: 'welcome!',
        });
        navigate('/home');
      } else {
        const error = await response.json();
        console.error('Login error:', error);
        Swal.fire({
          icon: 'error',
          title: 'error',
          text: error.message || 'An error occurred logging in',
        });
      }
    } catch (error) {
      console.error('Fetch error:', error);
      Swal.fire({
        icon: 'error',
        title: 'error',
        text: 'An error occurred logging in.',
      });
    }
  };
  
  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <div className="image-container"></div>
      <div className="form-container">
        <h2>User Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="btn-container">
            <button type="submit" className="btn-login">Login</button>
            <button type="button" className="btn-login" onClick={handleRegister}>
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
