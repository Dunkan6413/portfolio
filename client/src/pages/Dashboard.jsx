import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const [user, setUser] = useState([])
  const navigate = useNavigate

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
    <div>Dashboard</div>
  )
}
