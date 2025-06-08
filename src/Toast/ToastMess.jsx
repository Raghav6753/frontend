// ToastMess.js
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./Toast.css"; // your .custom-toast styles

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return ReactDOM.createPortal(
    <div className="custom-toast">{message}</div>,
    document.body // render directly into body
  );
};

export default Toast;
