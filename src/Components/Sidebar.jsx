// src/components/Sidebar.js
import React,{useState} from "react";
import axios from "axios"
import { set } from "react-hook-form";
import Toast from "../Toast/ToastMess";
const Sidebar = ({ isOpen, onClose }) => {
   const [toastMsg,setToastMsg]=useState(null);
  const logout= async ()=>{
    const API = import.meta.env.VITE_API_BASE_URL;
    await axios.post(`${API}/signup`).then((res)=>{
        setToastMsg(res.data.message);
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("type");

     }).catch((error)=>{
      console.log("Error in logout " +error.data.message);
     })
    }
  return (
     
    <div className={`sidebar ${isOpen ? "show-sidebar" : ""}`}>
       {toastMsg && (
        <Toast message={toastMsg} onClose={() => setToastMsg(null)} />
      )}
      <a href="#" >Home</a>
      <a href="#features" >Features</a>
      <a href="#about" >About</a>
      <a  onClick={logout}>Logout</a>
    </div>
  );
};

export default Sidebar;
