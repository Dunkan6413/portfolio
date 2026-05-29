import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <Link to={"/"}>Accueil</Link>
      <Link to={"/presentation"}></Link>
      <Link to={"/projectsDone"}></Link>
      <Link to={"/projectsDoing"}></Link>
      <Link to={"/projectsPlan"}></Link>
      <Link to={"/expAndForm"}></Link>
      <Link to={"/admin"}></Link>
    </nav>
  );
}
