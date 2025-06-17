import React, { useState } from "react";
import "./Pro.css";
import { Link } from "react-router-dom";
import axios from "axios";
const ProFeature = () => {
  const [toastMsg, setToastMsg] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const handleOtp = async () => {
     const API = import.meta.env.VITE_API_BASE_URL
    try {
     ;
      const res = await axios.post(`${API}/send-otp`, { user }); // 🔁 wrapped in { user }
      localStorage.setItem("otp", res.data.otp); // 🧪 only for dev/testing
      console.log("OTP Sent Successfully");
    } catch (err) {
      console.error("Error sending OTP:", err);
    }
  };


  return (
    <div className="body">
      <div className="left-section">
        <h1>∑ SigmaJEE</h1>
      </div>
      <Link to="/" className="home">Home</Link>

      <div className="right-section">
        <div className="pro-package-card">
          <div className="pro-banner">
            <div className="img"></div>
            <div className="label">NEW</div>
          </div>
          <div className="pro-content">
            <h2>Arjuna JEE 2.0 2026</h2>
            <ul className="features-list">
              <li>Live Lectures + Notes</li>
              <li>Regular Tests & Handwritten Notes</li>
              <li>24x7 Doubt Solving</li>
              <li>DPPS + AITS with Solutions</li>
            </ul>
            <div className="price">
              <div className="discount">₹9,300</div>
              <div className="actual">₹7,100</div>
              <div className="save">24% OFF</div>
            </div>
            <Link to="/otp" onClick={handleOtp} className="buy-btn">Continue with Infinity</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ProFeature;