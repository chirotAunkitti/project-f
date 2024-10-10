import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Addorder1.css'; // ใช้ CSS ที่อัปเดต

function Addorder4() {
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
      const response = await axios.post('http://localhost:8000/api/order4ton', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 201) {
        // ใช้ SweetAlert2 แสดงป็อปอัพเมื่อสำเร็จ
        Swal.fire({
          title: 'สำเร็จ!',
          text: 'เพิ่มสินค้าสำเร็จ',
          icon: 'success',
          confirmButtonText: 'ตกลง'
        }).then((result) => {
          if (result.isConfirmed) {
            // ล้างข้อมูลฟอร์มและนำทางกลับไปหน้า admin
            setName('');
            setPrice('');
            setImage(null);
            navigate('/admin');
          }
        });
      }
    } catch (error) {
      console.error("Error adding product:", error);
      // ใช้ SweetAlert2 แสดงป็อปอัพเมื่อเกิดข้อผิดพลาด
      Swal.fire({
        title: 'ข้อผิดพลาด!',
        text: 'เกิดข้อผิดพลาดในการเพิ่มสินค้า',
        icon: 'error',
        confirmButtonText: 'ตกลง'
      });
    }
  };

  return (
    <div className="addorder1-container">
      <div className="addorder1-header">
        <h1>Add Ton</h1>
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

export default Addorder4;
