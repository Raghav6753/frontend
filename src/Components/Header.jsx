import React from 'react';
import { Link } from 'react-router-dom'; // ✅ Also fix this import!
import "../App.css";

const Header = ({ onToggleSidebar }) => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const name = user?.Name;

  return (
    <header>
      <div className="left-container">
        <div className="profile-icon" onClick={onToggleSidebar}>☰</div>
        <div className="logo">
          <span>&#x03A3;</span>SigmaJEE
        </div>
      </div>
    <nav>
  <a href="#" className="desktop-only">Home</a>
  <a href="#features" className="desktop-only">Features</a>
  <a href="#about" className="desktop-only">About</a>
  <Link to={name ? "/" : "/login"} className="login-only">
    {name ? name : "Login"}
  </Link>
</nav>

    </header>
  );
};

export default Header;
