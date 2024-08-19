import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './orderEdit.css'; // นำเข้าฟิล์ CSS

function OrderEdit() {
  const [collar, setCollar] = useState({ name: '', price: '', image: '' });
  const [imageFile, setImageFile] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSmartCollar();
  }, []);

  const fetchSmartCollar = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/smart-collars/${id}`);
      setCollar(response.data);
    } catch (error) {
      console.error('Error fetching smart collar:', error);
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
    console.log('Submitting data:', collar);

    try {
      const formData = new FormData();
      formData.append('name', collar.name);
      formData.append('price', collar.price);

      if (imageFile) {
        formData.append('image', imageFile);
      }

      console.log('FormData:', formData.get('image')); // ตรวจสอบว่าภาพถูกเพิ่มใน formData หรือไม่

      await axios.put(`http://localhost:8000/api/smart-collars/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Smart collar updated successfully');
      navigate('/admin');
    } catch (error) {
      console.error('Error updating smart collar:', error);
      alert('Failed to update smart collar');
    }
  };

  return (
    <div className="order-edit-container">
      <h2>Edit Smart Collar</h2>
      <form onSubmit={handleSubmit}>
        <div>
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
        <div>
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
        <div>
          <label className='order-image' htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Update Smart Collar</button>
      </form>
    </div>
  );
}

export default OrderEdit;
