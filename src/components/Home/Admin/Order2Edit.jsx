import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './Order2Edit.css'; // นำเข้าฟิล์ CSS

function Order2Edit() {
  const [addressTag, setAddressTag] = useState({ name: '', price: '', image: '' });
  const [imageFile, setImageFile] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAddressTag();
  }, []);

  const fetchAddressTag = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/address-tags/${id}`);
      setAddressTag(response.data);
    } catch (error) {
      console.error('Error fetching address tag:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressTag({ ...addressTag, [name]: value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', addressTag.name);
      formData.append('price', addressTag.price);
      if (imageFile) {
        formData.append('image', imageFile); // อัปโหลดไฟล์ภาพถ้ามี
      }

      await axios.put(`http://localhost:8000/api/address-tags/${id}`, formData);
      alert('Address tag updated successfully');
      navigate('/admin'); // เปลี่ยนเส้นทางไปที่หน้า admin หรือหน้าที่คุณต้องการหลังจากอัปเดต
    } catch (error) {
      console.error('Error updating address tag:', error);
      alert('Failed to update address tag');
    }
  };

  return (
    <div className="order2-edit-container">
      <h2>Edit Address Tag</h2>
      <form onSubmit={handleSubmit}>
        <div className="order2-form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={addressTag.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="order2-form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={addressTag.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="order2-form-group">
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className="order2-button">Update Address Tag</button>
      </form>
    </div>
  );
}

export default Order2Edit;
