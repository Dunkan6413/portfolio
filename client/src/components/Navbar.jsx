import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../assets/Layout.css";
import { useEffect } from "react";
import { useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/auth/me', {credentials: 'include'})
      .then(res => setIsLogged(res.ok))
      .catch(() => setIsLogged(false));
  }, [location])

  async function handleLogout() {
    try {
      const response = await fetch('http://localhost:3000/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });

      if (response.ok) {
        window.location.href = '/'
      }
    } catch(err) {
      console.error("Disconnect error :", err);
    }
  }

  return (
    <nav className="navbar">
      <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>Accueil</Link>
      <Link to="/presentation" className={`nav-link ${location.pathname === "/presentation" ? "active" : ""}`}>Présentation</Link>
      <Link to="/projects" className={`nav-link ${location.pathname === "/projects" ? "active" : ""}`}>Projets</Link>
      <Link to="/expAndForm" className={`nav-link ${location.pathname === "/expAndForm" ? "active" : ""}`}>Expériences et formations</Link>
      {isLogged ? (
        <div className="nav-admin-group">
          <button className="nav-link" onClick={handleLogout} style={{ background: "none", border: "none", cursor: "pointer" }}>Se déconnecter</button>
          <Link to="/dashboard" className={`nav-link ${location.pathname === "/login" ? "active" : ""}`}>Admin</Link>
        </div>
      ) : (
        <div></div>
      )}
    </nav>
  );
}
