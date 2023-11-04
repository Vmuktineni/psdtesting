import React from 'react';
import '../CSS/ContactInfo.css'; 

function ContactInfo() {
  return (
    <div className="contact-container">
      <div className="contact-text">
        <p>Email: <a href="mailto:contact@mechazone.com">contact@mechazone.com</a></p>
        <p>Phone: <a href="tel:+1234567890">+1234567890</a></p>
      </div>
      <div className="social-links">
        <a href="https://www.facebook.com">Facebook</a>
        <a href="https://www.twitter.com">Twitter</a>
        <a href="https://www.instagram.com">Instagram</a>
        <a href="https://www.linkedin.com">LinkedIn</a>
      </div>
    </div>
  );
}

export default ContactInfo;   