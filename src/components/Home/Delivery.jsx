import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Delivery.css";
import { deli } from "../../Database/Api/AdminApi";

const provinces = ["กรุงเทพมหานคร", "เชียงใหม่", "ภูเก็ต"];
const districts = {
  กรุงเทพมหานคร: ["บางรัก", "ปทุมวัน", "สาทร"],
  เชียงใหม่: ["เมืองเชียงใหม่", "แม่ริม", "สันทราย"],
  ภูเก็ต: ["เมืองภูเก็ต", "กะทู้", "ถลาง"],
};
const subdistricts = {
  บางรัก: ["สีลม", "สุริยวงศ์", "มหาพฤฒาราม"],
  ปทุมวัน: ["รองเมือง", "วังใหม่", "ปทุมวัน"],
  สาทร: ["ทุ่งวัดดอน", "ยานนาวา", "ทุ่งมหาเมฆ"],
  เมืองเชียงใหม่: ["ช้างเผือก", "ศรีภูมิ", "พระสิงห์"],
  แม่ริม: ["ริมใต้", "ริมเหนือ", "สันโป่ง"],
  สันทราย: ["สันทรายหลวง", "สันทรายน้อย", "สันพระเนตร"],
  เมืองภูเก็ต: ["ตลาดใหญ่", "ตลาดเหนือ", "รัษฎา"],
  กะทู้: ["กะทู้", "ป่าตอง"],
  ถลาง: ["เทพกระษัตรี", "ศรีสุนทร", "เชิงทะเล"],
};

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

  const handleProvinceChange = (e) => {
    setProvince(e.target.value);
    setDistrict("");
    setSubdistrict("");
  };

  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
    setSubdistrict("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.target.checkValidity()) {
      try {
        const recipient_name = `${firstName} ${lastName}`;
        const address_line1 = address;
        const address_line2 = `${subdistrict}, ${district}, ${province}`;
        const city = subdistrict; // ให้ค่า city เป็นค่าที่ไม่เป็น null
        const state = province; // ใช้ค่า province เป็น state
        const postal_code = zipCode; // ใช้รหัสไปรษณีย์ที่กรอก
        const country = "Thailand"; // หรือค่าอื่นๆ ตามที่ต้องการ

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
        console.log('Delivery data saved successfully');
        navigate('/home');
      } catch (error)  {
        console.error('Error saving delivery data:', error.message);
      }
      
    }
  };

  return (
    <div className="delivery-page-container">
      <div className="delivery-form-container">
        <h2 className="delivery-form-title">ที่อยู่จัดส่งสินค้า</h2>
        <form onSubmit={handleSubmit} noValidate className="delivery-form">
          {/* ข้อมูลฟอร์ม */}
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

          <div className="delivery-form-group">
            <label htmlFor="province" className="delivery-form-label">
              จังหวัด:
            </label>
            <select
              id="province"
              className="delivery-form-select"
              value={province}
              onChange={handleProvinceChange}
              required
            >
              <option value="">เลือกจังหวัด</option>
              {provinces.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <span className="delivery-error-message">กรุณาเลือกจังหวัด</span>
          </div>

          <div className="delivery-form-group">
            <label htmlFor="district" className="delivery-form-label">
              อำเภอ/เขต:
            </label>
            <select
              id="district"
              className="delivery-form-select"
              value={district}
              onChange={handleDistrictChange}
              disabled={!province}
              required
            >
              <option value="">เลือกอำเภอ/เขต</option>
              {province &&
                districts[province] &&
                districts[province].map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
            </select>
            <span className="delivery-error-message">กรุณาเลือกอำเภอ/เขต</span>
          </div>

          <div className="delivery-form-group">
            <label htmlFor="subdistrict" className="delivery-form-label">
              ตำบล/แขวง:
            </label>
            <select
              id="subdistrict"
              className="delivery-form-select"
              value={subdistrict}
              onChange={(e) => setSubdistrict(e.target.value)}
              disabled={!district}
              required
            >
              <option value="">เลือกตำบล/แขวง</option>
              {district &&
                subdistricts[district] &&
                subdistricts[district].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
            </select>
            <span className="delivery-error-message">กรุณาเลือกตำบล/แขวง</span>
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

          <div className="delivery-form-group">
            <label htmlFor="address"  className="delivery-form-label">
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
