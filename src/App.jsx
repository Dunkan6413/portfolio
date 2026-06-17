//#region imports
import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import VantaBackground from "./components/VantaBackground";
import Layout from "./assets/Layout";
import Accueil from './pages/Accueil'
import Presentation from './pages/Presentation'
import Projects from './pages/Projects'
import ExpForm from './pages/ExpForm'
import Dashboard from './pages/Dashboard'
//#endregion

function App() {

  return (
    <div>
    {/* <VantaBackground /> */}
    <BrowserRouter>
    <Layout>
      <Routes>
        <Route path='' element={<Accueil/>} />
        <Route path='/presentation' element={<Presentation />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/expAndForm' element={<ExpForm />} />
        <Route path='/admin' element={<Dashboard />} />
      </Routes>
    </Layout>
    </BrowserRouter>
    </div>
  )
}

export default App
