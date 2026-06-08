import { useState } from "react";
import Navbar from "../components/Navbar";
import "./Layout.css";

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={`layout ${menuOpen ? "menu-open" : ""}`}>
      {/* Burger viendra ici */}

      <div className="bg-base" />
      <Navbar />
      <main className="main-content">{children}</main>
    </div>
  );
}