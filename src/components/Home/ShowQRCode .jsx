import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const ShowQRCode = () => {
  const location = useLocation();
  const qrCodeUrl = location.state?.qrCodeUrl || '';
  const orderDetails = location.state?.orderDetails || {};

  return (
    <div className="show-qrcode-page">
      <h1>QR Code for Payment</h1>
      {qrCodeUrl ? (
        <>
          <img src={qrCodeUrl} alt="QR Code" style={{ width: '500px', objectFit: 'contain' }} />
          <div className="order-summary">
            <h2>Order Summary</h2>
            <p>Total Amount: ${orderDetails.totalAmount}</p>
            <ul>
              {orderDetails.items?.map((item, index) => (
                <li key={index}>{item.name} - Quantity: {item.quantity} - Price: ${item.price * item.quantity}</li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <p>No QR Code available.</p>
      )}
      <Link to="/shoppingcart">Back to Cart</Link>
    </div>
  );
};

export default ShowQRCode;