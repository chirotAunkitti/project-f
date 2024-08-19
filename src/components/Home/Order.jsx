import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';  // นำเข้า axios สำหรับเรียก API
import "./Order.css";

function Order() {
  const [category, setCategory] = useState("Smart collars");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // ฟังก์ชันเพื่อดึงข้อมูลผลิตภัณฑ์จาก API
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/order/${category}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [category]); // เมื่อ category เปลี่ยนแปลง จะทำการดึงข้อมูลใหม่

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  return (
    <div className="order-page">
      <header>
        <h1>Doggy</h1>
        <nav>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <a href="#" className="active">
                Catalog
              </a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <a href="#" className="cart-icon">
                🛒
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <h2>Catalog</h2>
        <div className="filter-buttons">
          <button
            className={category === "Smart collars" ? "active" : ""}
            onClick={() => handleCategoryChange("Smart collars")}
          >
            Smart collars
          </button>
          <button
            className={category === "Address tags" ? "active" : ""}
            onClick={() => handleCategoryChange("Address tags")}
          >
            Address tags
          </button>
          <button
            className={category === "Collars" ? "active" : ""}
            onClick={() => handleCategoryChange("Collars")}
          >
            Collars
          </button>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-item">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.price}</p>
              <button
                className="order-button"
                onClick={() => console.log(`Ordering ${product.name}`)}
              >
                สั่งซื้อ
              </button>
              <button
                className="add-to-cart"
                onClick={() => console.log(`Adding ${product.name} to cart`)}
              >
                🛒
              </button>
            </div>
          ))}
        </div>

        <button
          className="see-more"
          onClick={() => console.log(`Showing more ${category}`)}
        >
          See more
        </button>
      </main>
    </div>
  );
}

export default Order;
