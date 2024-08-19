import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditProduct.css"; // ตรวจสอบให้แน่ใจว่าใช้ชื่อไฟล์ CSS ที่ถูกต้อง

function EditProduct() {
  const { id } = useParams(); // รับ ID ของสินค้าที่จะถูกแก้ไขจาก URL
  const [product, setProduct] = useState({
    name: "",
    image: "",
    price: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null); // State สำหรับจัดการไฟล์รูปภาพ
  const navigate = useNavigate();

  useEffect(() => {
    // ดึงข้อมูลของสินค้าที่จะถูกแก้ไข
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("description", product.description);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await axios.put(
        `http://localhost:8000/api/products/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        alert("อัปเดตสินค้าสำเร็จ!");
        navigate("/admin");
      } else {
        alert("ไม่สามารถอัปเดตสินค้าได้");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการอัปเดตสินค้า:", error);
      alert("ไม่สามารถอัปเดตสินค้าได้");
    }
  };

  return (
    <div className="edit-product-container">
      <h2>แก้ไขสินค้า</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">ชื่อสินค้า:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">รูปภาพ:</label>
          {product.image && (
            <img
              src={`http://localhost:8000/${product.image}`}
              alt="Current product"
              className="product-image"
            />
          )}
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">ราคา:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">รายละเอียด:</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">อัปเดตสินค้า</button>
      </form>
    </div>
  );
}

export default EditProduct;
