//#region imports
import { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Layout from "./assets/Layout";
import Accueil from './pages/Accueil';
import Presentation from './pages/Presentation';
import Projects from './pages/Projects';
import ExpForm from './pages/ExpForm';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
//#endregion

function App() {

  return (
    <div>
    <BrowserRouter>
    <Layout>
      <Routes>
        <Route path='' element={<Accueil/>} />
        <Route path='/presentation' element={<Presentation />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/expAndForm' element={<ExpForm />} />
        <Route path='/admin' element={<Dashboard />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </Layout>
    </BrowserRouter>
    </div>
  )
}

export default App
