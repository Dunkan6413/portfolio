import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pagesCSS/NewProject.css";
import "../pagesCSS/NewTech.css";

const TECH_OPTIONS = [
  // Langages
  {
    name: "C#",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
  },
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "Java",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  },
  {
    name: "PHP",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "C++",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  },

  // Front-end
  {
    name: "HTML",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  {
    name: "CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Angular",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
  },
  {
    name: "Vue.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
  },
  {
    name: "Tailwind CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  },

  // Back-end / Runtime
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "Express",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  },
  {
    name: ".NET",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg",
  },

  // Bases de données
  {
    name: "MongoDB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "MySQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
  {
    name: "PostgreSQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },

  // Outils / DevOps
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  {
    name: "Docker",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  {
    name: "Linux",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  },
];

export default function NewTech() {
  const navigate = useNavigate();
  const [selectedTech, setSelectedTech] = useState(null);
  const [percentage, setPercentage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState(null);

  function handleSelect(tech) {
    setSelectedTech(tech);
    setIsOpen(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!selectedTech) return;

    setStatus("sending");
    try {
      const response = await fetch("http://localhost:3000/auth/addTech", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: selectedTech.name,
          icon: selectedTech.icon,
          percentage: Number(percentage),
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log("ERROR BODY:", errorText);
        throw new Error("Couldn't add tech");
      }

      navigate("/presentation");
    } catch (err) {
      console.log(err);
      setStatus("error");
    }
  }

  return (
    <main className="new-project">
      <form onSubmit={handleSubmit} className="new-project-form">
        <h1 className="new-project-title">Nouvelle technologie</h1>

        <div className="tech-dropdown">
          <button
            type="button"
            className="tech-dropdown-trigger"
            onClick={() => setIsOpen((open) => !open)}
          >
            {selectedTech ? (
              <span className="tech-dropdown-selected">
                <img src={selectedTech.icon} alt={selectedTech.name} />
                {selectedTech.name}
              </span>
            ) : (
              <span className="tech-dropdown-placeholder">
                Choisir une technologie
              </span>
            )}
            <span className="tech-dropdown-arrow">{isOpen ? "▲" : "▼"}</span>
          </button>

          {isOpen && (
            <ul className="tech-dropdown-list">
              {TECH_OPTIONS.map((tech) => (
                <li key={tech.name}>
                  <button
                    type="button"
                    className="tech-dropdown-option"
                    onClick={() => handleSelect(tech)}
                  >
                    <img src={tech.icon} alt={tech.name} />
                    {tech.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <input
          type="number"
          placeholder="Pourcentage de maîtrise (0-100)"
          value={percentage}
          onChange={(e) => setPercentage(e.target.value)}
          min="0"
          max="100"
          required
        />

        {status === "error" && (
          <p className="form-error">
            Une erreur est survenue, veuillez réessayer.
          </p>
        )}

        <button type="submit" disabled={!selectedTech || status === "sending"}>
          {status === "sending" ? "Envoi..." : "Ajouter"}
        </button>
      </form>
    </main>
  );
}
