import React from "react";
import "../Pages/a.css";
import { Link } from "react-router-dom";

const EmailVerificationWaiting = () => {
  return (
    <div className="page-container">
      <div className="left-panel">
        <h1 className="brand-logo">∑ SigmaJEE</h1>
      </div>
      <div className="right-panel">
        <div className="form-wrapper active email-waiting-container">
          <h2>📧 Check Your Inbox</h2>
          <p>
            We’ve sent a verification link to your email.
            <br />
            Please verify to continue.
          </p>
          <Link to="/signup" className="email-waiting-back">
            ← Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationWaiting;
