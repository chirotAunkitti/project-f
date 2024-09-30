import React from 'react';
import './Services.css';

function Services() {
  return (
    <section className="services">
      <h2>SERVICES</h2>
      <div className="service-icons">
        <div className="service-item">
          <img src={`${process.env.PUBLIC_URL}/image/logo/1.png`} alt="Service 1" className="service-icon" />
          <h3>Service 1</h3>
          <p>การผลิตที่แม่นยำและปรับแต่งได้</p>
        </div>
        <div className="service-item">
          <img src={`${process.env.PUBLIC_URL}/image/logo/2.png`} alt="Service 2" className="service-icon" />
          <h3>Service 2</h3>
          <p>คุณภาพและการตรวจสอบมาตรฐาน</p>
        </div>
        <div className="service-item">
          <img src={`${process.env.PUBLIC_URL}/image/logo/3.png`} alt="Service 3" className="service-icon" />
          <h3>Service 3</h3>
          <p> การบริการที่ยืดหยุ่นต่อปริมาณการสั่งผลิต</p>
        </div>
      </div>
    </section>
  );
}

export default Services;
