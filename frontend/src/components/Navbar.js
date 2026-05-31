import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header className="topbar">
      <div className="container">
        <h1 className="brand">Simple Blogger</h1>

        <nav>
          <Link to="/">Home</Link>
          <Link to="/write">Post</Link>
          <Link to="/about">About</Link>

          {user ? (
            <>
              <span style={{ marginLeft: 12, color: "#fff" }}>{user.username}</span>
              <button className="btn small" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
              <Link to="/register">Account</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
