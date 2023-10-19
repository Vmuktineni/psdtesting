// ContactInfo.js
import React from 'react';

function ContactInfo() {
  return (
    <div className="contact-info">
      <a href="mailto:contact@mechazone.com" className="contact-icon">
        Email
      </a>
      <a href="tel:+1234567890" className="contact-icon">
        Phone
      </a>
    </div>
  );
}

export default ContactInfo;
