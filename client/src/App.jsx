//#region imports
import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Layout from "./assets/Layout";
import Accueil from "./pages/Accueil";
import Presentation from "./pages/Presentation";
import Projects from "./pages/Projects";
import ExpForm from "./pages/ExpForm";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewProject from "./pages/NewProject";
import EditProject from "./pages/EditProject";
import NewTech from "./pages/NewTech";
//#endregion

function App() {
  return (
    <div>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="" element={<Accueil />} />
            <Route path="/presentation" element={<Presentation />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/expAndForm" element={<ExpForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/new-project" element={<NewProject />} />
            <Route path="/edit-project/:id" element={<EditProject />} />
            <Route path="/new-tech" element={<NewTech />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
