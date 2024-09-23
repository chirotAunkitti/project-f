import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Delivery.css";
import { deli } from "../../Database/Api/AdminApi";

function Delivery() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [subdistrict, setSubdistrict] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.target.checkValidity()) {
      try {
        const recipient_name = `${firstName} ${lastName}`;
        const address_line1 = address;
        const address_line2 = `${subdistrict}, ${district}, ${province}`;
        const city = subdistrict;
        const state = province;
        const postal_code = zipCode;
        const country = "Thailand";

        const formData = {
          recipient_name,
          address_line1,
          address_line2,
          city,
          state,
          postal_code,
          country,
          phone_number: phoneNumber,
        };

        await deli(formData);
        console.log("Delivery data saved successfully");
        navigate("/home");
      } catch (error) {
        console.error("Error saving delivery data:", error.message);
      }
    }
  };

  return (
    <div className="delivery-page-container">
      <div className="delivery-form-container">
        <h2 className="delivery-form-title">ที่อยู่จัดส่งสินค้า</h2>
        <form onSubmit={handleSubmit} noValidate className="delivery-form">
          <div className="delivery-form-group">
            <label htmlFor="firstName" className="delivery-form-label">
              ชื่อ:
            </label>
            <input
              type="text"
              id="firstName"
              className="delivery-form-input"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <span className="delivery-error-message">กรุณากรอกชื่อ</span>
          </div>

          <div className="delivery-form-group">
            <label htmlFor="lastName" className="delivery-form-label">
              นามสกุล:
            </label>
            <input
              type="text"
              id="lastName"
              className="delivery-form-input"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <span className="delivery-error-message">กรุณากรอกนามสกุล</span>
          </div>

          <div className="delivery-form-group">
            <label htmlFor="phoneNumber" className="delivery-form-label">
              เบอร์โทรศัพท์:
            </label>
            <input
              type="tel"
              id="phoneNumber"
              className="delivery-form-input"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <span className="delivery-error-message">
              กรุณากรอกเบอร์โทรศัพท์
            </span>
          </div>

          {/* เปลี่ยนตำบลเป็น input */}
          <div className="delivery-form-group">
            <label htmlFor="subdistrict" className="delivery-form-label">
              ตำบล/แขวง:
            </label>
            <input
              type="text"
              id="subdistrict"
              className="delivery-form-input"
              value={subdistrict}
              onChange={(e) => setSubdistrict(e.target.value)}
              placeholder="กรุณากรอกตำบล/แขวง"
              required
            />
            <span className="delivery-error-message">กรุณากรอกตำบล/แขวง</span>
          </div>

          {/* เปลี่ยนอำเภอเป็น input */}
          <div className="delivery-form-group">
            <label htmlFor="district" className="delivery-form-label">
              อำเภอ/เขต:
            </label>
            <input
              type="text"
              id="district"
              className="delivery-form-input"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              placeholder="กรุณากรอกอำเภอ/เขต"
              required
            />
            <span className="delivery-error-message">กรุณากรอกอำเภอ/เขต</span>
          </div>

          {/* เปลี่ยนจังหวัดเป็น input */}
          <div className="delivery-form-group">
            <label htmlFor="province" className="delivery-form-label">
              จังหวัด:
            </label>
            <input
              type="text"
              id="province"
              className="delivery-form-input"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              placeholder="กรุณากรอกจังหวัด"
              required
            />
            <span className="delivery-error-message">กรุณากรอกจังหวัด</span>
          </div>

          <div className="delivery-form-group">
            <label htmlFor="zipCode" className="delivery-form-label">
              รหัสไปรษณีย์:
            </label>
            <input
              type="text"
              id="zipCode"
              className="delivery-form-input"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              maxLength="5"
              pattern="\d{5}"
              title="กรุณากรอกรหัสไปรษณีย์ 5 หลัก"
              required
            />
            <span className="delivery-error-message">
              กรุณากรอกรหัสไปรษณีย์ 5 หลัก
            </span>
          </div>

          <div className="delivery-form-group full-width">
            <label htmlFor="address" className="delivery-form-label">
              ที่อยู่:
            </label>
            <textarea
              id="address"
              className="delivery-form-textarea"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="บ้านเลขที่ ถนน ซอย"
              required
            />
            <span className="delivery-error-message">กรุณากรอกที่อยู่</span>
          </div>
          
          <button type="submit" className="delivery-form-submit">
            บันทึกที่อยู่
          </button>
        </form>
      </div>
    </div>
  );
}

export default Delivery;
