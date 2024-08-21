import React from "react";
import { useNavigate } from "react-router-dom";
import "./Makepayment.css";

function Makepayment() {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/shoppingCart");
  };
  return (
    <div className="payment-container">
      <h2>Payment method</h2>

      <div className="payment-method">
        <h3>ชำระเงินทันที</h3>
        <div className="method-item">
          <img src="/image/VISA.png" alt="VISA/Mastercard" />
          <span>บัตรเครดิต / เดบิต</span>
          <span className="secure-text">ปลอดภัย ไม่มีค่าธรรมเนียม</span>
          <span className="arrow">&gt;</span>
        </div>
      </div>

      <div className="payment-method">
        <h3>โอนผ่านบัญชีธนาคาร</h3>
        <div className="method-item">
          <img src="/image/กสิกร.jpg" alt="ธนาคารกสิกร" />
          <span>ธนาคารกสิกร</span>
          <span className="account-number">1212312121</span>
          <span className="arrow">&gt;</span>
        </div>
      </div>

      <div className="payment-method">
        {/* <h3>โอนผ่านบัญชีธนาคาร</h3> */}
        <div className="method-item">
          <img src="/image/กรุงเทพ.jpg" alt="ธนาคารกรุงเทพ" />
          <span>ธนาคารกรุงเทพ</span>
          <span className="account-number">1212312121</span>
          <span className="arrow">&gt;</span>
        </div>
      </div>
      <div className="payment-method">
        {/* <h3>โอนผ่านบัญชีธนาคาร</h3> */}
        <div className="method-item">
          <img src="/image/กรุงไทย.jpg" alt="ธนาคารกรุงไทย" />
          <span>ธนาคารกรุงไทย</span>
          <span className="account-number">1212312121</span>
          <span className="arrow">&gt;</span>
        </div>
      </div>

      <div className="payment-method">
        {/* <h3>โอนผ่านบัญชีธนาคาร</h3> */}
        <div className="method-item">
          <img src="/image/ไทยพาณิชย์.jpg" alt="ธนาคารไทยพาณิชย์" />
          <span>ธนาคารไทยพาณิชย์</span>
          <span className="account-number">1212312121</span>
          <span className="arrow">&gt;</span>
        </div>
      </div>

      {/* <div className="payment-method">
        <h3>พร้อมเพย์</h3>
        <div className="method-item">
          <img src="/image/promptpay-logo.png" alt="PromptPay" className="qr-code" />
          <span>121-2-31212-1</span>
          <span className="shop-name"></span>
          <span className="arrow">&gt;</span>
        </div>
      </div> */}
      <button className="checkout" onClick={handleCheckout}>
        Back
      </button>
    </div>
  );
}

export default Makepayment;
