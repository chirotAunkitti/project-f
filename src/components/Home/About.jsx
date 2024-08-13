import React from 'react';
import './About.css';

function About() {
  return (
    <section className="about">
      <h2>ABOUT</h2>
      <div className="about-items">
        {[1, 2, 3, 4].map((item, index) => (
          <div key={index} className="about-item">
            <img src={`${process.env.PUBLIC_URL}/image/outbox.svg`} alt="Outbox" className="about-icon" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default About;
