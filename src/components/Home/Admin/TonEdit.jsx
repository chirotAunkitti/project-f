import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { useNavigate, useParams } from "react-router-dom";
import './TonEdit.css';
import { Link } from "react-router-dom";

function TonEdit() {
  const [Ton, setTon] = useState({ name: "", price: "", image: "" });
  const [imageFile, setImageFile] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchtons();
  }, []);

  const fetchtons = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/ton/${id}`);
      setTon(response.data);
    } catch (error) {
      console.error("Error fetching ton:", error);
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: 'ไม่สามารถดึงข้อมูล Ton ได้',
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTon({ ...Ton, [name]: value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting data:", Ton);
    try {
      const formData = new FormData();
      formData.append("name", Ton.name);
      formData.append("price", Ton.price);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      console.log("FormData:", formData.get("image"));

      await axios.put(`http://localhost:8000/api/ton/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire({
        icon: 'success',
        title: 'สำเร็จ',
        text: 'อัปเดต Ton เรียบร้อยแล้ว',
      }).then(() => {
        navigate("/admin");
      });
    } catch (error) {
      console.error("Error updating Ton:", error);
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: 'ไม่สามารถอัปเดต Ton ได้',
      });
    }
  };

  return (
    <div className="order-edit-container">
      <h2>Edit Ton</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={Ton.name}
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
            value={Ton.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="order-image" htmlFor="image">
            Image:
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Update Ton</button>
        <button className="order3-button">
        <Link to="/admin" className="back-link">
          Back to Admin
        </Link>
      </button>
      </form>
    </div>
  );
}

export default TonEdit;
