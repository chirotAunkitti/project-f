import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './ShowQRCode.css';

const ShowQRCode = () => {
  const location = useLocation();
  const qrCodeUrl = location.state?.qrCodeUrl || '';
  const orderDetails = location.state?.orderDetails || {};

  return (
    <div className="show-qrcode-page">
      <div className="qr-container">
        <h5>QR Code for Payment</h5>
        {qrCodeUrl ? (
          <>
            <div className="qr-code-wrapper">
              <img src={qrCodeUrl} alt="QR Code" className="qr-code" />
            </div>
            <div className="payment-info">
              {/* <p><strong>PromptPay:</strong> 0956721589</p> */}
              <p><strong>ชื่อบัญชี:</strong> นาย จิโรจ อุ่นกิตติ</p>
            </div>
            <div className="order-summary">
              <h2>Order Summary</h2>
              <p><strong>Total Amount:</strong> ${orderDetails.totalAmount.toFixed(2)}</p>
              <ul>
                {orderDetails.items?.map((item, index) => (
                  <li key={index}>
                    {item.name} - Quantity: {item.quantity} - Price: ${(item.price * item.quantity).toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <p>No QR Code available.</p>
        )}
        <Link to="/shoppingcart" className="back-button">Back to Cart</Link>
        <Link to="/checkslip" className="back-button">checkslip</Link>
      </div>
    </div>
  );
};

export default ShowQRCode;