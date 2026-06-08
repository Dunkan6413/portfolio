import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../assets/Layout.css";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>Accueil</Link>
      <Link to="/presentation" className={`nav-link ${location.pathname === "/presentation" ? "active" : ""}`}>Présentation</Link>
      <Link to="/projectsDone" className={`nav-link ${location.pathname === "/projectsDone" ? "active" : ""}`}>Projets réalisés</Link>
      <Link to="/projectsDoing" className={`nav-link ${location.pathname === "/projectsDoing" ? "active" : ""}`}>Projets en cours</Link>
      <Link to="/projectsPlan" className={`nav-link ${location.pathname === "/projectsPlan" ? "active" : ""}`}>Projets prévus</Link>
      <Link to="/expAndForm" className={`nav-link ${location.pathname === "/expAndForm" ? "active" : ""}`}>Expériences et formations</Link>
    </nav>
  );
}
