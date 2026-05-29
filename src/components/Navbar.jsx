import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <Link to={"/"}>Accueil</Link>
      <Link to={"/presentation"}>Présentation</Link>
      <Link to={"/projectsDone"}>Projets réalisés</Link>
      <Link to={"/projectsDoing"}>Projets en cours</Link>
      <Link to={"/projectsPlan"}>Projets prévus</Link>
      <Link to={"/expAndForm"}>Expériences et formations</Link>
    </nav>
  );
}
