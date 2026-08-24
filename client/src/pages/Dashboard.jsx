import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../pagesCSS/Dashboard.css'

export default function Dashboard() {
  const [user, setUser] = useState([])
  const navigate = useNavigate()

  async function getAdmin() {
    try {
      const response = await fetch('http://localhost:3000/admin', {
        method: 'GET',
        credentials: 'include'
      })
      if (!response.ok) {
        throw new Error("Access denied")
      }
      const data = await response.json()
      setUser(data)
    } catch(err) {
      console.log(err)
      navigate('/login')
    }
  }

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">— Dashboard</h1>
      <p className="dashboard-subtitle">Ajoute un nouvel élément à ton site</p>

      <div className="dashboard-grid">
        <button
          className="dashboard-tile"
          onClick={() => navigate('/new-project')}
        >
          <span className="dashboard-tile-plus">+</span>
          <span className="dashboard-tile-label">Ajouter un projet</span>
        </button>

        <button 
        className="dashboard-tile" 
        onClick={() => navigate('/new-tech')}
        >
          <span className="dashboard-tile-plus">+</span>
          <span className="dashboard-tile-label">Ajouter une technologie</span>
        </button>

        <button className="dashboard-tile" disabled>
          <span className="dashboard-tile-plus">+</span>
          <span className="dashboard-tile-label">À définir</span>
        </button>

        <button className="dashboard-tile" disabled>
          <span className="dashboard-tile-plus">+</span>
          <span className="dashboard-tile-label">À définir</span>
        </button>

        <button className="dashboard-tile" disabled>
          <span className="dashboard-tile-plus">+</span>
          <span className="dashboard-tile-label">À définir</span>
        </button>
      </div>
    </div>
  )
}