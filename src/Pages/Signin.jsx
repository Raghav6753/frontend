import React, { useState } from "react";
import "./a.css"; // Your custom CSS
import { Link } from "react-router-dom"; // FIXED: use 'react-router-dom' not 'react-router'
import { useAuth } from "../Context/AuthContext";
import axios from "axios";
import { useForm } from "react-hook-form";
import Toast from "../Toast/ToastMess"; // ✅ Make sure this file exists at this path

const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const { setAuthUser } = useAuth();
  const [toastMsg, setToastMsg] = useState(null);

  const onSubmit = async (data) => {
    const user = {
      Email: data.Email,
      Password: data.Password,
    };
    try {
       const API = import.meta.env.VITE_API_BASE_URL;
      const res = await axios.post(`${API}/login`, user);
      setToastMsg(res.data.message); // ✅ Show toast
     localStorage.setItem("user", JSON.stringify(res.data.ExistingUser));
     localStorage.setItem("type", JSON.stringify(res.data.type));
      setAuthUser(res.data.ExistingUser);
      reset();
    } catch (error) {
      setToastMsg(
        "Error in Login: " +
          (error.response?.data?.message || error.message || "Unexpected error")
      );
    }
  };

  return (
    <div className="page-container">
      <div className="left-panel">
        <h1 className="brand-logo">∑ SigmaJEE</h1>
      </div>

      <Link to="/" className="home">Home</Link>

      {toastMsg && (
        <Toast message={toastMsg} onClose={() => setToastMsg(null)} />
      )}

      <div className="right-panel">
        <div className="form-wrapper active" id="loginBox">
          <h2>Login to SigmaJEE</h2>
          <form className="auth-form" id="loginForm" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Email"
              {...register("Email", { required: true })}
            />
            {errors.Email && <span>This field is required</span>}

            <input
              type="password"
              placeholder="Password"
              {...register("Password", { required: true })}
            />
            {errors.Password && <span>This field is required</span>}

            <button type="submit">Login</button>

            <div className="divider"><span>or</span></div>

            <div className="oauth-buttons">
              <button type="button" className="google-btn">
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                />
                Sign in with Google
              </button>
              <button type="button" className="apple-btn">
                <img
                  src="https://www.svgrepo.com/show/303128/apple-logo.svg"
                  alt="Apple"
                />
                Sign in with Apple
              </button>
            </div>

            <p className="switch-text">
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
