import { useEffect, useState } from "react";
import { FaTrash, FaPen, FaCheck } from "react-icons/fa";
import "../pagesCSS/Presentation.css";

export default function Presentation() {
  const [techs, setTechs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    fetch("http://localhost:3000/auth/me", { credentials: "include" })
      .then((res) => setIsLogged(res.ok))
      .catch(() => setIsLogged(false));
  });

  useEffect(() => {
    fetchTechs();
  }, []);

  function handlePercentage(id, newValue) {
    setTechs((prev) =>
      prev.map((tech) =>
        tech._id === id ? { ...tech, percentage: newValue } : tech,
      ),
    );
  }

  function startEditing(tech) {
    setEditId(tech._id);
    setEditValue(tech.percentage);
  }

  function cancelEditing() {
    setEditId(null);
    setEditValue('');
  }

  async function handlePercentageSave(tech) {
    try {
      const response = await fetch(`http://localhost:3000/auth/updateTech/${tech._id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: tech.name,
          icon: tech.icon,
          percentage:Number(editValue)
        })
      });

      if(!response.ok) throw new Error ("Échec modification");

      const updated = await response.json();
      setTechs((prev) => 
        prev.map((t) => (t._id === tech._id ? updated : t))  
      );
      cancelEditing();
    } catch(err) {
      console.log(err);
    }
  }

  async function handleDelete(tech) {
    const confirmDelete = window.confirm(`Supprimer "${tech.name}" ?`);
    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/auth/deleteTech/${tech._id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );
      if (!response.ok) {
        throw new Error("Suppression impossible");
      }

      setTechs((prev) => prev.filter((t) => t._id !== tech._id));
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchTechs() {
    try {
      const response = await fetch("http://localhost:3000/auth/getTechs", {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Impossible de charger les technologies");
      }

      const data = await response.json();
      setTechs(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="presentation">Chargement...</div>;
  }

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
            <div className="tech-row" key={tech._id}>
              <div className="tech-info">
                <img src={tech.icon} alt={tech.name} className="tech-icon" />
                <span className="tech-name">{tech.name}</span>
              </div>
              <div className="tech-bar-track">
                <div
                  className={`tech-bar-fill ${tech.percentage === 100 ? "tech-bar-fill--complete" : ""}`}
                  style={{ width: `${tech.percentage}%` }}
                />
              </div>

              {isLogged && (
                <div className="tech-admin-group">
                  {editId === tech._id ? (
                    <>
                      <input 
                        type="number"
                        className="tech-percentage-input"
                        min="0"
                        max="100"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        autoFocus
                      />
                      <button className="tech-save-btn" onClick={() => handlePercentageSave(tech)}>
                        <FaCheck />
                      </button>
                    </>
                  ) : (
                    <button className="tech-edit-btn" onClick={() => startEditing(tech)}>
                      <FaPen />
                    </button>
                  )}
                  <button
                    className="tech-delete-btn"
                    onClick={() => handleDelete(tech)}
                  >
                    <FaTrash />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
