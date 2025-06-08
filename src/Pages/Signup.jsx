import React from "react";
import "./a.css"; // Same shared CSS
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import { useState } from "react";
import Toast from "../Toast/ToastMess";
const Signup = () => {
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
  const {setAuthUser}=useAuth();
  const [toastMsg,setToastMsg]=useState(null);
  const onSubmit = async data => {
    const user = {
      Name: data.Name,
      Email: data.Email,
      Password: data.Password,
      ConfirmPassword: data.ConfirmPassword,
      Class: data.Class,
      Type: data.Type
    }
    const API = import.meta.env.VITE_API_BASE_URL;
    await axios.post(`${API}/signup`, user).then((res) => {
      setToastMsg(res.data.message);
      console.log(res.data.NewUser);
      console.log(res.data.NewUserType);
      sessionStorage.setItem("user", JSON.stringify(res.data.NewUser));
      sessionStorage.setItem("type", JSON.stringify(res.data.NewUserType));
      setAuthUser(res.data.NewUser);
      reset();
    }).catch((error) => {
      setToastMsg("Error in Signup: " + (error.response?.data?.message || error.message));
    });

  };
  const Password = watch("Password");
  const CheckValid = (ConfirmPassword) => {

    return ConfirmPassword === Password;
  }
  return (
    <div className="page-container">
         {toastMsg && (
        <Toast message={toastMsg} onClose={() => setToastMsg(null)} />
      )}
      <div className="left-panel">
        <h1 className="brand-logo">∑ SigmaJEE</h1>
      </div>
      <Link to="/" className="home">
        Home
      </Link>

      <div className="right-panel">
        <div className="form-wrapper active" id="signupBox">
          <h2>Create Account</h2>
          <form className="auth-form" id="signupForm" onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="Full Name" required  {...register("Name", { required: true })} />
            {errors.Name && <span>This field is required</span>}
            <input type="email" placeholder="Email" required  {...register("Email", { required: true })} />
            {errors.Email && <span>This field is required</span>}
            <input type="password" placeholder="Password" required  {...register("Password", { required: true })} />
            {errors.Password && <span>This field is required</span>}
            <input type="password" placeholder="Confirm Password" required  {...register("ConfirmPassword", { required: true, validate: CheckValid })} />
            {errors.ConfirmPassword && <span>This field is required</span>}
            <input type="text" placeholder="Class (e.g. 11 or 12)" required  {...register("Class", { required: true })} />
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
