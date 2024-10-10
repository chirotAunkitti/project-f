import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Delivery.css"; // นำเข้าไฟล์ CSS สำหรับจัดรูปแบบคอมโพเนนต์
import { deli } from "../../Database/Api/AdminApi"; // นำเข้าฟังก์ชัน deli สำหรับบันทึกข้อมูล
import Swal from 'sweetalert2';


function Delivery() {
  // สร้าง state สำหรับข้อมูลที่อยู่
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [subdistrict, setSubdistrict] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate(); // ใช้ navigate เพื่อเปลี่ยนเส้นทาง

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
        
        // แสดง Swal เมื่อบันทึกสำเร็จ
        Swal.fire({
          icon: 'success',
          title: 'สำเร็จ!',
          text: 'ข้อมูลที่อยู่จัดส่งของคุณถูกบันทึกแล้ว!',
          confirmButtonText: 'ตกลง'
        });
  
        navigate("/home");
      } catch (error) {
        console.error("Error saving delivery data:", error.message);
        Swal.fire({
          icon: 'error',
          title: 'ผิดพลาด!',
          text: 'ไม่สามารถบันทึกข้อมูลได้ กรุณาลองอีกครั้ง.',
          confirmButtonText: 'ตกลง'
        });
      }
    }
  };
  

  return (
    <div className="delivery-page-container">
      <div className="delivery-form-container">
        <h2 className="delivery-form-title">ที่อยู่จัดส่งสินค้า</h2>
        <img className="icon-D" src="/image/logo/De.png" alt="" />
        <form onSubmit={handleSubmit} noValidate className="delivery-form">
          {/* ฟอร์มสำหรับกรอกข้อมูลที่อยู่ */}
          <div className="delivery-form-group">
            <label htmlFor="firstName" className="delivery-form-label">ชื่อ:</label>
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
            <label htmlFor="lastName" className="delivery-form-label">นามสกุล:</label>
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
            <label htmlFor="phoneNumber" className="delivery-form-label">เบอร์โทรศัพท์:</label>
            <input
              type="tel"
              id="phoneNumber"
              className="delivery-form-input"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <span className="delivery-error-message">กรุณากรอกเบอร์โทรศัพท์</span>
          </div>

          {/* ตำบล/แขวง */}
          <div className="delivery-form-group">
            <label htmlFor="subdistrict" className="delivery-form-label">ตำบล/แขวง:</label>
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

          {/* อำเภอ/เขต */}
          <div className="delivery-form-group">
            <label htmlFor="district" className="delivery-form-label">อำเภอ/เขต:</label>
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

          {/* จังหวัด */}
          <div className="delivery-form-group">
            <label htmlFor="province" className="delivery-form-label">จังหวัด:</label>
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

          {/* รหัสไปรษณีย์ */}
          <div className="delivery-form-group">
            <label htmlFor="zipCode" className="delivery-form-label">รหัสไปรษณีย์:</label>
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
            <span className="delivery-error-message">กรุณากรอกรหัสไปรษณีย์ 5 หลัก</span>
          </div>

          {/* ที่อยู่ */}
          <div className="delivery-form-group full-width">
            <label htmlFor="address" className="delivery-form-label">ที่อยู่:</label>
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

export default Delivery; // ส่งออกคอมโพเนนต์ Delivery
