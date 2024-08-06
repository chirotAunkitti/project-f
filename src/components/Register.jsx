import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formData = {
      email,
      password,
      phone,
      address,
    };
  
    try {
      const response = await fetch('http://localhost:8000/api/register', {  // ตรวจสอบเส้นทาง
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('Registration successful:', result);
        navigate('/login');
      } else {
        const error = await response.json();
        console.error('Registration error:', error);
        setError(error.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setError('An error occurred');
    }
  };

  const handleBack = () => {
    navigate('/login');
  };

  return (
    <div className="register-container">
  <div className="image-container"></div>
  <div className="form-container">
    <h2>Create Account</h2>
    {error && <div className="error-message">{error}</div>}
    <form onSubmit={handleSubmit} className="register-form">
      <div className="form-group">
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone Number"
          required
        />
      </div>
      <div className="form-group">
        <textarea
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
          required
        />
      </div>
          <div className="btn-container">
            <button type="submit" className="btn-register">Create Account</button>
            <button type="button" onClick={handleBack} className="btn-register">Back</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
