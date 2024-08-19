import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Order3Edit.css'; 

function Order3Edit() {
  const [collar, setCollar] = useState({ name: '', price: '', image: '' });
  const [imageFile, setImageFile] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCollar();
  }, []);

  const fetchCollar = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/collars/${id}`);
      setCollar(response.data);
    } catch (error) {
      console.error('Error fetching collar:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCollar({ ...collar, [name]: value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', collar.name);
      formData.append('price', collar.price);
      if (imageFile) {
        formData.append('image', imageFile); // อัปโหลดไฟล์ภาพถ้ามี
      }

      await axios.put(`http://localhost:8000/api/collars/${id}`, formData);
      alert('Collar updated successfully');
      navigate('/admin'); // เปลี่ยนเส้นทางไปที่หน้า admin หรือหน้าที่คุณต้องการหลังจากอัปเดต
    } catch (error) {
      console.error('Error updating collar:', error);
      alert('Failed to update collar');
    }
  };

  return (
    <div className="order3-edit-container">
      <h2>Edit Collar</h2>
      <form onSubmit={handleSubmit}>
        <div className="order3-form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={collar.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="order3-form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={collar.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="order3-form-group">
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className="order3-button">Update Collar</button>
      </form>
    </div>
  );
}

export default Order3Edit;
