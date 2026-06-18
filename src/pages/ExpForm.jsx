import "../pagesCSS/ExpForm.css";

const experiences = [
  {
    id: 1,
    title: "Développeur web",
    lieu: "Entreprise X, Ville",
    periode: "Sept. 2024 — Fév. 2025",
    bullets: [
      "Développement d'une application interne en React",
      "Gestion du versioning avec Git",
      "Intégration d'une API REST",
    ],
  },
  {
    id: 2,
    title: "Serveur en restauration",
    lieu: "Restaurant Y, Ville",
    periode: "Été 2023",
    bullets: [
      "Service en salle",
      "Gestion des commandes",
    ],
  },
];

const formations = [
  {
    id: 1,
    title: "BTS SIO — Option SLAM",
    lieu: "Lycée X, Ville",
    periode: "2023 — 2025",
    bullets: [
      "Développement d'applications",
      "Gestion de bases de données",
      "Cybersécurité et réseaux",
    ],
  },
  {
    id: 2,
    title: "Baccalauréat STI2D",
    lieu: "Lycée Y, Ville",
    periode: "2023",
    bullets: [
      "Option SIN — Systèmes d'information et numérique",
    ],
  },
];

function Entry({ title, lieu, periode, bullets }) {
  return (
    <div className="entry">
      <p className="entry-title">{title}</p>
      <p className="entry-meta">
        {lieu} <span>|</span> {periode}
      </p>
      <ul className="entry-bullets">
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </div>
  );
}

export default function ExpForm() {
  return (
    <div className="expform">

      <section className="expform-section">
        <h2 className="section-label">Expériences</h2>
        <div className="entries">
          {experiences.map((exp, i) => (
            <>
              <Entry key={exp.id} {...exp} />
              {i < experiences.length - 1 && <hr className="divider" />}
            </>
          ))}
        </div>
      </section>

      <section className="expform-section">
        <h2 className="section-label">Formations</h2>
        <div className="entries">
          {formations.map((form, i) => (
            <>
              <Entry key={form.id} {...form} />
              {i < formations.length - 1 && <hr className="divider" />}
            </>
          ))}
        </div>
      </section>

    </div>
  );
}