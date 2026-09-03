import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pagesCSS/NewProject.css";
import { useEffect } from "react";

export default function NewProject() {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [repo, setRepo] = useState("");
  const [readme, setReadme] = useState("");
  const [type, setType] = useState("doing");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_BACK_URL}/auth/addProject`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, subtitle, repo, readme, type }),
      });

      console.log("STATUS:", response.status);
      if (!response.ok) {
        const errorText = await response.text();
        console.log("ERROR BODY:", errorText);
        throw new Error("Couldn't add project");
      }
      const data = await response.json();
      console.log(data);
      navigate("/admin");
    } catch (err) {
      console.log(err);
    }
  }

  async function getAdmin() {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACK_URL}/auth/admin`, {
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

  useEffect(() => {
    getAdmin();
  }, []);

  return (
    <main className="new-project">
      <form onSubmit={handleSubmit} className="new-project-form">
        <h1 className="new-project-title">Nouveau projet</h1>
        <input
          type="text"
          placeholder="Titre"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Sous-titre"
          onChange={(e) => setSubtitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Repository"
          onChange={(e) => setRepo(e.target.value)}
          required
        />
        <textarea
          placeholder="Contenu (readme)"
          rows={8}
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
        <button type="submit">Ajouter</button>
      </form>
    </main>
  );
}
