import React from "react";
import "../pagesCSS/Accueil.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Accueil() {
  return (
    <div className="home">
      <h1 className="home-name">Eliott ZERATH</h1>

      <div className="home-socials">
        <a
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          target="blank"
          className="social-link"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          target="blank"
          className="social-link"
        >
          <FaLinkedin />
        </a>
      </div>
    </div>
  );
}
