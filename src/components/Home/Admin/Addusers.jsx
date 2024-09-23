import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Addusers.css'; // เพิ่มการนำเข้าไฟล์ CSS ของ Addusers

function Addusers() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          phone,
          address,
        }),
      });

      if (response.status === 201) {
        Swal.fire({
          title: 'สำเร็จ!',
          text: 'เพิ่มผู้ใช้สำเร็จ',
          icon: 'success',
          confirmButtonText: 'ตกลง'
        }).then((result) => {
          if (result.isConfirmed) {
            // ล้างข้อมูลฟอร์มและนำทางกลับไปหน้า admin
            setEmail('');
            setPassword('');
            setPhone('');
            setAddress('');
            navigate('/admin');
          }
        });
      } else {
        throw new Error('Failed to add user');
      }
    } catch (error) {
      console.error("Error adding user:", error);
      Swal.fire({
        title: 'ข้อผิดพลาด!',
        text: 'เกิดข้อผิดพลาดในการเพิ่มผู้ใช้',
        icon: 'error',
        confirmButtonText: 'ตกลง'
      });
    }
  };

  return (
    <div className="addusers-container">
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <div className="addusers-form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="addusers-form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="addusers-form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="addusers-form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="addusers-button">Add User</button>
        <button className="addusers-back-button">
          <Link to="/admin" className="addusers-back-link">
            Back to Admin
          </Link>
        </button>
      </form>
    </div>
  );
}

export default Addusers;
