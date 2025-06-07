import React from 'react';
import "../App.css"
const AboutContact = () => {
  return (
    <section className="about-contact" id="about">
      <div>
        <h2>About Us</h2>
        <p>
          SigmaJEE is a next-gen learning platform designed for serious JEE aspirants.
          We integrate smart technology with expert guidance to boost your preparation journey like never before.
        </p>
      </div>
      <div>
        <h2>Contact</h2>
        <p>
          Email: support@sigmakee.com<br />
          Phone: +91 9876543210<br />
          Address: SigmaJEE HQ, Knowledge Park, New Delhi, India
        </p>
      </div>
    </section>
  );
};

export default AboutContact;
