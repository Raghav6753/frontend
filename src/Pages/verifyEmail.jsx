import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Toast from "../Toast/ToastMess";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [toastMsg, setToastMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const called = useRef(false); // 

  useEffect(() => {
    if (!token || called.current) return;
    called.current = true;

    const verify = async () => {
      try {
         const API = import.meta.env.VITE_API_BASE_URL;
        const res = await axios.get(`${API}/verify/${token}`);
        setToastMsg(res.data.message);
        localStorage.setItem("isVerified",true);
      } catch (err) {
        const errMsg =
          err?.response?.data?.message || "Verification failed. Try again.";
        setToastMsg(errMsg);
        localStorage.setItem("isVerified",false);
      } finally {
        setLoading(false);
      }
    };
    verify();
  }, [token]);

  return (
    <>
      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg(null)} />}
      <h2>{loading ? "Verifying your email..." : "Check the message above"}</h2>
    </>
  );
};

export default VerifyEmail;
