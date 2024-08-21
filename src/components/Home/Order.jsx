import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import "./Order.css";

function Order() {
  const [category, setCategory] = useState("Smart collars");
  const [products, setProducts] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
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

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  const addToCart = (product) => {
    const uniqueId = uuidv4();
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item.id === uniqueId);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, id: uniqueId, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(`${product.name} added to cart`);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`order-page ${darkMode ? "dark" : ""}`}>
      <header className="order-header">
        <h4>Screw D</h4>
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
        <h2>Catalog</h2>
        <div className="filter-buttons">
          <button
            className={`order-product-button ${
              category === "Smart collars" ? "active" : ""
            }`}
            onClick={() => handleCategoryChange("Smart collars")}
          >
            Order Product 1
          </button>
          <button
            className={`order-product-button ${
              category === "Address tags" ? "active" : ""
            }`}
            onClick={() => handleCategoryChange("Address tags")}
          >
            Order Product 2
          </button>
          <button
            className={`order-product-button ${
              category === "Collars" ? "active" : ""
            }`}
            onClick={() => handleCategoryChange("Collars")}
          >
            Order Product 3
          </button>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-item">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <button
                className="order-button-custom"
                onClick={() => console.log(`Ordering ${product.name}`)}
              >
                Order
              </button>
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
