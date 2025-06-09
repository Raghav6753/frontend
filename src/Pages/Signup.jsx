import React, { useState } from "react";
import "./a.css"; // Same shared CSS
import { Link, useNavigate } from "react-router-dom"; // ✅ useNavigate added
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import Toast from "../Toast/ToastMess";
import Loading from "./Loading";

const Signup = () => {
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
  const { setAuthUser } = useAuth();
  const [toastMsg, setToastMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // ✅ navigation hook

  const onSubmit = async (data) => {
    setIsLoading(true);

    const user = {
      Name: data.Name,
      Email: data.Email,
      Password: data.Password,
      ConfirmPassword: data.ConfirmPassword,
      Class: data.Class,
      Type: data.Type
    }

    const API = import.meta.env.VITE_API_BASE_URL;

    try {
      const res = await axios.post(`${API}/signup`, user);
      setToastMsg(res.data.message);

      localStorage.setItem("user", JSON.stringify(res.data.NewUser));
      localStorage.setItem("type", JSON.stringify(res.data.NewUserType));
      setAuthUser(res.data.NewUser);
      reset();
            setIsLoading(false);
      setTimeout(() => {
        navigate("/"); // ✅ redirect to home using React Router
      }, 2000);

    } catch (error) {
      setToastMsg("Error in Signup: " + (error.response?.data?.message || error.message));
      setIsLoading(false);
    }
  };

  const Password = watch("Password");
  const CheckValid = (ConfirmPassword) => ConfirmPassword === Password;

  return (
    <div className="page-container">
      {isLoading && <Loading />}
      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg(null)} />}

      <div className="left-panel">
        <h1 className="brand-logo">∑ SigmaJEE</h1>
      </div>

      <Link to="/" className="home">Home</Link>

      <div className="right-panel">
        <div className="form-wrapper active" id="signupBox">
          <h2>Create Account</h2>
          <form className="auth-form" id="signupForm" onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="Full Name" required {...register("Name", { required: true })} />
            {errors.Name && <span>This field is required</span>}

            <input type="email" placeholder="Email" required {...register("Email", { required: true })} />
            {errors.Email && <span>This field is required</span>}

            <input type="password" placeholder="Password" required {...register("Password", { required: true })} />
            {errors.Password && <span>This field is required</span>}

            <input type="password" placeholder="Confirm Password" required {...register("ConfirmPassword", { required: true, validate: CheckValid })} />
            {errors.ConfirmPassword && <span>This field is required</span>}

            <input type="text" placeholder="Class (e.g. 11 or 12)" required {...register("Class", { required: true })} />
            {errors.Class && <span>This field is required</span>}

            <select {...register("Type", { required: true })} defaultValue="">
              <option value="" disabled>Select Type</option>
              <option value="Student">Student</option>
              <option value="Mentor">Mentor</option>
            </select>
            {errors.Type && <span>This field is required</span>}

            <button type="submit">Signup</button>

            <p className="switch-text">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
