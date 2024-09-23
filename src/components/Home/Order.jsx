import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import "./Order.css";

function Order() {
  const [category, setCategory] = useState("Smart collars");
  const [products, setProducts] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [cartCount, setCartCount] = useState(0); // สร้าง state สำหรับนับจำนวนสินค้าในตะกร้า
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/order/${category}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [category]);

  useEffect(() => {
    // ฟังก์ชันนี้เพื่อคำนวณจำนวนสินค้าทั้งหมดในตะกร้า
    const calculateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
      setCartCount(totalItems);
    };

    calculateCartCount();
  }, []);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  const addToCart = (product) => {
    const uniqueId = uuidv4();
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, id: uniqueId, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setCartCount(cart.reduce((total, item) => total + item.quantity, 0)); // อัปเดตจำนวนสินค้าในตะกร้า
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`order-page ${darkMode ? "dark" : ""}`}>
      <header className="order-header">
        <h4>Screw D</h4>
        <p className="Catalog-order">Catalog</p>
        <div className="header-right">
          <nav>
            <ul className="nav-links">
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
                <Link to="/shoppingCart" className="cart-icon">
                  🛒
                  {cartCount > 0 && (
                    <span className="cart-count">{cartCount}</span>
                  )}
                </Link>
              </li>
            </ul>
          </nav>

          <div className="dark-mode-toggle">
            <button className="darkMode" onClick={toggleDarkMode}>
              {darkMode ? "🌜" : "🌞"}
            </button>
          </div>
        </div>
      </header>
      <main>
        <div className="HHH">
        <div className="filter-buttons">
          <button
            className={`order-product-button ${
              category === "Smart collars" ? "active" : ""
            }`}
            onClick={() => handleCategoryChange("Smart collars")}
          >
            การไฟฟ้า
          </button>
          <button
            className={`order-product-button ${
              category === "Address tags" ? "active" : ""
            }`}
            onClick={() => handleCategoryChange("Address tags")}
          >
            การประปา
          </button>
          <button
            className={`order-product-button ${
              category === "Collars" ? "active" : ""
            }`}
            onClick={() => handleCategoryChange("Collars")}
          >
            โทรมนาคม
          </button>
          <button
            className={`order-product-button ${
              category === "ton" ? "active" : ""
            }`}
            onClick={() => handleCategoryChange("ton")}
          >
            Ton Product 4
          </button>
        </div>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-item">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <Link to="/Shoppingcart">
                <button
                  className="order-button-custom"
                  onClick={() => addToCart(product)}
                >
                  Order
                </button>
              </Link>
              <button
                className="cart-icon-custom"
                onClick={() => addToCart(product)}
              >
                🛒
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Order;
