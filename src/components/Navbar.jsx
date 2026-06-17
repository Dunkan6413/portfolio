import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../assets/Layout.css";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>Accueil</Link>
      <Link to="/presentation" className={`nav-link ${location.pathname === "/presentation" ? "active" : ""}`}>Présentation</Link>
      <Link to="/projects" className={`nav-link ${location.pathname === "/projects" ? "active" : ""}`}>Projets</Link>
      <Link to="/expAndForm" className={`nav-link ${location.pathname === "/expAndForm" ? "active" : ""}`}>Expériences et formations</Link>
    </nav>
  );
}
