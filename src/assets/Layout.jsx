import { useState } from "react";
import Navbar from "../components/Navbar";
import "./Layout.css";

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={`layout ${menuOpen ? "menu-open" : ""}`}>
      <div className="bg-base" />

      <button
        className={`burger ${menuOpen ? "burger--open" : ""}`}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Menu"
      >
        <span />
        <span />
        <span />
      </button>

      {/* Overlay pour fermer en cliquant à côté */}
      {menuOpen && (
        <div className="nav-overlay" onClick={() => setMenuOpen(false)} />
      )}

      <Navbar />
      
      <main className="main-content">{children}</main>
    </div>
  );
}
