import { useState, useEffect } from "react";
import {
  FaGithub,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import "../pagesCSS/Projects.css";

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

  if (items.length === 0) return null;

  return (
    <section className="carousel-section">
      <h2 className="carousel-title">{title}</h2>
      <div className="carousel-wrapper">
        <button className="carousel-btn" onClick={prev} disabled={index === 0}>
          <FaChevronLeft />
        </button>
        <div className="carousel-track">
          {items.slice(index, index + visible).map((project) => (
            <div className="project-card" key={project._id}>
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
  const [projects, setProjects] = useState({ done: [], doing: [], planned: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchProjects() {
      try {
        const response = await fetch("http://localhost:3000/auth/getProjects", {
          credentials: "include"
        });
        if (!response.ok) {
          throw new Error("Impossible de charger les projets");
        }

        const data = await response.json();
        const sorted = { done: [], doing: [], planned: [] };
        data.forEach((project) => {
          if (sorted[project.type]) {
            sorted[project.type].push(project);
          }
        });
        setProjects(sorted);
      } catch(err) {
        console.error(err);
        setError("Impossible de charger les projets.");
      } finally {
        setLoading(false)
      }
    }

  useEffect(() => {
    fetchProjects();
  }, []);

  if (loading) return <div className="projects">Chargement...</div>;
  if (error) return <div className="projects">{error}</div>;

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
