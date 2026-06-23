import Navbar from "../components/Navbar";
import "./Layout.css";

export default function Layout({ children }) {
  return (
    <div className="layout">
      <div className="bg-base" />

      <Navbar />

      <main className="main-content">{children}</main>
    </div>
  );
}