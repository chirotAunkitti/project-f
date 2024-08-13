import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Order.css";

function Order() {
  const [category, setCategory] = useState("Smart collars");

  const products = [
    // หมวดหมู่ Smart collars
    {
      id: 1,
      name: "Mono Red",
      price: "€45",
      image: "/image/product3.jpg",
      category: "Smart collars",
    },
    {
      id: 2,
      name: "Mono Yellow",
      price: "€35",
      image: "/image/product3.jpg",
      category: "Smart collars",
    },
    {
      id: 3,
      name: "Mono Blue",
      price: "€40",
      image: "/image/product3.jpg",
      category: "Smart collars",
    },
    {
      id: 4,
      name: "Mono Yellow",
      price: "€125",
      image: "/image/product3.jpg",
      category: "Smart collars",
    },
    {
      id: 5,
      name: "Mono Red",
      price: "€105",
      image: "/image/product3.jpg",
      category: "Smart collars",
    },

    // หมวดหมู่ Address tags
    {
      id: 6,
      name: "Tag Blue",
      price: "€25",
      image: "/image/products4.jpg",
      category: "Address tags",
    },
    {
      id: 7,
      name: "Tag Green",
      price: "€30",
      image: "/image/products4.jpg",
      category: "Address tags",
    },
    {
      id: 8,
      name: "Tag Blue",
      price: "€25",
      image: "/image/products4.jpg",
      category: "Address tags",
    },
    {
      id: 9,
      name: "Tag Green",
      price: "€30",
      image: "/image/products4.jpg",
      category: "Address tags",
    },
    {
      id: 10,
      name: "Tag Green",
      price: "€30",
      image: "/image/products4.jpg",
      category: "Address tags",
    },
      // หมวดหมู่ Collars
    {
      id: 11,
      name: "Tag Blue",
      price: "€25",
      image: "/image/products1.jpg",
      category: "Collars",
    },
    {
      id: 12,
      name: "Tag Green",
      price: "€30",
      image: "/image/products1.jpg",
      category: "Collars",
    },
    {
      id: 13,
      name: "Tag Blue",
      price: "€25",
      image: "/image/products1.jpg",
      category: "Collars",
    },
    {
      id: 14,
      name: "Tag Green",
      price: "€30",
      image: "/image/products1.jpg",
      category: "Collars",
    },
    {
      id: 15,
      name: "Tag Green",
      price: "€30",
      image: "/image/products1.jpg",
      category: "Collars",
    },
    // หมวดหมู่ Leashes
    {
      id: 16,
      name: "Tag Green",
      price: "€30",
      image: "/image/products5.jpg",
      category: "Leashes",
    },
    {
      id: 17,
      name: "Tag Blue",
      price: "€25",
      image: "/image/products5.jpg",
      category: "Leashes",
    },
    {
      id: 18,
      name: "Tag Blue",
      price: "€25",
      image: "/image/products5.jpg",
      category: "Leashes",
    },
    {
      id: 19,
      name: "Tag Blue",
      price: "€25",
      image: "/image/products5.jpg",
      category: "Leashes",
    },
    {
      id: 20,
      name: "Tag Blue",
      price: "€25",
      image: "/image/products5.jpg",
      category: "Leashes",
    },
    // หมวดหมู่ Smart collars
    {
        id: 21,
        name: "Mono Red",
        price: "€45",
        image: "/image/product3.jpg",
        category: "Smart collars",
      },
      // หมวดหมู่ Address tags
    {
        id: 22,
        name: "Tag Blue",
        price: "€25",
        image: "/image/products4.jpg",
        category: "Address tags",
      },
        // หมวดหมู่ Collars
    {
        id: 23,
        name: "Tag Blue",
        price: "€25",
        image: "/image/products1.jpg",
        category: "Collars",
      },
      // หมวดหมู่ Leashes
    {
        id: 24,
        name: "Tag Green",
        price: "€30",
        image: "/image/products5.jpg",
        category: "Leashes",
      }
    
  ];

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  const filteredProducts = products.filter(
    (product) => product.category === category
  );

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
          <button
            className={category === "Leashes" ? "active" : ""}
            onClick={() => handleCategoryChange("Leashes")}
          >
            Leashes
          </button>
        </div>
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-item">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.price}</p>
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
      {/* <footer>
        <form className="newsletter-form">
          <h3>Subscribe to the newsletter</h3>
          <input type="email" placeholder="Email" />
          <button type="submit">Send</button>
        </form>
      </footer> */}
    </div>
  );
}

export default Order;
