import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Addorder1.css'; // ใช้ CSS ที่อัปเดต

function Addorder2() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleAddProduct = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:8000/api/orderaddress-tags', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 201) {
        alert("เพิ่มสินค้าสำเร็จ!");
        // ล้างข้อมูลฟอร์มหลังจากเพิ่มสินค้า
        navigate('/admin');
        setName('');
        setPrice('');
        setImage(null);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("เกิดข้อผิดพลาดในการเพิ่มสินค้า");
    }
  };

  return (
    <div className="addorder1-container">
      <div className="addorder1-header">
        <h2>Add Smart Collar</h2>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); handleAddProduct(); }}>
        <div className="addorder1-form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="addorder1-form-group">
          <label>Price:</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="addorder1-form-group">
          <label>Image:</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <button type="submit" className="addorder1-button">Add Product</button>
        <button className="addorder1-back-button">
          <Link to="/admin" className="addorder1-back-link">
            Back to Admin
          </Link>
        </button>
      </form>
    </div>
  );
}

export default Addorder2;
