import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./otp.css";
import Toast from "../Toast/ToastMess.jsx";

const OtpPage = () => {
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const navigate = useNavigate();
  const location = useLocation();
  const { amount, packageTitle } = location.state || {};
  const [toastMsg, setToastMsg] = useState("Enter the otp sent on your email to coninue purchasing the pack");

  const handleChange = (value, index) => {
    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < 5) inputRefs.current[index + 1].focus();
    } else if (value === "") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const verifyOtpAndPay = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    const savedOtp = localStorage.getItem("otp");

    if (enteredOtp === savedOtp) {
      localStorage.removeItem("otp");
      setToastMsg("✅ OTP Verified!");
      await handlePayment(amount || 1, packageTitle || "Pro-Package");
    } else {
      setToastMsg("❌ Invalid OTP. Please try again.");
    }
  };

  const handlePayment = async (amount, packageTitle) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      setToastMsg("Login to Continue");
      return;
    }

    if (!window.Razorpay) {
      setToastMsg("Razorpay SDK not loaded. Please check your script import.");
      return;
    }

    try {
      const res = await fetch(`${API}/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amount * 100 }), // amount in paise
      });

      if (!res.ok) {
        setToastMsg("❌ Failed to create order. Please try again.");
        return;
      }

      const data = await res.json();

      const options = {
        key: "rzp_test_p5spBljvg1aGjg", // Replace with your live key in production
        amount: data.amount,
        currency: data.currency,
        name: "My Study Platform",
        description: packageTitle,
        order_id: data.id,
        handler: async function (response) {
          try {
            const API = import.meta.env.VITE_API_BASE_URL;
            const verifyRes = await fetch(`${API}/verify-payment`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const result = await verifyRes.json();

            if (result.success) {
              setToastMsg(`✅ Payment Verified!\nPayment ID: ${response.razorpay_payment_id}`);
              setTimeout(() => {
                navigate("/pro-feature");
              }, 2000); // Delay to show toast
            } else {
              setToastMsg("❌ Payment Failed! Invalid Signature.");
            }
          } catch (err) {
            console.error("Verification error", err);
            setToastMsg("❌ Verification Failed! Something went wrong.");
          }
        },
        prefill: {
          name: user.name || "Student",
          email: user.email || "student@example.com",
          contact: user.phone || "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      setToastMsg("Something went wrong while initiating payment.");
    }
  };

  return (
    <div className="otp-container">
      <h2>Enter OTP</h2>
      <form onSubmit={verifyOtpAndPay}>
        <div className="otp-inputs">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              inputMode="numeric"
              pattern="[0-9]*"
              value={digit}
              ref={(el) => (inputRefs.current[index] = el)}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>
        <button type="submit" className="submit-btn">
          Submit & Pay
        </button>
      </form>
      {toastMsg && (
        <Toast message={toastMsg} onClose={() => setToastMsg(null)} />
      )}
    </div>
  );
};

export default OtpPage;
