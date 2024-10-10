import React from "react";
import './bottommm.css';

const Bottom = () => {
  return (
    <div className="content__container_ooo">
      <div className="contentr__column">
        <h4>ประเภทสินค้า</h4>
        <p>สินค้าและบริการ</p>
        <p>ทำไมต้องเลือกเรา</p>
        <p>บริการลูกค้า</p>
        <p>ติดต่อเรา</p>
      </div>
      <div className="contentr__column">
        <h4>สินค้าและบริการ</h4>
        <p>นอตมาตรฐาน</p>
        <p>นอตพิเศษตามสั่ง</p>
        <p>ผลิตภัณฑ์ที่เกี่ยวข้อง</p>
        <p>บริการจัดส่ง</p>
      </div>
      <div className="contentr__column">
        <h4>เกี่ยวกับโรงงานนอต</h4>
        <p>ประวัติโรงงาน</p>
        <p>มาตรฐานการผลิต</p>
        <p>เครื่องจักรและเทคโนโลยี</p>
      </div>
      <div className="contentr__column">
        <h4>พื้นที่ลูกค้า</h4>
        <p>เข้าสู่ระบบสมาชิก</p>
        <p>ต่ออายุสมาชิก</p>
        <p>ชำระเงิน</p>
      </div>
      <div className="contentr__column">
        <h4>ติดต่อเรา</h4>
        <p>ที่อยู่โรงงาน</p>
        <p>ร่วมงานกับเรา</p>
        <p>ติดตามเรา</p>
      </div>
      <div className="contentr__column">
        <h4>รับข่าวสาร</h4>
        <form>
          <input 
            type="email" 
            placeholder="กรอกอีเมลของคุณ" 
            className="email-input"
          />
          <button  type="submit" className="submit-butto-Bottom">สมัคร</button>
        </form>
      </div>
    </div>
  );
}

export default Bottom;
