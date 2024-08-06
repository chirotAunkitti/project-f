import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-login">Login</button>
        <button type="button" className="btn-register" onClick={handleRegister}>
          Register
        </button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default Login;
