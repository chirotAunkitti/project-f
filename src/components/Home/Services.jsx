import React from 'react';
import './Services.css';

function Services() {
  return (
    <section className="services">
      <h2>SERVICES</h2>
      <div className="service-icons">
        <div className="service-item">
          <img src={`${process.env.PUBLIC_URL}/image/User.svg`} alt="Service 1" className="service-icon" />
          <h3>Service 1</h3>
          <p>Description of Service 1</p>
        </div>
        <div className="service-item">
          <img src={`${process.env.PUBLIC_URL}/image/User.svg`} alt="Service 2" className="service-icon" />
          <h3>Service 2</h3>
          <p>Description of Service 2</p>
        </div>
        <div className="service-item">
          <img src={`${process.env.PUBLIC_URL}/image/User.svg`} alt="Service 3" className="service-icon" />
          <h3>Service 3</h3>
          <p>Description of Service 3</p>
        </div>
      </div>
    </section>
  );
}

export default Services;
