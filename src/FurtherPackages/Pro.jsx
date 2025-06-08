import React,{useState} from "react";
import "./Pro.css";
import { Link } from "react-router-dom";
const ProFeature=()=>{
     const [toastMsg,setToastMsg]=useState(null);
        const user = JSON.parse(sessionStorage.getItem("user"));
      const handlePayment = async (amount, packageTitle) => {
          if(!user){
          setToastMsg("Login to Continue");
          return;
        }
      if (!window.Razorpay) {
        alert('Razorpay SDK not loaded. Please check your script import.');
        return;
      }
       
     
      try {
        const API = import.meta.env.VITE_API_BASE_URL;
        const res = await fetch(`${API}/qcreate-order`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: amount * 100 }), // amount in paise
        });
    
        if (!res.ok) {
          alert('Failed to create order. Please try again.');
          return;
        }
    
        const data = await res.json();
    
        const options = {
          key: 'rzp_test_p5spBljvg1aGjg', // 🛑 Replace with process.env one or Razorpay Key ID
          amount: data.amount,
          currency: data.currency,
          name: 'My Study Platform',
          description: packageTitle,
          order_id: data.id,
          handler: async function (response) {
            try {
              const verifyRes = await fetch(`${API}/verify-payment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              });
    
              const result = await verifyRes.json();
    
              if (result.success) {
                alert(`✅ Payment Verified!\nPayment ID: ${response.razorpay_payment_id}`);
              } else {
                alert("❌ Payment Failed! Invalid Signature.");
              }
            } catch (err) {
              console.error("Verification error", err);
              alert("❌ Verification Failed! Something went wrong.");
            }
          },
          prefill: {
            name: 'Student Name',
            email: 'student@example.com',
            contact: '9999999999',
          },
          theme: {
            color: '#3399cc',
          },
        };
    
        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        console.error(error);
        alert('Something went wrong while initiating payment.');
      }
    };
    
   return(
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
        <div className="buy-btn"  onClick={() => handlePayment(2, "Pro Package")}>Continue with Infinity</div>
      </div>
    </div>
  </div>
</div>
   )
}
export default ProFeature;