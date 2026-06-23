import React from "react";
import "../pagesCSS/Presentation.css";

const techs = [
  {
    name: "C#",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
  },
  {
    name: "HTML",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  {
    name: "CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "Angular",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
  },
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
];

export default function Presentation() {
  return (
    <div className="presentation">
      {/* Header : photo + nom */}
      <header className="pres-header">
        <div className="avatar-wrapper">
          <div className="avatar-placeholder">
            <span>EZ</span>
          </div>
          {/* Section image quand photo prête */}
          {/* <div className="avatar-wrapper">
            <img src="/photo.jpg" alt="Eliott Zerath" className="avatar-img" />
          </div> */}
        </div>
        <div className="pres-identity">
          <h1 className="pres-name">Eliott ZERATH</h1>
          <p className="pres-title">Étudiant en développement web</p>
        </div>
      </header>

      {/* Technologies */}
      <section className="pres-techs">
        <h2 className="section-label">Technologies</h2>
        <div className="tech-list">
          {techs.map((tech) => (
            <div className="tech-row" key={tech.name}>
              <div className="tech-info">
                <img src={tech.icon} alt={tech.name} className="tech-icon" />
                <span className="tech-name">{tech.name}</span>
              </div>
              {/* Jauge — sera animée plus tard */}
              <div className="tech-bar-track">
                <div className="tech-bar-fill" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
