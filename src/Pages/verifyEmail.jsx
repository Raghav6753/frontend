import { useEffect, useRef, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import Toast from "../Toast/ToastMess";
import "../Pages/a.css";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [toastMsg, setToastMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const called = useRef(false);

  useEffect(() => {
    if (!token || called.current) return;
    called.current = true;

    const verify = async () => {
      try {
        const res = await axios.get(`${API}/verify/${token}`);
        setToastMsg(res.data.message);
        setSuccess(true);
        localStorage.setItem("isVerified", true);
      } catch (err) {
        const errMsg =
          err?.response?.data?.message || "Verification failed. Try again.";
        setToastMsg(errMsg);
        setSuccess(false);
        localStorage.setItem("isVerified", false);

        const user = JSON.parse(localStorage.getItem("user"));
        await axios.post(`${API}/delete`, user).then(() => {
          localStorage.removeItem("user");
          localStorage.removeItem("type");
        });
      } finally {
        setLoading(false);
      }
    };
    verify();
  }, [token]);

  return (
    <>
      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg(null)} />}
      <div className="page-container">
        <div className="left-panel">
          <h1 className="brand-logo">∑ SigmaJEE</h1>
        </div>
        <div className="right-panel">
          <div className="form-wrapper active email-waiting-container">
            {loading ? (
              <h2>⏳ Verifying...</h2>
            ) : success ? (
              <>
                <h2>✅ Email Verified!</h2>
                <p>Your account has been successfully verified.</p>
                <Link to="/login" className="email-waiting-back">
                  → Go to Login
                </Link>
              </>
            ) : (
              <>
                <h2>❌ Verification Failed</h2>
                <p>
                  The verification link is invalid or expired.
                  <br />
                  Please sign up again.
                </p>
                <Link to="/signup" className="email-waiting-back">
                  ← Back to Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
