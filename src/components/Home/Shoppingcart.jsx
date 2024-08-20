import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Shoppingcart.css";

function Shoppingcart() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setItems(savedCart);
  }, []);

  const updateQuantity = (id, change) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const removeItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    navigate("/makepayment");
  };

  return (
    <div className="shopping-cart-page">
      <header className="shopping-cart-header">
        <nav>
          <span>
            <Link to="/home" className="nav-link">
              HOME
            </Link>
          </span>
          <span>
            <Link to="/order" className="nav-link">
              ORDER
            </Link>
          </span>
          {/* <span className="right">CART {items.length}</span> */}
        </nav>
      </header>
      <div className="shopping-cart-content">
        <h1>Your Cart</h1>
        {items.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>PRODUCT</th>
                <th>PRICE</th>
                <th>QUANTITY</th>
                <th>TOTAL</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img
                      src={item.image} // Display product image
                      alt={item.name}
                      className="product-image"
                    />
                    {item.name}
                  </td>
                  <td>${item.price}</td>
                  <td>
                    <div className="quantity-controls">
                      <button onClick={() => updateQuantity(item.id, -1)}>
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)}>
                        +
                      </button>
                    </div>
                  </td>
                  <td>${item.price * item.quantity}</td>
                  <td>
                    <button
                      className="remove-button"
                      onClick={() => removeItem(item.id)}
                    >
                      x
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Your cart is empty.</p>
        )}
        <div className="order-summary">
          <h2>Order Summary</h2>
          <p>
            <span>ราคารวม</span>
            <span>${subtotal}</span>
          </p>
          <p>
            <span>การจัดส่ง</span>
            <span>Free</span>
          </p>
          {/* <p>
            <a href="#" className="coupon-link">
              Add coupon code +
            </a>
          </p> */}
          <p>
            <strong>ราคารวมทั้งหมด</strong>
            <strong>${subtotal}</strong>
          </p>
          <button className="checkout" onClick={handleCheckout}>
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
}

export default Shoppingcart;
