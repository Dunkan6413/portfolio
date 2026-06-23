import { useState } from "react";
import {
  FaGithub,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import "../pagesCSS/Projects.css";

const projects = {
  done: [
    {
      id: 1,
      title: "PortfolioV1",
      subtitle:
        "Mon premier portfolio, fait en HTML/CSS pur. Oui, c'était courageux.",
      repo: "https://github.com",
      readme: `# PortfolioV1\n\nPremier jet de mon portfolio personnel, codé à la main en HTML et CSS sans framework.\n\n## Ce que j'ai appris\n- Les joies du positionnement CSS\n- Pourquoi flexbox existe\n- Que mettre du Comic Sans était une mauvaise idée\n\n## Stack\n- HTML5\n- CSS3\n\n## Lien\nDéployé sur GitHub Pages.`,
    },
    {
      id: 2,
      title: "TodoApp",
      subtitle: "Une todo list. Oui encore une. Mais celle-là elle est bien.",
      repo: "https://github.com",
      readme: `# TodoApp\n\nUne application de gestion de tâches avec persistence locale.\n\n## Fonctionnalités\n- Ajout / suppression de tâches\n- Marquage comme terminé\n- Sauvegarde en localStorage\n\n## Stack\n- React\n- CSS Modules`,
    },
    {
      id: 3,
      title: "WeatherBoard",
      subtitle:
        "Dashboard météo qui consomme une API publique. Fonctionnel, promis.",
      repo: "https://github.com",
      readme: `# WeatherBoard\n\nDashboard météo connecté à l'API OpenWeatherMap.\n\n## Fonctionnalités\n- Recherche par ville\n- Affichage température, humidité, vent\n- Historique des recherches\n\n## Stack\n- React\n- Axios\n- OpenWeatherMap API`,
    },
  ],
  doing: [
    {
      id: 4,
      title: "PortfolioV2",
      subtitle: "Celui que tu regardes en ce moment. Meta, non ?",
      repo: "https://github.com",
      readme: `# PortfolioV2\n\nMon portfolio actuel, en cours de développement.\n\n## Objectifs\n- Design Warframe-inspired\n- React + React Router\n- Back-end à venir pour la gestion des projets\n\n## Stack\n- React\n- CSS custom\n- Node.js (à venir)`,
    },
    {
      id: 5,
      title: "ChatApp",
      subtitle:
        "Application de chat temps réel. Les bugs aussi sont en temps réel.",
      repo: "https://github.com",
      readme: `# ChatApp\n\nApplication de messagerie instantanée avec WebSockets.\n\n## Fonctionnalités prévues\n- Rooms de chat\n- Pseudos personnalisés\n- Historique des messages\n\n## Stack\n- React\n- Node.js / Express\n- Socket.io\n- MongoDB`,
    },
    {
      id: 6,
      title: "GameTracker",
      subtitle:
        "Tracker de sessions de jeu. Pour savoir exactement combien d'heures tu perds.",
      repo: "https://github.com",
      readme: `# GameTracker\n\nApplication de suivi de temps de jeu vidéo.\n\n## Fonctionnalités prévues\n- Ajout de jeux manuellement\n- Suivi du temps par session\n- Stats et graphiques\n\n## Stack\n- MERN Stack`,
    },
  ],
  planned: [
    {
      id: 7,
      title: "BudgetManager",
      subtitle: "Parce que savoir où part l'argent, c'est quand même utile.",
      repo: null,
      readme: `# BudgetManager\n\nApplication de gestion de budget personnel.\n\n## Idée\n- Suivi des dépenses par catégorie\n- Graphiques mensuels\n- Alertes de dépassement\n\n## Stack envisagée\n- MERN Stack`,
    },
    {
      id: 8,
      title: "RecipeBox",
      subtitle:
        "Stocker ses recettes perso. Parce que les screenshots ça suffit plus.",
      repo: null,
      readme: `# RecipeBox\n\nApplication de gestion de recettes personnelles.\n\n## Idée\n- Ajout / édition de recettes\n- Recherche par ingrédient\n- Liste de courses auto-générée\n\n## Stack envisagée\n- React\n- Node.js / Express\n- MongoDB`,
    },
    {
      id: 9,
      title: "DevDiary",
      subtitle:
        "Journal de bord de dev. Pour se souvenir pourquoi on a fait des choix douteux.",
      repo: null,
      readme: `# DevDiary\n\nJournal de bord pour développeurs.\n\n## Idée\n- Notes par projet\n- Tags et recherche\n- Export Markdown\n\n## Stack envisagée\n- MERN Stack`,
    },
  ],
};

function parseMarkdown(text) {
  return text
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>)/gs, "<ul>$1</ul>")
    .replace(/\n{2,}/g, "<br/>")
    .replace(/\n/g, " ");
}

function Carousel({ title, items, onOpen }) {
  const [index, setIndex] = useState(0);
  const visible = 3;
  const max = items.length - visible;

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(max, i + 1));

  return (
    <section className="carousel-section">
      <h2 className="carousel-title">{title}</h2>
      <div className="carousel-wrapper">
        <button className="carousel-btn" onClick={prev} disabled={index === 0}>
          <FaChevronLeft />
        </button>
        <div className="carousel-track">
          {items.slice(index, index + visible).map((project) => (
            <div className="project-card" key={project.id}>
              <div className="card-header">
                <h3 className="card-title">{project.title}</h3>
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="card-git"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaGithub />
                  </a>
                )}
              </div>
              <p className="card-subtitle">{project.subtitle}</p>
              <button className="card-btn" onClick={() => onOpen(project)}>
                Voir le projet
              </button>
            </div>
          ))}
        </div>
        <button className="carousel-btn" onClick={next} disabled={index >= max}>
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
}

function Modal({ project, onClose }) {
  if (!project) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <FaTimes />
        </button>
        <div
          className="modal-content"
          dangerouslySetInnerHTML={{ __html: parseMarkdown(project.readme) }}
        />
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="modal-git-btn"
          >
            <FaGithub /> Voir le repo
          </a>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="projects">
      <Carousel
        title="— Projets réalisés"
        items={projects.done}
        onOpen={setSelected}
      />
      <Carousel
        title="— Projets en cours"
        items={projects.doing}
        onOpen={setSelected}
      />
      <Carousel
        title="— Projets prévus"
        items={projects.planned}
        onOpen={setSelected}
      />
      <Modal project={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
