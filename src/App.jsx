//#region imports
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Accueil from './pages/Accueil'
import Presentation from './pages/Presentation'
import ProjectsDone from './pages/ProjectsDone'
import ProjectsDoing from './pages/ProjectsDoing'
import ProjectsPlan from './pages/ProjectsPlan'
import ExpForm from './pages/ExpForm'
import Dashboard from './pages/Dashboard'
//#endregion

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='' element={<Accueil/>} />
        <Route path='/presentation' element={<Presentation />} />
        <Route path='/projectsDone' element={<ProjectsDone />} />
        <Route path='/projectsDoing' element={<ProjectsDoing />} />
        <Route path='/projectsPlan' element={<ProjectsPlan />} />
        <Route path='/expAndForm' element={<ExpForm />} />
        <Route path='/admin' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
