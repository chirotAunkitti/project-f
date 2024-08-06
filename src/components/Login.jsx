import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = {
      email: email, // ใช้ค่าจาก useState
      password: password, // ใช้ค่าจาก useState
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
        setMessage('ล็อกอินสำเร็จ');
        // นำทางไปยังหน้าถัดไป
        navigate('/home'); // แก้ไขตามหน้าที่ต้องการนำทางไป
      } else {
        const error = await response.json();
        console.error('Login error:', error);
        setMessage(error.message); // แสดงข้อความข้อผิดพลาด
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setMessage('เกิดข้อผิดพลาดในการล็อกอิน');
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
        {message && <div className="error-message">{message}</div>}
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
