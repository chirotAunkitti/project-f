import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <section className="contact">
      <h2>Contact Us</h2>
      <form className="contact-form">
        <div className="contact-left">
          <input type="text" placeholder="You Name" className="contact-input" />
          <input type="email" placeholder="You Email" className="contact-input" />
          <input type="tel" placeholder="You Phone" className="contact-input" />
        </div>
        <div className="contact-right">
          <textarea placeholder="You Message" className="contact-textarea"></textarea>
        </div>
      </form>
      <button type="submit" className="contact-button">SEND MESSAGE</button>
    </section>
  );
}

export default Contact;
