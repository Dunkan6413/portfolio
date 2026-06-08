//#region imports
import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import VantaBackground from "./components/VantaBackground";
import Layout from "./assets/Layout";
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
    <div>
    {/* <VantaBackground /> */}
    <BrowserRouter>
    <Layout>
      <h1>Eliott ZERATH</h1>
    </Layout>
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
    </div>
  )
}

export default App
