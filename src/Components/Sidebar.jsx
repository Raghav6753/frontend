// src/components/Sidebar.js
import React,{useState} from "react";
import axios from "axios"
import { set } from "react-hook-form";
import Toast from "../Toast/ToastMess";
import { Link } from "react-router";
const Sidebar = ({ isOpen, onClose }) => {
   const [toastMsg,setToastMsg]=useState(null);
  const logout= async ()=>{
    const API = import.meta.env.VITE_API_BASE_URL;
    await axios.post(`${API}/api/user/logout`).then((res)=>{
        setToastMsg(res.data.message);
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("type");

     }).catch((error)=>{
      console.log("Error in logout " +error.data.message);
     })
    }
    const user = JSON.parse(sessionStorage.getItem("user"));
  const name = user?.Name;

  return (
     
    <div className={`sidebar ${isOpen ? "show-sidebar" : ""}`}>
       {toastMsg && (
        <Toast message={toastMsg} onClose={() => setToastMsg(null)} />
      )}
      <Link to={name?"/":"/login"}>{name ? name : "Login"}</Link>
      <a href="#" >Home</a>
      <a href="#features" >Features</a>
      <a href="#about" >About</a>
      <a  onClick={logout}>Logout</a>
    

    </div>
  );
};

export default Sidebar;
