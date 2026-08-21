import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../pagesCSS/EditProject.css";

export default function EditProject() {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [repo, setRepo] = useState("");
  const [readme, setReadme] = useState("");
  const [type, setType] = useState("doing");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/auth/updateProject/${id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, subtitle, repo, readme, type }),
        },
      );

      console.log("STATUS:", response.status);
      if (!response.ok) {
        const errorText = await response.text();
        console.log("ERROR BODY:", errorText);
        throw new Error("Couldn't add project");
      }
      const data = await response.json();
      console.log(data);
      navigate("/projects");
    } catch (err) {
      console.log(err);
    }
  }

  async function getAdmin() {
    try {
      const response = await fetch("http://localhost:3000/auth/admin", {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Access denied");
      }
      const data = await response.json();
      setUser(data);
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  }

  async function getProject() {
    try {
      const response = await fetch(
        `http://localhost:3000/auth/getProject/${id}`,
        {
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Projet introuvable");
      }

      const data = await response.json();

      setTitle(data.title);
      setSubtitle(data.subtitle);
      setRepo(data.repo);
      setReadme(data.readme);
      setType(data.type);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAdmin();
    getProject();
  }, []);

  return (
    <main className="new-project">
      <form onSubmit={handleSubmit} className="new-project-form">
        <h1 className="new-project-title">Modifier le projet</h1>
        <input
          type="text"
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Sous-titre"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Repository"
          value={repo}
          onChange={(e) => setRepo(e.target.value)}
          required
        />
        <textarea
          placeholder="Contenu (readme)"
          rows={8}
          value={readme}
          onChange={(e) => setReadme(e.target.value)}
          required
        />
        <select
          name="type"
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        >
          <option value="doing">En cours</option>
          <option value="done">Réalisé</option>
          <option value="planned">Prévu</option>
        </select>
        <button type="submit">Enregistrer</button>
      </form>
    </main>
  );
}
